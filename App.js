import 'react-native-gesture-handler';
import 'react-native-reanimated';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Anxiosimetro from './screens/anxiosimetro';
import Inicio from './screens/inicio';
import Login from './screens/login';
import PantallaEjercicios from './screens/PantallaEjercicios';
import Registro from './screens/registro';
import Test from './screens/test';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Inicio"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Anxiosimetro" component={Anxiosimetro} />
        <Stack.Screen name="PantallaEjercicios" component={PantallaEjercicios} />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}