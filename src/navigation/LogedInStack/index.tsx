import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoggedInStackType } from '../types';
import { ScreenNames } from '../../constants/screenNames.ts';
import DrawerStack from '../DrawerStack';
import SettingsHeader from '../../common/components/SettingsHeader';
import FilterSettings from '../../screen/FilterSettings';
import PetPage from '../../screen/PetPage';

const Stack = createNativeStackNavigator<LoggedInStackType>();
const renderSettingHeader = () => <SettingsHeader/>

export default function LoggedInStack() {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.DRAWER_STACK}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ScreenNames.DRAWER_STACK} component={DrawerStack} />
      <Stack.Screen
        options={{
          headerShown: true,
          header: renderSettingHeader,
        }}
        name={ScreenNames.FILTERS_SETTINGS_PAGE}
        component={FilterSettings}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={ScreenNames.PET_PAGE}
        component={PetPage}
      />
    </Stack.Navigator>
  );
}
