import { View } from 'react-native';
import styles from '../styles.ts';
import { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import AuthHeader from '../components/AuthHeader';
import Input from '../../../common/components/Input';
import auth from '@react-native-firebase/auth';
import DefaultButton from '../../../common/components/DefaultButton';

interface InputProps {
  email: string;
  password: string;
  errorEmail: undefined | string;
  errorPassword: null | string;
}

export default function Login() {
  const [inputValues, setInputValues] = useState<InputProps>({
    email: '',
    password: '',
    errorEmail: undefined,
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

  const onLogin = async (email: string, password: string) => {
    try {
      const data = await auth().signInWithEmailAndPassword(email, password);
      console.log(data);
    } catch (error) {
      console.log(error);
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
      <AuthHeader activeTab="login" />

      <View style={styles.formContainer}>
        <Input
          value={inputValues.email}
          onChangeText={text => {
            handleChange('email', text);
            checkValidEmail(text);
          }}
          error={inputValues.errorEmail}
          placeholder={'Email'}
        />
        <Input
          placeholder={'Password'}
          value={inputValues.password}
          onChangeText={text => {
            handleChange('password', text);
            checkValidPassword(text);
          }}
          secureTextEntry={true}
        />
      </View>
      <DefaultButton
        onPress={() => {
          return onLogin(inputValues.email, inputValues.password);
        }}
        disabled={isDisabledLoginBtn}
        text={'Увійти'}
      />
    </AuthLayout>
  );
}
