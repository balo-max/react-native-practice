import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RootNavigation } from './src/navigation';
import 'react-native-gesture-handler';

// import {firebase} from '@react-native-firebase/firestore';
// import {animals} from './animals_list.js';
// import { useEffect } from 'react';



function App() {
  // const db = firebase.firestore();
  //
  // const uploadAnimalsToFirestore = async animals => {
  //   const collectionRef = db.collection('animals');
  //
  //   for (const animal of animals) {
  //     await collectionRef
  //       .add(animal)
  //       .then(docRef => {
  //         console.log(`Document written with ID: ${docRef.id}`);
  //       })
  //       .catch(error => {
  //         console.error('Error adding document: ', error);
  //       });
  //   }
  // };

  // useEffect(() => {
  //   uploadAnimalsToFirestore(animals);
  // }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <RootNavigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
