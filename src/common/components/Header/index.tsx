import { DrawerActions, useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Label from '../../../assets/icons/Label';
import CloseIcon from '../../../assets/icons/CloseIcon.tsx';


interface IHeader {
  isOpenDrawer?: boolean;
}

export default function Header({ isOpenDrawer, navigation }: IHeader & { navigation?: any }) {
  // const navigation = useNavigation();
  //
  //
  // const handleOpenDrawer = () => {
  //   navigation.dispatch(DrawerActions.toggleDrawer());
  // };
  const defaultNavigation = useNavigation();
  const nav = navigation ?? defaultNavigation; // используем переданный navigation, если есть

  const handleOpenDrawer = () => {
    nav.dispatch(DrawerActions.toggleDrawer());
  };



  return (
    <View style={styles.wrapper}>
      <Label />
      {isOpenDrawer ? (
        <TouchableOpacity style={styles.burgerBtn} onPress={handleOpenDrawer}>
          <CloseIcon />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.burgerBtn} onPress={handleOpenDrawer}>
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 60,
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  burgerBtn: { height: 20, gap: 5, width: 20 },
  line: { width: '100%', height: 2, backgroundColor: 'black' },
});
