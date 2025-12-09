import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from "react-native-calendars";

import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { LineChart } from "react-native-chart-kit";
import ViewShot from "react-native-view-shot";

const screenWidth = Dimensions.get("window").width;

export default function CalendarioEmocional() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayFeelings, setDayFeelings] = useState({});
  const [personalityDone, setPersonalityDone] = useState(false);          // 👈 NUEVO
  const [personalityResult, setPersonalityResult] = useState(null);       // 👈 NUEVO
  const chartRef = useRef();

  const emotions = [
    { label: "Éxtasis 🤩", color: "#FFB74D", value: 6 },
    { label: "Muy Feliz 😀", color: "#FFD54F", value: 5 },
    { label: "Feliz 🙂", color: "#AED581", value: 4 },
    { label: "Neutral 😐", color: "#90A4AE", value: 3 },
    { label: "Triste 🙁", color: "#64B5F6", value: 2 },
    { label: "Muy Triste 😢", color: "#42A5F5", value: 1 },
    { label: "Ansioso 😰", color: "#BA68C8", value: 2 },
    { label: "Estresado 😓", color: "#E57373", value: 1 },
    { label: "Emocionado 🤩", color: "#F06292", value: 5 },
    { label: "Calmado 😌", color: "#81C784", value: 4 },
  ];

  // Load storage
  useEffect(() => {
    (async () => {
      try {
        const s = await AsyncStorage.getItem("dayFeelings_v1");
        if (s) setDayFeelings(JSON.parse(s));

        // 👇 leer si el test de personalidad ya se hizo
        const done = await AsyncStorage.getItem("testPersonalidadHecho");
        if (done === "SI") setPersonalityDone(true);

        // 👇 leer resumen del resultado del test
        const resJson = await AsyncStorage.getItem(
          "testPersonalidadResultado_v1"
        );
        if (resJson) {
          try {
            const parsed = JSON.parse(resJson);
            setPersonalityResult(parsed);
          } catch (e) {
            console.warn("Error parseando resultado personalidad:", e);
          }
        }
      } catch (e) {
        console.warn("Error loading feelings:", e);
      }
    })();
  }, []);

  // Save on change
  useEffect(() => {
    AsyncStorage.setItem("dayFeelings_v1", JSON.stringify(dayFeelings)).catch(
      (e) => console.warn("Error saving feelings:", e)
    );
  }, [dayFeelings]);

  // Save emotion
  const saveFeeling = (date, emotion) => {
    if (!date) return Alert.alert("Selecciona una fecha primero");
    const updated = { ...dayFeelings, [date]: emotion };
    setDayFeelings(updated);
  };

  // Marked dates
  const markedDates = {
    ...(selectedDay
      ? { [selectedDay]: { selected: true, selectedColor: "#7C3AED" } }
      : {}),
    ...Object.fromEntries(
      Object.entries(dayFeelings).map(([d, f]) => [
        d,
        { selected: true, selectedColor: f.color },
      ])
    ),
  };

  // Chart data
  const sortedDates = Object.keys(dayFeelings).sort();
  const chartLabels = sortedDates.map((d) => d.slice(5));
  const chartValues = sortedDates.map((d) => dayFeelings[d].value);

  const chartData = {
    labels: chartLabels.length ? chartLabels : ["-"],
    datasets: [{ data: chartValues.length ? chartValues : [0] }],
  };

  const weeklyAvg =
    chartValues.length > 0
      ? (chartValues.reduce((a, b) => a + b, 0) / chartValues.length).toFixed(
          2
        )
      : "N/A";

  const chartConfig = {
    backgroundColor: "#FFFFFF",
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(124, 58, 237, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: "5",
      strokeWidth: "2",
      stroke: "#7C3AED",
    },
  };

  // PDF Export
  const exportToPDF = async () => {
    try {
      if (sortedDates.length === 0) {
        return Alert.alert(
          "No hay datos",
          "Registra al menos una emoción para exportar PDF."
        );
      }

      const uri = await chartRef.current.capture();

      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: "base64",
      });

      const rowsHtml = sortedDates
        .map((d) => {
          const f = dayFeelings[d];
          return `<tr>
          <td style="padding:8px;border:1px solid #ddd;">${d}</td>
          <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(
            f.label
          )}</td>
          <td style="padding:8px;border:1px solid #ddd;text-align:center;">${
            f.value
          }</td>
        </tr>`;
        })
        .join("");

      const html = `
    <html>
      <head><meta charset="utf-8"/></head>
      <body style="font-family: Arial; padding:20px; color:#222;">
        <h1 style="color:#333;">Reporte Emocional</h1>

        <h2>Promedio semanal</h2>
        <p style="font-size:20px; font-weight:bold; color:#7C3AED;">
          ⭐ ${weeklyAvg}
        </p>
        
        <h2>Gráfica</h2>
        <img src="data:image/png;base64,${base64}" style="width:100%; border-radius:8px;" />

        <h2 style="margin-top:24px;">Historial registrado</h2>
        <table style="border-collapse:collapse; width:100%; font-size:14px;">
          <thead>
            <tr>
              <th style="padding:8px;border-bottom:2px solid #ccc;text-align:left;">Fecha</th>
              <th style="padding:8px;border-bottom:2px solid #ccc;text-align:left;">Emoción</th>
              <th style="padding:8px;border-bottom:2px solid #ccc;">Valor</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>

        <p style="margin-top:40px; color:#999; font-size:12px;">
          Reporte generado el ${new Date().toLocaleDateString()}
        </p>
      </body>
    </html>
    `;

      const { uri: pdfUri } = await Print.printToFileAsync({ html });

      await Sharing.shareAsync(pdfUri);
    } catch (e) {
      console.error("PDF Error:", e);
      Alert.alert("Error al generar PDF", String(e));
    }
  };

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#7C3AED" barStyle="light-content" />

      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <Text style={styles.title}>Calendario Emocional</Text>

        <Calendar
          onDayPress={(day) => setSelectedDay(day.dateString)}
          markedDates={markedDates}
          theme={{
            todayTextColor: "#7C3AED",
            selectedDayBackgroundColor: "#7C3AED",
            arrowColor: "#7C3AED",
          }}
        />

        {/* 🌸 AQUÍ VA AHORA EL RESULTADO DEL TEST */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tu test de personalidad</Text>

          {!personalityDone ? (
            <View style={styles.personalityReminderBox}>
              <Text style={styles.personalityReminderText}>
                No olvides realizar el test de personalidad. Te ayudará a
                entender mejor cómo eres emocionalmente 💕
              </Text>
              {/* OJO: aquí ya no ponemos onPress si tú quieres que solo se haga desde Checking.
                  Si quieres que también navegue, puedes agregar el botón más adelante. */}
            </View>
          ) : (
            <View style={styles.personalityResultBox}>
              <Text style={styles.personalityResultLabel}>Tu resultado:</Text>
              <Text style={styles.personalityResultTitle}>
                {personalityResult?.title || "Test completado"}
              </Text>
              {personalityResult?.score != null && (
                <Text style={styles.personalityResultScore}>
                  Puntaje: {personalityResult.score} / 75
                </Text>
              )}
              <Text style={styles.personalityResultNote}>
                Este test solo se responde una vez para cuidar tu proceso
                emocional 💜
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selecciona una emoción</Text>

          <View style={styles.emotionsGrid}>
            {emotions.map((e) => {
              const chosen =
                selectedDay && dayFeelings[selectedDay]?.label === e.label;
              return (
                <TouchableOpacity
                  key={e.label}
                  style={[
                    styles.emotionBtn,
                    { borderColor: e.color },
                    chosen && { backgroundColor: e.color },
                  ]}
                  onPress={() => saveFeeling(selectedDay, e)}
                >
                  <Text
                    style={[
                      styles.emotionText,
                      chosen && { color: "#fff", fontWeight: "700" },
                    ]}
                  >
                    {e.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Semana / Histórico</Text>

          {sortedDates.length === 0 ? (
            <Text style={styles.emptyText}>
              Aún no hay emociones registradas.
            </Text>
          ) : (
            <>
              <ViewShot
                ref={chartRef}
                options={{
                  format: "png",
                  quality: 1,
                  result: "tmpfile",
                }}
              >
                <LineChart
                  data={chartData}
                  width={Math.max(screenWidth - 40, 280)}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  fromZero
                  style={{ borderRadius: 12 }}
                />
              </ViewShot>

              <Text style={styles.avgText}>Promedio: ⭐ {weeklyAvg}</Text>
            </>
          )}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.pdfBtn} onPress={exportToPDF}>
            <Text style={styles.pdfBtnText}>📄 Exportar reporte (PDF)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

/* =============== STYLES =============== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", padding: 16 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    marginVertical: 8,
    textAlign: "center",
  },
  section: { marginTop: 18 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  emotionsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  emotionBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  emotionText: { color: "#333", fontSize: 14 },
  emptyText: { color: "#666", fontStyle: "italic" },
  avgText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#7C3AED",
  },
  actions: { marginTop: 22, alignItems: "center" },
  pdfBtn: {
    backgroundColor: "#7C3AED",
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 12,
    elevation: 4,
  },
  pdfBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  // 🌸 estilos test de personalidad
  personalityReminderBox: {
    marginTop: 8,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#FFF5FB",
    borderWidth: 1,
    borderColor: "#F8B4D9",
  },
  personalityReminderText: {
    fontSize: 14,
    color: "#8A4A63",
  },
  personalityResultBox: {
    marginTop: 8,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#FDF2FF",
    borderWidth: 1,
    borderColor: "#E4B4F5",
  },
  personalityResultLabel: {
    fontSize: 12,
    color: "#7E6A8C",
    marginBottom: 4,
    fontWeight: "700",
  },
  personalityResultTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#4B275F",
    marginBottom: 4,
  },
  personalityResultScore: {
    fontSize: 13,
    color: "#6B21A8",
    marginBottom: 6,
  },
  personalityResultNote: {
    fontSize: 12,
    color: "#7E6A8C",
  },
});
