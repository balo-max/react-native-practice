import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fonts } from '../../constants/fonts.ts';
import { RouteProp, useRoute } from '@react-navigation/native';
import { IPets } from '../Home';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoggedInStackType } from '../../navigation/types';
import { useState } from 'react';
import DefaultButton from '../../common/components/DefaultButton/index.tsx';
import ArrowIcon from '../../assets/icons/ArrowIcon.tsx';
import HeartIcon from '../../assets/icons/HeartIcon.tsx';
import LongArrowIcon from '../../assets/icons/LongArrorIcon.tsx';
import PlaceIcon from '../../assets/icons/PlaceIcon.tsx';

export default function PetPage() {
  const route = useRoute<RouteProp<{ params: { pets: IPets } }>>();
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();

  const [sliderIndex, setSliderIndex] = useState<number>(0);

  const handleNext = () => {
    if (sliderIndex + 1 < route?.params?.pets?.images.length) {
      setSliderIndex(prev => prev + 1);
    } else {
      setSliderIndex(0);
    }
  };

  const handlePrev = () => {
    if (sliderIndex - 1 >= 0) {
      setSliderIndex(prev => prev - 1);
    } else {
      setSliderIndex(route?.params?.pets?.images.length);
    }
  };

  console.log('route?.params?.pet', route?.params?.pets);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <ImageBackground
          source={{ uri: route?.params?.pets?.images[sliderIndex] }}
          style={styles.imgBackground}
        >
          <View style={styles.mainContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.backBtn}
              hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
            >
              <ArrowIcon height={20} width={20} color={'white'} />
            </TouchableOpacity>
            <View style={styles.sliderWrapper}>
              <TouchableOpacity
                style={styles.sliderBtnLeft}
                onPress={handlePrev}
              >
                <LongArrowIcon />
              </TouchableOpacity>
              <View style={styles.dotWrapper}>
                {route?.params?.pets?.images.map((_, index) => (
                  <View
                    style={[
                      styles.activeDot,
                      index !== sliderIndex && { opacity: 0.5 },
                    ]}
                  />
                ))}
              </View>
              <TouchableOpacity
                style={styles.sliderBtnRight}
                onPress={handleNext}
              >
                <LongArrowIcon />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={{ margin: 10, gap: 10 }}>
          <View style={styles.titleContainer}>
            <View>
              <Text style={styles.titleText}>{route?.params?.pets?.name}</Text>
              <View style={styles.iconContainer}>
                <PlaceIcon />
                <Text style={styles.locationText}>
                  {route?.params?.pets.location}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.heartContainer}>
              <HeartIcon />
            </TouchableOpacity>
          </View>

          <View style={{ gap: 10, marginHorizontal: 10 }}>
            <Text style={[styles.titleText, { fontSize: 18 }]}>
              Характеристики:
            </Text>
            <View style={styles.characterContainer}>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>
                  {route?.params?.pets.age} років
                </Text>
              </View>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>
                  {route?.params?.pets.color}
                </Text>
              </View>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>
                  {route?.params?.pets.type}
                </Text>
              </View>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>
                  {route?.params?.pets.sex}
                </Text>
              </View>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>
                  {route?.params?.pets.isVaccinated
                    ? 'Вакцінований'
                    : 'Не вакцинований'}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ margin: 10, gap: 10 }}>
            <Text style={[styles.titleText, { fontSize: 18 }]}>
              Моя історія:
            </Text>
            <View>
              <Text style={styles.characterText}>
                {route?.params?.pets.description}
              </Text>
            </View>
          </View>
          <DefaultButton onPress={() => {}} text={"Подарувати сім'ю"} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imgBackground: { width: '100%', height: 400 },
  mainContainer: {
    padding: 10,
    justifyContent: 'space-between',
    height: '100%',
  },
  backBtn: {
    transform: [{ rotate: '180deg' }],
    alignSelf: 'flex-start',
  },
  sliderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderBtnLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 10,
    transform: [{ rotate: '180deg' }],
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  dotWrapper: { flexDirection: 'row', gap: 3 },
  sliderBtnRight: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    alignItems: 'center',
  },
  titleText: { fontFamily: fonts.raleway, fontSize: 24 },
  iconContainer: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  locationText: {
    fontFamily: fonts.raleway,
    fontSize: 16,
    color: '#838383',
  },
  heartContainer: {
    alignSelf: 'flex-start',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAE9FB',
  },
  characterWrapper: {
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#EAE9FB',
  },
  characterText: { fontFamily: fonts.raleway, color: 'black' },
  characterContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
