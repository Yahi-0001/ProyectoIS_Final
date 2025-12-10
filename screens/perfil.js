import { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState("Regina Gámez");
  const [email, setEmail] = useState("marir8046@gmail.com");
  const [phone, setPhone] = useState("27134578941");
  const [language, setLanguage] = useState("es");
  const [activeNav, setActiveNav] = useState(3);

  const [mood, setMood] = useState("Tranquila 😌");
  const [goal, setGoal] = useState("3 chequeos al día");
  const [notificationsOn, setNotificationsOn] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f3e8ff" }}>
      <LinearGradient colors={["#faf5ff", "#f3e8ff"]} style={{ flex: 1 }}>
        <View style={styles.screen}>

          {/* NAV BAR ARRIBA (BAJADA) */}
          <View style={styles.navBar}>
            {[
              ["stats-chart-outline", "Anxiósometro", "Anxiosimetro"],
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

          {/* CONTENIDO */}
          <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >

            {/* TARJETA DE BIENVENIDA */}
            <LinearGradient
              colors={["#ffffff", "#f5f3ff"]}
              style={styles.headerCard}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.helloText}>Hola,</Text>
                <Text style={styles.nameBig}>{name}</Text>

                <LinearGradient
                  colors={["#ede9fe", "#e0f2fe"]}
                  style={styles.badge}
                >
                  <Ionicons
                    name="sparkles-outline"
                    size={16}
                    color="#7C3AED"
                  />
                  <Text style={styles.badgeText}>Tu espacio seguro 💜</Text>
                </LinearGradient>

                <Text style={styles.smallText}>
                  Hoy te sientes: <Text style={styles.moodText}>{mood}</Text>
                </Text>
              </View>

              <View style={styles.avatarCircle}>
                <FontAwesome name="user" size={50} color="#555" />
              </View>
            </LinearGradient>

            {/* ESTADÍSTICAS */}
            <View style={styles.statsRow}>
              <LinearGradient
                colors={["#fef3c7", "#ffe4e6"]}
                style={styles.statCard}
              >
                <Text style={styles.statLabel}>Racha de calma 🔥</Text>
                <Text style={styles.statNumber}>5 días</Text>
                <Text style={styles.statHint}>Sigue así, lo haces genial</Text>
              </LinearGradient>

              <LinearGradient
                colors={["#dbeafe", "#ede9fe"]}
                style={styles.statCard}
              >
                <Text style={styles.statLabel}>Sesiones 🎧</Text>
                <Text style={styles.statNumber}>18</Text>
                <Text style={styles.statHint}>Tu mente se está cuidando</Text>
              </LinearGradient>
            </View>

            {/* ESTADO */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tu estado de hoy ✨</Text>
              <Text style={styles.sectionSubtitle}>
                Toca una opción para actualizar cómo te sientes.
              </Text>

              <View style={styles.chipsRow}>
                {["Tranquila 😌", "Nerviosa 😰", "Cansada 🥱"].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.chip,
                      mood === item && styles.chipActive,
                    ]}
                    onPress={() => setMood(item)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        mood === item && styles.chipTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* DATOS PERSONALES */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Datos personales 👤</Text>

              <View style={styles.rowBetween}>
                <Text style={styles.labelInline}>Nombre</Text>
                <MaterialIcons name="edit" size={18} color="#7C3AED" />
              </View>
              <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={name} onChangeText={setName} />
              </View>

              <View style={styles.rowBetween}>
                <Text style={styles.labelInline}>Correo</Text>
                <MaterialIcons name="email" size={16} color="#7C3AED" />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                />
                <MaterialIcons name="edit" size={20} color="#7C3AED" />
              </View>

              <View style={styles.rowBetween}>
                <Text style={styles.labelInline}>Número celular</Text>
                <MaterialIcons name="phone-android" size={16} color="#7C3AED" />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                />
                <MaterialIcons name="edit" size={20} color="#7C3AED" />
              </View>

              <Text style={styles.labelInline}>Idioma 🌐</Text>
              <View style={styles.dropdown}>
                <Picker selectedValue={language} onValueChange={setLanguage}>
                  <Picker.Item label="Español" value="es" />
                  <Picker.Item label="Inglés" value="en" />
                </Picker>
              </View>
            </View>

            {/* METAS */}
            <LinearGradient
              colors={["#fdf2ff", "#e0f2fe"]}
              style={styles.cardColored}
            >
              <Text style={styles.sectionTitle}>Preferencias & metas 🎯</Text>

              <Text style={styles.labelInline}>Meta diaria</Text>
              <View style={styles.chipsRow}>
                {[
                  "3 chequeos al día",
                  "5 chequeos al día",
                  "Solo cuando lo necesite",
                ].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.chipSmall,
                      goal === item && styles.chipActiveColored,
                    ]}
                    onPress={() => setGoal(item)}
                  >
                    <Text
                      style={[
                        styles.chipTextSmall,
                        goal === item && styles.chipTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={[styles.preferenceRow, { marginTop: 20 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.preferenceTitle}>Notificaciones 📲</Text>
                  <Text style={styles.preferenceSubtitle}>
                    Recordatorios suaves para cuidar tu ansiedad.
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.toggle,
                    notificationsOn && styles.toggleOn,
                  ]}
                  onPress={() => setNotificationsOn(!notificationsOn)}
                >
                  <View
                    style={[
                      styles.toggleCircle,
                      notificationsOn && styles.toggleCircleOn,
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>

            {/* MÁS OPCIONES */}
            <LinearGradient
              colors={["#eef2ff", "#fef9c3"]}
              style={styles.cardColored}
            >
              <Text style={styles.sectionTitle}>Más opciones ⚙️</Text>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Configuracion")}
              >
                <View style={[styles.iconBubble, { backgroundColor: "#e0f2fe" }]}>
                  <Ionicons name="settings-sharp" size={18} color="#1D4ED8" />
                </View>
                <Text style={styles.menuText}>Configuración</Text>
                <Entypo name="chevron-right" size={20} color="#6B7280" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Ayuda")}
              >
                <View style={[styles.iconBubble, { backgroundColor: "#fef3c7" }]}>
                  <Ionicons name="help-circle-outline" size={18} color="#B45309" />
                </View>
                <Text style={styles.menuText}>Centro de ayuda</Text>
                <Entypo name="chevron-right" size={20} color="#6B7280" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("EliminarCuenta")}
              >
                <View style={[styles.iconBubble, { backgroundColor: "#fee2e2" }]}>
                  <Ionicons name="warning-outline" size={18} color="#DC2626" />
                </View>
                <Text style={[styles.menuText, { color: "#DC2626" }]}>
                  Eliminar cuenta
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.menuItem, { marginTop: 6 }]}
                onPress={() => navigation.navigate("Login")}
              >
                <View style={[styles.iconBubble, { backgroundColor: "#e5e7eb" }]}>
                  <Ionicons name="log-out-outline" size={18} color="#111827" />
                </View>
                <Text style={[styles.menuText, { color: "#111827" }]}>
                  Cerrar sesión
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  screen: { flex: 1 },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  /* ⭐ NAV BAR ARRIBA (BAJADA Y BONITA) */
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingVertical: 10,
    elevation: 6,

    marginTop: 30,               // 
    borderBottomLeftRadius: 22,  // opcional
    borderBottomRightRadius: 22, // opcional

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  navItem: {
    alignItems: "center",
    width: SCREEN_WIDTH * 0.22,
  },
  navLabelActive: {
    color: "#7C3AED",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "700",
  },

  /* HEADER */
  headerCard: {
    flexDirection: "row",
    borderRadius: 24,
    padding: 18,
    alignItems: "center",
    marginBottom: 16,
    marginTop: 25,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  helloText: { fontSize: 14, color: "#6B7280" },
  nameBig: { fontSize: 22, fontWeight: "700", color: "#111827" },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 6,
  },
  badgeText: { marginLeft: 4, fontSize: 12, color: "#4B5563" },

  smallText: { fontSize: 13, color: "#6B7280", marginTop: 6 },
  moodText: { fontWeight: "600", color: "#4C1D95" },

  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 18,
  },

  /* STATS */
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 4,
  },
  statLabel: { fontSize: 12, color: "#6B7280" },
  statNumber: { fontSize: 20, fontWeight: "700", color: "#111827" },

  statHint: {
    fontSize: 11,
    color: "#4B5563",
    marginTop: 4,
  },

  /* ESTADO */
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  sectionSubtitle: { fontSize: 12, color: "#6B7280" },

  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
  },
  chipActive: { backgroundColor: "#7C3AED" },
  chipText: { fontSize: 13, color: "#111" },
  chipTextActive: { color: "#fff", fontWeight: "700" },

  chipSmall: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    backgroundColor: "#E5E7EB",
    marginTop: 4,
  },
  chipTextSmall: { fontSize: 12, color: "#111827" },
  chipActiveColored: { backgroundColor: "#7C3AED" },

  /* INPUTS */
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  labelInline: { fontSize: 13, color: "#4B5563", marginTop: 8 },

  inputContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 6,
  },

  input: { flex: 1, height: 45 },

  dropdown: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    marginTop: 6,
  },

  /* PREFERENCIAS */
  preferenceRow: { flexDirection: "row", alignItems: "center" },
  preferenceTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  preferenceSubtitle: {
    fontSize: 12,
    color: "#4B5563",
    marginTop: 2,
    width: SCREEN_WIDTH * 0.55,
  },

  toggle: {
    width: 46,
    height: 26,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
    padding: 3,
    justifyContent: "center",
  },
  toggleOn: { backgroundColor: "#7C3AED" },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  toggleCircleOn: { alignSelf: "flex-end" },

  /* CARDS DE COLOR */
  cardColored: {
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
  },

  /* MÁS OPCIONES */
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 24,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#374151",
  },
  iconBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
