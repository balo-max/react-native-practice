import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  QueryConstraint,
  where,
} from '@react-native-firebase/firestore';
import { ActivityIndicator, View } from 'react-native';
import PetsList from './components/PetsList.tsx';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ISettings } from '../FilterSettings';
import SearchBar from './components/SearchBar.tsx';
import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore-types';

export interface IPets {
  age?: number;
  color: string;
  description: string;
  images: string[];
  isDog: boolean;
  isVaccinated: boolean;
  location: string;
  name: string;
  sex: string;
  type: string;
  timeStamp: number;
  size: 'big' | 'medium' | 'small';
}

export default function Home() {
  const [allPets, setAllPets] = useState<IPets[]>([]);
  const [pets, setPets] = useState<IPets[]>([]);
  const route = useRoute<RouteProp<{ params: { settings: ISettings } }>>();

  console.log('route', route);
  console.log('route.params', route.params);

  const GetPets = async () => {
    try {
      const db = getFirestore();
      const animalsRef = collection(db, 'animals');

      const snapshot = await getDocs(animalsRef);

      const temp: IPets[] = snapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as IPets,
      );
      console.log('animalsNameSearch:', temp);
      setAllPets(temp);
      setPets(temp);
    } catch (e) {
      console.error('Error searching animals:', e);
    }
  };

  const handleSearchWithSettings = async (settings: ISettings) => {
    try {
      const db = getFirestore();
      const animalsRef = collection(db, 'animals');
      console.log('animal:', animalsRef);

      // Собираем фильтры
      const filters: any[] = [];

      Object.entries(settings).forEach(([key, value]) => {
        // пропускаем поля без значения или не участвующие в фильтрации
        if (key === 'timeStamp' || value === null || value === undefined)
          return;

        // добавляем условие в массив
        filters.push(where(key, '==', key === 'age' ? Number(value) : value));
      });


      // Добавляем сортировку
      const sortOrder = orderBy(
        'timeStamp',
        settings.timeStamp ? 'desc' : 'asc',
      ) as unknown as QueryConstraint;

      // Собираем запрос
      const q = query(animalsRef, ...filters, sortOrder);

      console.log('q:', q);

      // Получаем данные
      const result = await getDocs(q);
      console.log('FilteredPets:', result.docs);

      const temp: IPets[] = result.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as IPets,
      );
      setAllPets(temp);
      setPets(temp);
    } catch (e) {
      console.error('Firestore error:', e);
    }
  };

  const handleSearch = (text: string) => {
    if (!text.trim()) {
      setPets(allPets); // если строка пустая — показываем всех
      return;
    }

    const filtered = allPets.filter(pet =>
        pet.name?.toLowerCase().includes(text.toLowerCase())
    );
    setPets(filtered);
  };

  useEffect(() => {
    (async () => {
      if (route.params?.settings) {
        console.log('🎯 Applying filters...');
        await handleSearchWithSettings(route.params.settings);
      } else {
        console.log('📋 No filters, load all pets');
        await GetPets();
      }
    })();
  }, [route.params?.settings]);

  return (
    <View style={{ flex: 1 }}>
      <SearchBar handleSearch={handleSearch} pets={pets} />
      {pets.length ? <PetsList pets={pets} /> : <ActivityIndicator />}
    </View>
  );
}
