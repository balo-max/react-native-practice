import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { DrawerStackType } from '../types';
import { ScreenNames } from '../../constants/screenNames.ts';
import TabBarStack from '../TabBarStack';
import DrawerContent from '../../common/components/DrawerContent';
import Header from '../../common/components/Header';
import { Dimensions } from 'react-native';

const Drawer = createDrawerNavigator<DrawerStackType>();

// const renderDrawerContent = () => <DrawerContent/>
const renderDrawerContent = (props: DrawerContentComponentProps) => <DrawerContent {...props} />;
const renderHeader = () => <Header/>

export default function DrawerStack() {
  return (
    <Drawer.Navigator
      initialRouteName={ScreenNames.TAB_BAR_STACK}
      drawerContent={renderDrawerContent}
      screenOptions={{
        header: renderHeader,
        drawerPosition: 'right',
        drawerStyle: {
          width: Dimensions.get('window').width,
        },
      }}
    >
      <Drawer.Screen name={ScreenNames.TAB_BAR_STACK} component={TabBarStack} />
    </Drawer.Navigator>
  );
}
