import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles';

export default function LoginPage() {
  return (
    <View style={styles.mainWrapper}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.welcomeText}>We help you find your friend</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.authText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn}>
          <Text style={styles.authText}>Registration</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'Email'}
            style={styles.input}
            placeholderTextColor={'#838383'}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'password'}
            style={styles.input}
            placeholderTextColor={'#838383'}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.loginBtnContainer}>
        <Text style={styles.loginText}>Увійти</Text>
      </TouchableOpacity>
    </View>
  );
}
