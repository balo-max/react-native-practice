import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarStackType } from '../types';
import { ScreenNames } from '../../constants/screenNames.ts';
import Home from '../../screen/Home';
import Favorite from '../../screen/Favorite';
import getTabOptions from './options.tsx';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

import type { RouteProp } from '@react-navigation/native';

const Tab = createBottomTabNavigator<TabBarStackType>();
export default function TabBarStack() {
  const {t} = useTranslation();
  const tabOptions = useCallback(
    (route: RouteProp<Record<string, object | undefined>, string>) => {
      return getTabOptions(route);
    },
    [t],
  );
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.HOME_PAGE}
      screenOptions={({route}) => ({...tabOptions(route)})}>
      <Tab.Screen name={ScreenNames.HOME_PAGE} component={Home} />
      <Tab.Screen name={ScreenNames.FAVORITE_PAGE} component={Favorite} />
    </Tab.Navigator>
  );
}
