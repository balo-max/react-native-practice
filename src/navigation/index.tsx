import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/Auth/Login';
import Registration from '../screen/Auth/Registration';
import { ScreenNames } from '../constants/screenNames';
import { RootStackNavigation } from './types';

const Stack = createNativeStackNavigator<RootStackNavigation>();

export function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ScreenNames.LOGIN_PAGE}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={ScreenNames.LOGIN_PAGE} component={Login} />
        <Stack.Screen
          name={ScreenNames.REGISTRATION_PAGE}
          component={Registration}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
