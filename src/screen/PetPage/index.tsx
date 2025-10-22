import {
  Image,
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
import { useEffect, useState } from 'react';
import DefaultButton from '../../common/components/DefaultButton/index.tsx';
import ArrowIcon from '../../assets/icons/ArrowIcon.tsx';
import LongArrowIcon from '../../assets/icons/LongArrorIcon.tsx';
import PlaceIcon from '../../assets/icons/PlaceIcon.tsx';
import Modal from 'react-native-modal';
import CloseIcon from '../../assets/icons/CloseIcon.tsx';
import Input from '../../common/components/Input';
import FavoriteIcon from '../../assets/icons/FavoriteIcon.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleAddToFavorites } from '../Home/components/PetsList';

const DogImage = require('../../assets/icons/png/dogIcon.png');

interface IFormInfo {
  name: string;
  phone: string;
  email: string;
  comment?: string;
  numberOfLines?: number;
  additionalContainerStyle?: object;
}

export default function PetPage() {
  const route = useRoute<RouteProp<{ params: { pets: IPets } }>>();
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();

  const [favorites, setFavorites] = useState<IPets[]>([]);
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const [formInfo, setFormInfo] = useState<IFormInfo>({
    name: '',
    phone: '',
    email: '',
    comment: '',
  });

  const [isFormModalVisible, setFormModalVisible] = useState<{
    isVisible: boolean;
    isCompleted: boolean;
  }>({
    isVisible: false,
    isCompleted: false,
  });

  const [isSuccessModalVisible, setSuccessIsModalVisible] =
    useState<boolean>(false);

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

  const handleSubmitForm = (key: string, value: string) => {
    setFormInfo(prev => ({ ...prev, [key]: value }));
  };

  const getFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const result = JSON.parse(favorites);
        setFavorites(result);
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  useEffect(() => {
    getFavorite();
  }, []);

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
            <TouchableOpacity
              style={styles.favoriteBtn}
              onPress={() => {
                handleAddToFavorites(route?.params?.pets).then(() => {
                  getFavorite();
                });
              }}
            >
              <FavoriteIcon
                isFavorite={
                  !!favorites.find(
                    e => e.timeStamp === route?.params?.pets?.timeStamp,
                  )
                }
              />
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
          <DefaultButton
            onPress={() => {
              setFormModalVisible(prevState => ({
                ...prevState,
                isVisible: true,
              }));
            }}
            text={"Подарувати сім'ю"}
          />
        </View>
      </View>
      <Modal
        isVisible={isFormModalVisible.isVisible}
        onBackdropPress={() => {
          setFormModalVisible(prevState => ({
            ...prevState,
            isVisible: false,
          }));
        }}
        onModalHide={() => {
          if (isFormModalVisible.isCompleted) {
            setSuccessIsModalVisible(true);
          }
        }}
      >
        <View style={styles.modalContainer}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ gap: 10 }}>
              <Text style={{ fontFamily: fonts.raleway, fontSize: 24 }}>
                Забрати хвостика додому
              </Text>
              <Text style={{ fontFamily: fonts.raleway }}>
                Залиш свої дані і ми з тобою зв’яжемося
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                setFormModalVisible(prevState => ({
                  ...prevState,
                  isVisible: false,
                }))
              }
            >
              <CloseIcon />
            </TouchableOpacity>
          </View>
          <View>
            <Text>Ім'я</Text>
            <Input
              value={formInfo.name}
              placeholder={"Введи своє ім'я"}
              onChangeText={text => {
                handleSubmitForm('name', text);
              }}
            />
          </View>
          <View>
            <Text>Телефон</Text>
            <Input
              value={formInfo.phone}
              placeholder={'+380'}
              onChangeText={text => {
                handleSubmitForm('phone', text);
              }}
            />
          </View>
          <View>
            <Text>Email</Text>
            <Input
              value={formInfo.email}
              placeholder={'Введи свою пошту'}
              onChangeText={text => {
                handleSubmitForm('email', text);
              }}
            />
          </View>
          <View>
            <Text>Коментар</Text>
            <Input
              placeholder={'Залиш коментар'}
              value={formInfo.comment ?? ''}
              onChangeText={text => {
                handleSubmitForm('comment', text);
              }}
              // numberOfLines={3}
              additionalContainerStyle={{
                height: 100,
                alignItems: 'flex-start',
              }}
            />
          </View>
          <DefaultButton
            disabled={!formInfo.email || !formInfo.phone || !formInfo.name}
            onPress={() => {
              setFormModalVisible({
                isCompleted: true,
                isVisible: false,
              });
            }}
            text={'Забрати хвостика додому'}
          />
        </View>
      </Modal>
      <Modal
        isVisible={isSuccessModalVisible}
        onBackdropPress={() => setSuccessIsModalVisible(false)}
      >
        <View style={[styles.modalContainer, { height: 300 }]}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={DogImage}
              style={{ width: 80, height: 80, flex: 1 }}
              resizeMode={'contain'}
            />
            <TouchableOpacity onPress={() => setSuccessIsModalVisible(false)}>
              <CloseIcon />
            </TouchableOpacity>
          </View>
          <View style={{ gap: 10, alignItems: 'center' }}>
            <Text style={{ fontFamily: fonts.raleway, fontSize: 24 }}>
              Дякуємо за заявку!
            </Text>
            <Text style={{ fontFamily: fonts.raleway }}>
              Вітаємо! Ти на крок ближче до того щоб завести собі пухнастого
              друга. Ми скоро зв’яжемося з тобою.
            </Text>
          </View>
          <DefaultButton
            onPress={() => {
              setSuccessIsModalVisible(false);
              setFormModalVisible({ isVisible: false, isCompleted: false });
            }}
            text={'Окей'}
          />
        </View>
      </Modal>
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
  modalContainer: {
    width: '100%',
    height: 600,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    gap: 20,
  },
  favoriteBtn: { alignSelf: 'flex-end', margin: 10 },
});
