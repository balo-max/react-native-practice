import { IPets } from '../index.tsx';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoggedInStackType } from '../../../navigation/types';
import { useNavigation } from '@react-navigation/core';
import { ScreenNames } from '../../../constants/screenNames.ts';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchIcon from '../../../assets/icons/SearchIcon.tsx';
import SettingsIcon from '../../../assets/icons/SettingsIcon.tsx';

interface ISearchBarProps {
  handleSearch: (search: string) => void;
  pets: IPets[];
}

export default function SearchBar({ handleSearch, pets }: ISearchBarProps) {
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();

  const handleNavigateToSettings = () => {
    navigation.navigate(ScreenNames.FILTERS_SETTINGS_PAGE, { petsList: pets });
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.searchWrapper}>
        <View style={styles.searchIconWrapper}>
          <SearchIcon />
        </View>
        <TextInput
          placeholder="Search..."
          onChangeText={text => handleSearch(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={handleNavigateToSettings}
      >
        <SettingsIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flexDirection: 'row', alignItems: 'center' },
  searchWrapper: {
    borderRadius: 20,
    backgroundColor: '#EFF1F4',
    height: 40,
    width: Dimensions.get('window').width - 70,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchIconWrapper: { marginHorizontal: 20 },
  settingsIcon: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF1F4',
  },
});
