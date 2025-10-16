import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoggedInStackType } from '../../../navigation/types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fonts } from '../../../constants/fonts.ts';
import ArrowIcon from '../../../assets/icons/ArrowIcon.tsx';

export default function SettingsHeader() {
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();
  return (
    <View style={styles.mainWrapper}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <ArrowIcon width={20} height={20} />
      </TouchableOpacity>
      <Text style={styles.title}>Фільтри</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
  },
  backBtn: {
    transform: [{ rotate: '180deg' }],
  },
  title: {
    flex: 0.62,
    fontFamily: fonts.raleway,
    color: 'black',
  },
});
