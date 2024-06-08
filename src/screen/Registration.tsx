import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useCreateUsersMutation } from '../App/api/apiSlices/AuthApi';
import { AppRoutes } from '../App/stack/config/AppRoutes';
import { InputSimple } from '../features/InputSimple';
import { Spacer } from '../shared/ui/Spacer';

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    marginTop: 20
  },
  button: {}
});
const randomValue = Math.random().toString().slice(0, 5);

const initialValues: AuthTypes.RequestRegistrationUser = {
  login: 'root',
  confirmPassword: 'root',
  name: 'root',
  password: 'root',
  phone: 'email',
  email: 'phone'
};
type NavigationPropType = {
  [AppRoutes.AUTH]: undefined;
};
export const Registration = () => {
  const [createUsersMutation] = useCreateUsersMutation();
  const navigation = useNavigation<NavigationProp<NavigationPropType>>();
  const registration = (values: AuthTypes.RequestRegistrationUser) => {
    return createUsersMutation(values)
      .unwrap()
      .then(res => {
        if (res.code === 1) {
          navigation.navigate(AppRoutes.AUTH);
        } else {
          Alert.alert('Ошибка! Вы не зарегались ' + res.data);
        }
      });
  };
  return (
    <SafeAreaView style={{ marginHorizontal: 20, flex: 1 }}>
      <View>
        <Text style={styles.title}>Регистрация</Text>
        <Formik
          initialValues={initialValues}
          onSubmit={registration}
        >
          {({ values, setFieldValue, handleSubmit }) => {
            return (
              <View>
                <Spacer size={40} />
                <InputSimple
                  label={'Имя'}
                  setValue={val => setFieldValue('name', val)}
                  value={values.name}
                  placeholder={'Имя'}
                />
                <Spacer size={20} />
                <InputSimple
                  label={'login'}
                  setValue={val => setFieldValue('login', val)}
                  value={values.login}
                  placeholder={'login'}
                />
                <Spacer size={20} />
                <InputSimple
                  label={'password'}
                  setValue={val => setFieldValue('password', val)}
                  value={values.password}
                  placeholder={'password'}
                />
                <Spacer size={20} />
                <InputSimple
                  label={'email'}
                  setValue={val => setFieldValue('email', val)}
                  value={values.email}
                  placeholder={'email'}
                />
                <Spacer size={20} />
                <InputSimple
                  label={'phone'}
                  setValue={val => setFieldValue('phone', val)}
                  value={values.phone}
                  placeholder={'phone'}
                />
                <Spacer size={20} />
                <InputSimple
                  label={'confirmPassword'}
                  setValue={val => setFieldValue('confirmPassword', val)}
                  value={values.confirmPassword}
                  placeholder={'confirmPassword'}
                />
                <Spacer size={50} />
                <View style={styles.button}>
                  <Button
                    title={'Зарегистрироваться'}
                    onPress={() => handleSubmit()}
                  />
                </View>
                <Spacer size={10} />
                <View style={styles.button}>
                  <Button
                    title={'Уже ессть аккаунт? Заходи мой хороший'}
                    onPress={() => navigation.navigate(AppRoutes.AUTH)}
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      </View>
    </SafeAreaView>
  );
};
