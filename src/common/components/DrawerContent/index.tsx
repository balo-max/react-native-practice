import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../Header';
import ArrowIcon from '../../../assets/icons/ArrowIcon.tsx';
import { fonts } from '../../../constants/fonts.ts';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
// import { useNavigation } from '@react-navigation/core';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { LoggedInStackType } from '../../../navigation/types';
import { ScreenNames } from '../../../constants/screenNames.ts';
// import { DrawerActions } from '@react-navigation/native';

export default function DrawerContent({navigation }: DrawerContentComponentProps) {
  // const nav = useNavigation<StackNavigationProp<LoggedInStackType>>();
  const navigateToLanguages = () => {
    navigation.navigate(ScreenNames.LANGUAGES_PAGE);
    // navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const navigateToWebPage = () => {
    navigation.navigate(ScreenNames.WEB_PAGE);
  };

  return (
    <View>
      <Header isOpenDrawer={true} navigation={navigation}/>
      <View style={styles.mainWrapper}>
        <TouchableOpacity style={styles.btnWrapper} onPress={navigateToWebPage}>
          <Text style={styles.text}>Наш сайт</Text>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrapper} onPress={navigateToLanguages}>
          <Text style={styles.text}>Налаштування мови</Text>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrapper}>
          <Text style={styles.text}>Вихід</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { marginHorizontal: 10, gap: 16 },
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: fonts.raleway,
    fontSize: 16,
    color: 'black',
  },
});
