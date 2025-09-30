import AuthLayout from '../components/AuthLayout/index';
import AuthHeader from '../components/AuthHeader/index';
import styles from '../styles';
import { View } from 'react-native';
import Input from '../../../common/components/Input/index';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { RegistrationSchema } from '../utils/validations';
import DefaultButton from '../../../common/components/DefaultButton/index';
import auth from '@react-native-firebase/auth';
import { RootStackNavigation } from '../../../navigation/types';
import { CommonActions, useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { ScreenNames } from '../../../constants/screenNames.ts';

interface ITouched {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

interface MyFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Registration() {
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  const [touched, setTouched] = useState<ITouched>({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const registerUser = async (
    value: MyFormValues,
    formikHelpers: FormikHelpers<MyFormValues>,
  ) => {
    try {
      const data = await auth().createUserWithEmailAndPassword(
        value.email,
        value.password,
      );
      console.log(data);
      if (data.user) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: ScreenNames.LOGGED_IN_STACK }],
          }),
        );
      }
    } catch (error: any) {
      console.log('Error: ', error);
      if (error.code === 'auth/email-already-in-use') {
        formikHelpers.setErrors({ email: 'email already in use' });
      }
    }
  };

  return (
    <AuthLayout>
      <AuthHeader activeTab={'registration'} />
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(value, formikHelpers) => {
          return registerUser(value, formikHelpers);
        }}
        validationSchema={RegistrationSchema()}
      >
        {({
          values,
          setFieldValue,
          handleSubmit,
          isValid,
          errors,
        }: FormikValues) => (
          <>
            <View style={styles.formContainer}>
              <Input
                onFocus={() =>
                  setTouched(prevState => ({ ...prevState, email: true }))
                }
                value={values.email}
                onChangeText={value => {
                  setFieldValue('email', value);
                }}
                placeholder={'Email'}
                error={touched.email && errors.email}
              />
              <Input
                onFocus={() =>
                  setTouched(prevState => ({ ...prevState, password: true }))
                }
                value={values.password}
                onChangeText={value => {
                  setFieldValue('password', value);
                }}
                secureTextEntry={true}
                placeholder={'Password'}
                error={touched.password && errors.password}
              />
              <Input
                onFocus={() =>
                  setTouched(prevState => ({
                    ...prevState,
                    confirmPassword: true,
                  }))
                }
                value={values.confirmPassword}
                onChangeText={value => {
                  setFieldValue('confirmPassword', value);
                }}
                secureTextEntry={true}
                placeholder={'Confirm password'}
                error={touched.confirmPassword && errors.confirmPassword}
              />
            </View>
            <DefaultButton
              disabled={
                !isValid ||
                !values.email ||
                !values.password ||
                !values.confirmPassword
              }
              onPress={handleSubmit}
              text={'Зарееструватись'}
            />
          </>
        )}
      </Formik>
    </AuthLayout>
  );
}
