import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { IPets } from '../index.tsx';
import { fonts } from '../../../constants/fonts.ts';
import FavoriteIcon from '../../../assets/icons/FavoriteIcon.tsx';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoggedInStackType } from '../../../navigation/types';
import { ScreenNames } from '../../../constants/screenNames.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useState } from 'react';

export const handleAddToFavorites = async (pet: IPets) => {
  try {
    const favorites = await AsyncStorage.getItem('favorites');

    if (favorites) {
      const result: IPets[] = JSON.parse(favorites);
      if (result.find(e => e.timeStamp === pet.timeStamp)) {
        const filterResult = result.filter(e => e.timeStamp !== pet.timeStamp);
        await AsyncStorage.setItem('favorites', JSON.stringify(filterResult));
        return;
      }
      await AsyncStorage.setItem('favorites', JSON.stringify([...result, pet]));
    } else {
      await AsyncStorage.setItem('favorites', JSON.stringify([pet]));
    }
  } catch (e) {
    console.log(e);
  }
};

export default function PetsList({ pets }: { pets: IPets[] }) {
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();

  const [favorites, setFavorites] = useState<IPets[]>([]);

  const handleGoToPet = (item: IPets) => {
    navigation.navigate(ScreenNames.PET_PAGE, { pets: item });
  };

  const getFavorites = async () => {
    try {
      const favorite = await AsyncStorage.getItem('favorites');
      if (favorite) {
        const result = JSON.parse(favorite);
        setFavorites(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getFavorites();
    }, []),
  );

  return (
    <View style={styles.flex}>
      <FlatList
        data={pets}
        style={styles.mainContainer}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleGoToPet(item)}
            >
              <ImageBackground
                source={{ uri: item.images[0] }}
                imageStyle={{ borderRadius: 20 }}
                style={styles.image}
                resizeMode={'cover'}
              >
                <TouchableOpacity
                  style={{ alignSelf: 'flex-end', margin: 10 }}
                  onPress={() => {
                    handleAddToFavorites(item).then(() => {
                      getFavorites();
                    });
                  }}
                >
                  <FavoriteIcon
                    isFavorite={
                      !!favorites.find(e => e.timeStamp === item.timeStamp)
                    }
                  />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.text}>{item.type}</Text>
                  <Text style={styles.text}>{item.age} years</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  mainContainer: {
    width: '100%',
    marginHorizontal: 10,
  },
  item: {
    height: 200,
    width: Dimensions.get('window').width / 2 - 30,
    margin: 10,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  textContainer: { margin: 15 },
  text: {
    color: 'white',
    fontFamily: fonts.raleway,
  },
});
