import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarStackType } from '../types';
import { ScreenNames } from '../../constants/screenNames.ts';
import Home from '../../screen/Home';
import Favorite from '../../screen/Favorite';
import getTabOptions from './options.tsx';

const Tab = createBottomTabNavigator<TabBarStackType>();

export default function TabBarStack() {
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.HOME_PAGE}
      screenOptions={({ route }) => getTabOptions(route)}
    >
      <Tab.Screen name={ScreenNames.HOME_PAGE} component={Home} />
      <Tab.Screen name={ScreenNames.FAVORITE_PAGE} component={Favorite} />
    </Tab.Navigator>
  );
}
