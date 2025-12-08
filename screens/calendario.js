import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Calendar } from "react-native-calendars";

export default function Calendario({ navigation }) {
  const [activeNav, setActiveNav] = useState(1); // CALENDARIO ACTIVADO
  const [selectedDay, setSelectedDay] = useState("");
  const [feeling, setFeeling] = useState("");

  const feelings = [
    { id: 1, label: "😊 Feliz", color: "#4CAF50" },
    { id: 2, label: "😐 Normal", color: "#2196F3" },
    { id: 3, label: "😔 Triste", color: "#9C27B0" },
    { id: 4, label: "😡 Enojado", color: "#F44336" },
    { id: 5, label: "😰 Ansioso", color: "#FF9800" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* 🟣 STATUS BAR */}
      <StatusBar backgroundColor="#7C3AED" barStyle="light-content" />

      {/* 🟣 BARRA SUPERIOR */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Calendario emocional</Text>
      </View>

      {/* 🟣 CONTENIDO */}
      <ScrollView style={{ padding: 20 }}>
        
        {/* 📅 CALENDARIO */}
        <Calendar
          onDayPress={(day) => setSelectedDay(day.dateString)}
          markedDates={{
            [selectedDay]: {
              selected: true,
              selectedColor:
                feelings.find((f) => f.label === feeling)?.color || "#7C3AED",
            },
          }}
          theme={{
            todayTextColor: "#7C3AED",
            arrowColor: "#7C3AED",
          }}
        />

        <Text style={styles.subtitle}>¿Cómo te sentiste este día?</Text>

        {/* 🟣 BOTONES DE EMOCIONES */}
        <View style={styles.feelingsContainer}>
          {feelings.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[
                styles.emotionBtn,
                feeling === f.label && { backgroundColor: f.color },
              ]}
              onPress={() => setFeeling(f.label)}
            >
              <Text
                style={[
                  styles.emotionText,
                  feeling === f.label && { color: "white" },
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Resultado */}
        {selectedDay !== "" && feeling !== "" && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>Día: {selectedDay}</Text>
            <Text style={styles.resultText}>Estado: {feeling}</Text>
          </View>
        )}
      </ScrollView>

      {/* 🟣 NAV BAR INFERIOR */}
      <View style={styles.navBar}>
        {[
          ["stats-chart-outline", "Anxiosimetro", "Anxiosimetro"],
          ["calendar-outline", "Calendario", "Calendario"],
          ["heart-outline", "Checking", "Checking"],
          ["person-circle-outline", "Perfil", "Perfil"],
        ].map(([icon, label, screen], i) => (
          <TouchableOpacity
            key={i}
            style={styles.navItem}
            onPress={() => {
              setActiveNav(i);
              navigation.navigate(screen);
            }}
          >
            <Ionicons
              name={icon}
              size={26}
              color={activeNav === i ? "#7C3AED" : "#9CA3AF"}
            />
            {activeNav === i && (
              <Text style={styles.navLabelActive}>{label}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#7C3AED",
    alignItems: "center",
  },
  topBarTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 15,
    color: "#4B0082",
    fontWeight: "bold",
  },
  feelingsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  emotionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#7C3AED",
  },
  emotionText: {
    fontSize: 16,
    color: "#7C3AED",
  },
  resultBox: {
    marginTop: 20,
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 10,
  },
  resultText: {
    fontSize: 16,
    marginVertical: 5,
  },
  navBar: {
    position: "absolute",
    top: 0,              
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
    backgroundColor: "white",
    borderBottomWidth: 1, 
    borderColor: "#e5e7eb",
    zIndex: 999,
  },
  navItem: {
    alignItems: "center",
  },
  navLabelActive: {
    fontSize: 12,
    color: "#7C3AED",
    marginTop: 5,
    fontWeight: "bold",
  },
});
