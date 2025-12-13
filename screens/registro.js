import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

//importamos la base de datos
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../config/firebaseConfig';

export default function Registro({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [pais, setPais] = useState('Mexico');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [genero, setGenero] = useState('');
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);
  const [errores, setErrores] = useState({});
  const [verPassword, setVerPassword] = useState(false);
  const [verConfirmPassword, setVerConfirmPassword] = useState(false);

  // nombre y apellidos
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');

  const handleRegistro = async () => {
    let nuevosErrores = {};

    // validaciones
    if (!nombre) nuevosErrores.nombre = 'El nombre es obligatorio.';
    if (!apellidos) nuevosErrores.apellidos = 'Los apellidos son obligatorios.';

    if (!correo) nuevosErrores.correo = 'El correo es obligatorio.';
    if (!password) nuevosErrores.password = 'La contraseña es obligatoria.';
    if (!confirmarPassword) nuevosErrores.confirmarPassword = 'Confirma tu contraseña.';
    else if (password !== confirmarPassword)
      nuevosErrores.confirmarPassword = 'Las contraseñas no coinciden.';
    if (!genero) nuevosErrores.genero = 'Selecciona tu sexo.';
    if (!aceptaPrivacidad)
      nuevosErrores.privacidad = 'Debes aceptar los términos de privacidad.';

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return; // Salir si hay errores

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'usuarios', user.uid), {
        // guardar nombre y apellidos
        nombre,
        apellidos,
        correo,
        pais,
        telefono,
        genero,
        createdAt: new Date(),
      });

      Alert.alert(
        'Registro exitoso 🎉',
        'Te has registrado correctamente',
        [
          {
            text: 'Ir al Login',
            onPress: () => navigation.replace('Login', { email: correo }),
          }
        ]
      );
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert(
          'Correo ya registrado',
          'Este correo ya tiene una cuenta. ¿Deseas ir al login?',
          [
            {
              text: 'Sí',
              onPress: () => navigation.navigate('Login', { email: correo }),
            },
            {
              text: 'No',
              style: 'cancel'
            }
          ]
        );
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <LinearGradient colors={['#ffffffff', '#ffffffff']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* --- Imagen de encabezado --- */}
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/partesuperior.png')}
            style={styles.headerImage}
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

        </View>

        {/* --- Fondo blanco con curva --- */}
        <View style={styles.bottomWhiteContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Regístrate a Anxiously</Text>

            {/*  Nombre */}
            <Text style={styles.label}>Ingresa tu nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="#999"
              value={nombre}
              onChangeText={setNombre}
            />
            {errores.nombre && <Text style={styles.error}>{errores.nombre}</Text>}

            {/* Apellidos */}
            <Text style={styles.label}>Ingresa tus apellidos</Text>
            <TextInput
              style={styles.input}
              placeholder="Apellidos"
              placeholderTextColor="#999"
              value={apellidos}
              onChangeText={setApellidos}
            />
            {errores.apellidos && <Text style={styles.error}>{errores.apellidos}</Text>}

            {/* Correo */}
            <Text style={styles.label}>Ingresa tu correo electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo"
              placeholderTextColor="#999"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
            />
            {errores.correo && <Text style={styles.error}>{errores.correo}</Text>}

            {/* País */}
            <Text style={styles.label}>Ingresa tu país</Text>
            <View style={styles.pickerContainer}>
              <Picker selectedValue={pais} onValueChange={(itemValue) => setPais(itemValue)}>
                <Picker.Item label="México" value="Mexico" />
                <Picker.Item label="Otro" value="Otro" />
              </Picker>
            </View>

            {/* Número celular */}
            <Text style={styles.label}>Ingresa tu número celular</Text>
            <TextInput
              style={styles.input}
              placeholder="+52"
              placeholderTextColor="#999"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />

            {/* Contraseña */}
            <Text style={styles.label}>Crea una contraseña</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Contraseña"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!verPassword}
              />
              <TouchableOpacity onPress={() => setVerPassword(!verPassword)}>
                <Ionicons
                  name={verPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            {errores.password && <Text style={styles.error}>{errores.password}</Text>}

            {/* Confirmar contraseña */}
            <Text style={styles.label}>Confirma tu contraseña</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Confirmar contraseña"
                placeholderTextColor="#999"
                value={confirmarPassword}
                onChangeText={setConfirmarPassword}
                secureTextEntry={!verConfirmPassword}
              />
              <TouchableOpacity onPress={() => setVerConfirmPassword(!verConfirmPassword)}>
                <Ionicons
                  name={verConfirmPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            {errores.confirmarPassword && (
              <Text style={styles.error}>{errores.confirmarPassword}</Text>
            )}

            {/* Género */}
            <Text style={styles.label}>Sexo</Text>
            <View style={styles.pickerContainer}>
              <Picker selectedValue={genero} onValueChange={(itemValue) => setGenero(itemValue)}>
                <Picker.Item label="Seleccionar" value="" />
                <Picker.Item label="Femenino" value="Femenino" />
                <Picker.Item label="Masculino" value="Masculino" />
              </Picker>
            </View>
            {errores.genero && <Text style={styles.error}>{errores.genero}</Text>}

            {/* Aceptar privacidad */}
            <TouchableOpacity
              style={styles.privacidadContainer}
              onPress={() => setAceptaPrivacidad(!aceptaPrivacidad)}
            >
              <View style={[styles.checkbox, aceptaPrivacidad && styles.checkboxChecked]} />
              <Text style={styles.privacidadText}>
                Acepto los términos y condiciones de privacidad
              </Text>
            </TouchableOpacity>
            {errores.privacidad && (
              <Text style={styles.error}>{errores.privacidad}</Text>
            )}

            {/* Botón Registrarse */}
            <TouchableOpacity
              onPress={handleRegistro}
              style={styles.buttonContainer}
            >
              <LinearGradient
                colors={['#A78BFA', '#F9A8D4']}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Registrarse</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerContainer: { width: '100%', height: 180, position: 'relative' },
  headerImage: { width: '100%', height: '100%', resizeMode: 'cover' },

  bottomWhiteContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -15,
    paddingTop: 40,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },

  container: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#111', marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 5 },

  input: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },

  loginButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: '#7C3AED',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    zIndex: 10,
    elevation: 5,
  },

  loginText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },

  inputPassword: { flex: 1, paddingVertical: 12, paddingRight: 10 },

  error: { color: 'red', fontSize: 12, marginBottom: 8 },
  privacidadContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  checkbox: { width: 20, height: 20, borderWidth: 2, borderColor: '#000', borderRadius: 4, marginRight: 10 },
  checkboxChecked: { backgroundColor: '#000' },
  privacidadText: { color: '#7C3AED', fontSize: 14, fontWeight: '600', textDecorationLine: 'underline', flex: 1 },

  buttonContainer: { alignItems: 'center', marginTop: 5, marginBottom: 30 },
  gradientButton: { width: '100%', paddingVertical: 14, borderRadius: 30, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
