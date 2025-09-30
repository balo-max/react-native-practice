import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoggedOutStackType } from '../types';
import { ScreenNames } from '../../constants/screenNames.ts';
import Login from '../../screen/Auth/Login';
import Registration from '../../screen/Auth/Registration';

const Stack = createNativeStackNavigator<LoggedOutStackType>();

export default function LoggedOutStack() {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.LOGIN_PAGE}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={ScreenNames.LOGIN_PAGE} component={Login} />
      <Stack.Screen
        name={ScreenNames.REGISTRATION_PAGE}
        component={Registration}
      />
    </Stack.Navigator>
  );
}
