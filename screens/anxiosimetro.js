import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Anxiosimetro({ navigation, route }) {
  const [tiempo, setTiempo] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  const [activeNav, setActiveNav] = useState(0);
  const [monitorActivo, setMonitorActivo] = useState(false);
  const [fraseIndex, setFraseIndex] = useState(0);
  const [genero, setGenero] = useState('Femenino');
  const [nombreUsuario, setNombreUsuario] = useState('');

  const frases = [
    'Este proceso es valioso; cada paso cuenta.',
    'Respira y reconoce lo que has logrado hoy.',
    'Pequeños avances construyen grandes cambios.',
    'Tu bienestar importa; cuida de ti mismo/a.',
    'Un minuto a la vez: estás avanzando.',
    'Permítete sentir y seguir adelante con calma.',
    'Celebra las pequeñas victorias del día.',
    'La constancia hoy crea resiliencia mañana.',
    'Tu tiempo de recuperación es válido y real.',
    'Sigue cuidándote con paciencia y respeto.',
  ];

  const animSec = useRef(new Animated.Value(0)).current;
  const animMin = useRef(new Animated.Value(0)).current;
  const animHor = useRef(new Animated.Value(0)).current;
  const animDia = useRef(new Animated.Value(0)).current;

  const intervalRef = useRef(null);

  //  BOTÓN de ayuda
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Heartbeat loop boton: crecer, contraer ligeramente, volver a normal
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.12, duration: 300, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 0.98, duration: 180, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1.0, duration: 220, useNativeDriver: true }),
        Animated.delay(900),
      ])
    ).start();
  }, []);

  const hacerPop = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.86, duration: 110, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1.12, duration: 160, useNativeDriver: true }),
    ]).start(() => {
      // vuelvo a la animación de heartbeat (la loop ya corre)
      scaleAnim.setValue(1.0);
    });
  };

  useEffect(() => {
    inicializar();

    if (route?.params?.genero) {
      setGenero(route.params.genero);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const inicializar = async () => {
    try {
      const fechaInicio = await AsyncStorage.getItem('inicioAnsiedad');

      if (fechaInicio) {
        startMonitoring(fechaInicio);
        return;
      }

      if (route?.params?.start) {
        const now = new Date().toISOString();
        await AsyncStorage.setItem('inicioAnsiedad', now);
        startMonitoring(now);
        return;
      }
    } catch (e) {
      console.error('Error inicializando monitoreo:', e);
    }
  };

  const startMonitoring = async (forceStartDate = null) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    let inicio = forceStartDate;

    if (!inicio) {
      const existing = await AsyncStorage.getItem('inicioAnsiedad');
      inicio = existing || new Date().toISOString();
      await AsyncStorage.setItem('inicioAnsiedad', inicio);
    }

    setMonitorActivo(true);

    intervalRef.current = setInterval(() => {
      actualizarDesdeFecha(inicio);
    }, 1000);

    actualizarDesdeFecha(inicio);
  };

  const actualizarDesdeFecha = async (fechaInicioISO) => {
    const inicio = new Date(fechaInicioISO);
    const ahora = new Date();
    const diff = ahora - inicio;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    const nuevo = { dias, horas, minutos, segundos };
    setTiempo(nuevo);

    animarBarras(nuevo);

    if (segundos % 15 === 0) {
      setFraseIndex((i) => (i + 1) % frases.length);
    }
  };

  const animarBarras = (t) => {
    const secPct = (t.segundos % 60) / 59;
    const minPct = (t.minutos % 60) / 59;
    const horPct = (t.horas % 24) / 23;
    const diaPct = Math.min((t.dias % 365) / 365, 1);

    Animated.parallel([
      Animated.timing(animSec, { toValue: secPct, duration: 300, useNativeDriver: false }),
      Animated.timing(animMin, { toValue: minPct, duration: 300, useNativeDriver: false }),
      Animated.timing(animHor, { toValue: horPct, duration: 300, useNativeDriver: false }),
      Animated.timing(animDia, { toValue: diaPct, duration: 300, useNativeDriver: false }),
    ]).start();
  };

  const secWidth = animSec.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const minWidth = animMin.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const horWidth = animHor.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const diaWidth = animDia.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <LinearGradient colors={['#f3e8ff', '#faf5ff']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        
        {/* NAV BAR */}
        <View style={styles.navBar}>
          {[
            ['stats-chart-outline', 'Anxiósometro'],
            ['calendar-outline', 'Calendario'],
            ['heart-outline', 'Checking'],
            ['person-circle-outline', 'Perfil'],
          ].map(([icon, label], i) => (
            <TouchableOpacity
              key={i}
              style={styles.navItem}
              onPress={() => {
                setActiveNav(i);

                if (i === 0) navigation.navigate("Anxiosimetro");
                if (i === 1) navigation.navigate("Calendario");
                if (i === 2) navigation.navigate("Checking");
                if (i === 3) navigation.navigate("Perfil");
              }}
            >
              <Ionicons
                name={icon}
                size={26}
                color={activeNav === i ? '#7C3AED' : '#9CA3AF'}
              />
              {activeNav === i && <Text style={styles.navLabelActive}>{label}</Text>}
            </TouchableOpacity>
          ))}
        </View>

        {/* CONTENIDO */}
        <View style={styles.content}>
          <Text style={styles.title}>He estado sin ansiedad:</Text>

          {[
            ['#C084FC', 'días'],
            ['#60A5FA', 'horas'],
            ['#6EE7B7', 'minutos'],
            ['#F9A8D4', 'segundos'],
          ].map(([color, label], i) => {
            const widths = [diaWidth, horWidth, minWidth, secWidth];
            const values = [
              tiempo.dias,
              tiempo.horas,
              tiempo.minutos,
              tiempo.segundos,
            ];

            return (
              <View key={i} style={styles.barContainer}>
                <Animated.View
                  style={[
                    styles.barFill,
                    { width: widths[i], backgroundColor: color },
                  ]}
                >
                  <View style={[styles.triangle, { borderLeftColor: color }]} />
                </Animated.View>

                <Text style={styles.barText}>
                  {values[i]} {['días', 'horas', 'minutos', 'segundos'][i]}
                </Text>
              </View>
            );
          })}

          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.whiteCard}>
              <Image
                source={
                  genero === 'Femenino'
                    ? require('../assets/mujer.png')
                    : require('../assets/hombre.png')
                }
                style={styles.image}
              />

              <View style={styles.saludoBox}>
                <Text style={styles.saludoText}>
                  Hola, {nombreUsuario}! No olvides que este proceso vale la pena.{"\n"}
                  {frases[fraseIndex]}
                </Text>
              </View>

              <View style={styles.controlsRow}>
                {!monitorActivo ? (
                  <TouchableOpacity
                    style={styles.monitorButton}
                    onPress={() => {
                      AsyncStorage.setItem(
                        'inicioAnsiedad',
                        new Date().toISOString()
                      ).then(() => {
                        startMonitoring();
                      });
                    }}
                  >
                    <Text style={styles.monitorText}>Iniciar Monitoreo</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={{ alignItems: 'center', width: '100%' }}>
                    <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center' }}>
                      {/* Yellow glow detrás (difuso) */}
                      <View style={styles.yellowGlow} />

                      <TouchableOpacity
                        activeOpacity={0.85}
                        style={styles.fabButton}
                        onPress={async () => {
                          hacerPop();
                          const now = new Date().toISOString();
                          await AsyncStorage.setItem('inicioAnsiedad', now);
                          startMonitoring(now);
                          navigation.navigate("PantallaEjercicios");
                        }}
                      >
                        <Ionicons name="flash-outline" size={28} color="white" />
                      </TouchableOpacity>
                    </Animated.View>

                    <Text style={styles.smallLabel}>Necesito Apoyo</Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1 },

  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 10,
    elevation: 5,
  },

  navItem: {
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.22,
  },

  navLabelActive: {
    color: '#7C3AED',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '700',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },

  barContainer: {
    width: '90%',
    height: 55,
    backgroundColor: '#9ea1a5ff',
    borderRadius: 14,
    marginVertical: 6,
    justifyContent: 'center',
    overflow: 'hidden',
  },

  barFill: {
    position: 'absolute',
    left: 0,
    height: '100%',
  },

  barText: {
    textAlign: 'left',
    color: 'white',
    fontWeight: '900',
    fontSize: 18,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  triangle: {
    position: 'absolute',
    right: -9,
    width: 0,
    height: '100%',
    borderBottomWidth: 55,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },

  whiteCard: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 40,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 10,
    alignItems: 'center',
    elevation: 6,
  },

  image: {
    width: 180,
    height: 180,
    marginVertical: 10,
    borderRadius: 12,
  },

  saludoBox: {
    backgroundColor: '#E9D5FF',
    width: '100%',
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
  },

  saludoText: {
    color: '#5B21B6',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
  },

  controlsRow: {
    flexDirection: 'row',
    marginTop: 16,
    width: '100%',
    justifyContent: 'center',
  },

  monitorButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 30,
  },

  monitorText: {
    color: 'white',
    fontWeight: '600',
  },

 
  fabButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    // sombra blanca suave sobre el botón
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 2,
  },


  yellowGlow: {
    position: 'absolute',
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: 'rgba(250,204,21,0.16)', // amarillo suave
    shadowColor: '#edd26693',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 22,
    elevation: 6,
    zIndex: 1,
    top: -15,
    alignSelf: 'center',
  },

  smallLabel: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '700',
    color: '#4B2771', // morado oscuro
    textTransform: 'lowercase',
  },


  btnLabel: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#444',
  },
});
