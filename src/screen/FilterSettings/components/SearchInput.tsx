import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import { fonts } from '../../../constants/fonts.ts';
import SearchIcon from '../../../assets/icons/SearchIcon.tsx';

interface ISearchInput {
  onSearch: (text: string) => void;
  value: string;
  title: string;
}

export default function SearchInput({ onSearch, value, title }: ISearchInput) {
  return (
    <View style={{ gap: 5 }}>
      <Text style={styles.btnText}>{title}</Text>
      <View style={styles.selectSearch}>
        <View style={styles.searchIconWrapper}>
          <SearchIcon />
        </View>
        <TextInput
          placeholderTextColor={'#838383'}
          placeholder={'Обери зі списку'}
          value={value}
          onChangeText={onSearch}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchIconWrapper: { marginHorizontal: 20 },

  btnText: { fontFamily: fonts.raleway, color: '#0B0B0B' },

  selectSearch: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#EAE9FB',
    height: 50,
    width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
