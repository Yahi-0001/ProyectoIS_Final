import { MaterialIcons } from '@expo/vector-icons';
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

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      navigation.navigate('Test'); // pantalla de prueba
    } else {
      Alert.alert('Error', 'Ingresa correo y contraseña');
    }
  };

  return (
    <LinearGradient
      colors={['#ffffff','#ffffff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* --- Título --- */}
        <Text style={styles.title}>Bienvenido a Anxiously</Text>
        <Text style={styles.subtitle}>
         Iniciar sesión
        </Text>

        
        {/* --- Imagen ilustración --- */}
        <Image
          source={require('../assets/loginIllustration.png')}
          style={styles.image}
        />

        
        {/* --- Input correo --- */}
        <View style={[styles.inputBox, { flexDirection: 'row', alignItems: 'center', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 15 }]}>
          <MaterialIcons name="email" size={20} color="#7C3AED" style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Ingresa tu correo electrónico o número"
            placeholderTextColor="#7F7F7F"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={[styles.input, { flex: 1 }]}
          />
        </View>

        {/* --- Input contraseña --- */}
        <View style={[styles.inputBox,{ backgroundColor: '#cebceaff', flexDirection: 'row', 
          alignItems: 'center', paddingVertical: 6, borderRadius: 20 }]}>
          <MaterialIcons name="lock" size={20} color="#7C3AED" style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Ingresa tu contraseña"
            placeholderTextColor="#7F7F7F"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={[styles.input, { flex: 1 }]}
          />
        </View>

        {/* --- Botón iniciar sesión --- */}
        <TouchableOpacity onPress={handleLogin} style={styles.buttonContainer}>
          <LinearGradient
            colors={['#5B0EAD', '#5B0EAD']}
            style={styles.button}
          >
            <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* --- Footer registrar --- */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Aún no tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
            <Text style={styles.register}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  image: {
    width: 550,
    height: 500,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    color: '#111',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 25,
    textAlign: 'center',
  },
  inputBox: {
    width: '100%',
    backgroundColor: '#cebceaff',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 15,
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#555',
  },
  register: {
    color: '#7C3AED',
    fontWeight: '700',
  },
});
