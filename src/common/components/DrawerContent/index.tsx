import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../Header';
import ArrowIcon from '../../../assets/icons/ArrowIcon.tsx';
import { fonts } from '../../../constants/fonts.ts';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

export default function DrawerContent({navigation }: DrawerContentComponentProps) {
  return (
    <View>
      <Header isOpenDrawer={true} navigation={navigation}/>
      <View style={styles.mainWrapper}>
        <TouchableOpacity style={styles.btnWrapper}>
          <Text style={styles.text}>Наш сайт</Text>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrapper}>
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
