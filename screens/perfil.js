import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { Entypo, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ProfileScreen({ navigation }) {

  const [name, setName] = useState("Regina Gámez");
  const [email, setEmail] = useState("marir8046@gmail.com");
  const [phone, setPhone] = useState("27134578941");
  const [language, setLanguage] = useState("es");
  const [activeNav, setActiveNav] = useState(3); // PERFIL activado

  return (
    <LinearGradient colors={["#faf5ff", "#f3e8ff"]} style={{ flex: 1 }}>

      {/*NAV BAR*/}
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

      {/*CONTENIDO */}
      <ScrollView style={styles.container}>

        {/* FOTO */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <FontAwesome name="user" size={60} color="#555" />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.name}>{name}</Text>
            <TouchableOpacity>
              <MaterialIcons name="edit" size={18} color="black" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* CORREO */}
        <Text style={styles.label}>Correo:</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />
          <MaterialIcons name="edit" size={20} color="black" />
        </View>

        {/* TELÉFONO */}
        <Text style={styles.label}>Número celular:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <MaterialIcons name="edit" size={20} color="black" />
        </View>

        {/* IDIOMA */}
        <Text style={styles.label}>Idioma</Text>
        <View style={styles.dropdown}>
          <Picker selectedValue={language} onValueChange={setLanguage}>
            <Picker.Item label="Español" value="es" />
            <Picker.Item label="Inglés" value="en" />
          </Picker>
        </View>

        {/* MENÚ */}
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Configuracion")}
          >
            <Ionicons name="settings-sharp" size={20} color="black" />
            <Text style={styles.menuText}>Configuración</Text>
            <Entypo name="chevron-down" size={20} color="black" style={{ marginLeft: "auto" }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Login")}
          >
            <Ionicons name="log-out-outline" size={20} color="black" />
            <Text style={styles.menuText}>Cerrar sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("EliminarCuenta")}
          >
            <Ionicons name="warning-outline" size={20} color="black" />
            <Text style={styles.menuText}>Eliminar cuenta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Ayuda")}
          >
            <Ionicons name="help-circle-outline" size={20} color="black" />
            <Text style={styles.menuText}>Ayuda</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },


  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingVertical: 10,
    elevation: 5,
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

//perfil
  avatarContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    backgroundColor: "#E6E6E6",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    marginTop: 15,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: { flex: 1, height: 45 },
  dropdown: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    marginBottom: 15,
  },
  menu: { marginTop: 20 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
