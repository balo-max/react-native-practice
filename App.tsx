import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RootNavigation } from './src/navigation';

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <RootNavigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
