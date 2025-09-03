import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LoginPage from './src/screen/Login/LoginPage.tsx';

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <LoginPage />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
