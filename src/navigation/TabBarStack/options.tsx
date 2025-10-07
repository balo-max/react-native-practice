import { ScreenNames } from '../../constants/screenNames.ts';
import PawIcon from '../../assets/icons/PawIcon.tsx';
import HeartIcon from '../../assets/icons/HeartIcon.tsx';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { fonts } from '../../constants/fonts.ts';
import { RouteProp } from '@react-navigation/native';

const getName = (name: string) => {
  switch (name) {
    case ScreenNames.FAVORITE_PAGE:
      return 'Улюблюені';
    case ScreenNames.HOME_PAGE:
      return 'Пухнастики';
  }
};

const getIcon = (name: string, focused: boolean) => {
  switch (name) {
    case ScreenNames.FAVORITE_PAGE:
      return <HeartIcon isFocused={focused} color={'#0B0B0B'} />;
    case ScreenNames.HOME_PAGE:
      return <PawIcon isFocused={focused} color={'#0B0B0B'} />;
  }
};

export default function getTabOptions(
  route: RouteProp<Record<string, object | undefined>, string>,
): BottomTabNavigationOptions {
  return {
    tabBarStyle: {
      height: 52,
      width: '100%',
      backgroundColor: '#E5F3F5',
      borderTopRightRadius: 50,
      borderTopLeftRadius: 50,
    },
    tabBarShowLabel: false,
    headerShown: false,
    tabBarIcon: ({ focused }) => {
      return (
        <View style={{ width: 100, alignItems: 'center', gap: 5, marginTop: 10 }}>
          {getIcon(route.name, focused)}
          <Text
            style={{
              fontFamily: fonts.raleway,
              color: focused ? 'black' : '#838383',
            }}
          >
            {getName(route.name)}
          </Text>
        </View>
      );
    },
  };
}
