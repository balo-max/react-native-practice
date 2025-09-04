import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles';
import { useState } from 'react';
import AuthLayout from '../../components/AuthLayout';

interface InputProps {
  email: string;
  password: string;
  errorEmail: null | string;
  errorPassword: null | string;
}

export default function LoginPage() {
  const [isPassHidden, setIsPassHidden] = useState(false);
  const [inputValues, setInputValues] = useState<InputProps>({
    email: '',
    password: '',
    errorEmail: null,
    errorPassword: null,
  });

  const handleChange = (
    key: 'email' | 'password' | 'errorEmail' | 'errorPassword',
    value: string | null,
  ) => {
    setInputValues(prevState => ({ ...prevState, [key]: value }));
  };

  const checkValidEmail = (text: string) => {
    const emailValidator = new RegExp(
      '^([a-z0-9._%-]+@[a-z0-9.-]+.[a-z]{2,6})*$',
    );
    if (!emailValidator.test(text)) {
      handleChange('errorEmail', 'Invalid email');
    } else {
      handleChange('errorEmail', null);
    }
  };

  const checkValidPassword = (text: string) => {
    console.log(text);
    if (text && text.length < 8) {
      handleChange('errorPassword', 'Password must be more then 8 symbols');
    } else {
      handleChange('errorPassword', null);
    }
  };

  const isDisabledLoginBtn = Boolean(
    inputValues.errorEmail ||
      inputValues.errorPassword ||
      !inputValues.email ||
      !inputValues.password,
  );

  return (
    <AuthLayout>
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
            value={inputValues.email}
            placeholder={'Email'}
            style={styles.input}
            placeholderTextColor={'#838383'}
            onChangeText={text => {
              handleChange('email', text);
              checkValidEmail(text);
            }}
            // onBlur={checkValidEmail}
          />
        </View>
        {inputValues.errorEmail && <Text>{inputValues.errorEmail}</Text>}
        <View style={styles.inputContainer}>
          <TextInput
            value={inputValues.password}
            placeholder={'password'}
            style={styles.input}
            placeholderTextColor={'#838383'}
            onChangeText={text => {
              handleChange('password', text);
              checkValidPassword(text);
            }}
            secureTextEntry={isPassHidden}
          />
          <TouchableOpacity
            onPress={() => {
              setIsPassHidden(!isPassHidden);
            }}
            hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
            style={
              isPassHidden
                ? styles.disablePasswordBtn
                : styles.activePasswordBtn
            }
          />
        </View>
        {inputValues.errorPassword && <Text>{inputValues.errorPassword}</Text>}
      </View>
      <TouchableOpacity
        disabled={isDisabledLoginBtn}
        style={[
          styles.loginBtnContainer,
          isDisabledLoginBtn && { opacity: 0.5 },
        ]}
      >
        <Text style={styles.loginText}>Увійти</Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}
