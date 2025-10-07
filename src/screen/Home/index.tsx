import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { View } from 'react-native';
import PetsList from './components/PetsList.tsx';

export interface IPets {
  age: number;
  color: string;
  description: string;
  images: string[];
  isDog: boolean;
  isVaccinated: boolean;
  location: string;
  name: string;
  sex: string;
  type: string;
}

export default function Home() {
  const [pets, setPets] = useState<IPets[]>([]);

  const getPets = async () => {
    try {
      const data = await firestore().collection('animals').get();
      const temp: IPets[] = data.docs.map(e => e.data()) as IPets[];
      setPets(temp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <View style={{flex: 1}}>
      <PetsList pets={pets}/>
    </View>
  );
}
