import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { useLoginUsersMutation } from '../App/api/apiSlices/AuthApi';
import { AppRoutes } from '../App/stack/config/AppRoutes';
import { DropDown } from '../features/DropDown';
import { InputSimple } from '../features/InputSimple';
import { SafeAreaContainer } from '../shared/ui/Container/SafeAreaContainer';
import { Spacer } from '../shared/ui/Spacer';
import { useParams } from '../shared/utils/NavigationUtils';

const randomValue = Math.random().toString().slice(0, 5);
const initialValues: AuthTypes.RequestLoginUser = {
  login: 'root',
  password: 'root',
  phone: '9800559372',
  code: '',
  codeType: 'sms'
};

const styles = StyleSheet.create({
  titleScreen: {
    fontSize: 40
  },
  enterTypeWrapper: {
    flexDirection: 'row',
    marginBottom: 20
  },
  enterTypeButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterTypeButton__active: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000'
  }
});
type NavigationPropType = {
  [AppRoutes.REGISTRATION]: undefined;
  [AppRoutes.ROOT_TAB]: undefined;
};

export type AuthScreenProps = AuthTypes.RequestLoginUser;

type EnterType = 'phone' | 'login';

export const AuthScreen = () => {
  const [loginUsersMutation] = useLoginUsersMutation();
  const navigation = useNavigation<NavigationProp<NavigationPropType>>();
  const [typeEnter, setTypeEnter] = useState<EnterType>('phone');
  const params = useParams<AuthScreenProps>();

  const isPhoneEnter = typeEnter === 'phone';

  const sigIn = (values: AuthTypes.RequestLoginUser) => {
    if (isPhoneEnter) {
      return loginUsersMutation({
        code: values.code,
        phone: values.phone,
        codeType: values.codeType
      })
        .unwrap()
        .then(res => {
          if (res.code === 1) {
            Alert.alert('Вы вошли');
            // @ts-ignore
            AsyncStorage.setItem('token', res.tokens.accessToken);
            navigation.navigate(AppRoutes.ROOT_TAB);
          } else {
            Alert.alert('Ошибка! Вы не вошли ' + res.data);
          }
          AsyncStorage.setItem('token', 'res.data.token');
        });
    } else {
      return loginUsersMutation({
        login: values.login,
        password: values.password
      })
        .unwrap()
        .then(res => {
          if (res.code === 1) {
            // @ts-ignore
            AsyncStorage.setItem('token', res.tokens.accessToken);
            navigation.navigate(AppRoutes.ROOT_TAB);

            Alert.alert('Вы вошли');
          } else {
            Alert.alert('Ошибка! Вы не вошли ' + res.data);
          }
          AsyncStorage.setItem('token', 'res.data.token');
        });
    }
  };
  return (
    <SafeAreaContainer>
      <View>
        <View
          style={{
            marginBottom: 50
          }}
        >
          <Text style={styles.titleScreen}>{'Вход'}</Text>
        </View>
        <View style={styles.enterTypeWrapper}>
          <View
            style={[
              styles.enterTypeButton,
              isPhoneEnter && styles.enterTypeButton__active
            ]}
          >
            <Button
              onPress={() => {
                setTypeEnter('phone');
              }}
              title={'По телефону'}
            />
          </View>
          <Spacer size={30} />
          <View
            style={[
              styles.enterTypeButton,
              !isPhoneEnter && styles.enterTypeButton__active
            ]}
          >
            <Button
              onPress={() => {
                setTypeEnter('login');
              }}
              title={'По логину'}
            />
          </View>
        </View>
        {/*@ts-ignore*/}
        <Formik
          initialValues={initialValues}
          onSubmit={sigIn}
        >
          {({ values, setFieldValue, handleSubmit }) => {
            return (
              <View>
                {!isPhoneEnter && (
                  <>
                    <InputSimple
                      label={'Логин'}
                      setValue={val => setFieldValue('login', val)}
                      value={values.login}
                      placeholder={'Логин'}
                    />
                    <Spacer size={20} />
                  </>
                )}
                {isPhoneEnter && (
                  <>
                    <InputSimple
                      setValue={val => setFieldValue('phone', val)}
                      value={values.phone}
                      placeholder={'Номер телефона'}
                      label={'Номер телефона'}
                    />
                    <Spacer size={20} />
                  </>
                )}
                {!isPhoneEnter && (
                  <>
                    <InputSimple
                      setValue={val => setFieldValue('password', val)}
                      value={values.password}
                      placeholder={'Пароль'}
                      label={'Пароль'}
                    />
                    <Spacer size={20} />
                  </>
                )}
                {isPhoneEnter && (
                  <InputSimple
                    setValue={val => setFieldValue('code', val)}
                    value={values.code}
                    placeholder={'code'}
                    label={'code'}
                  />
                )}

                {isPhoneEnter && (
                  <>
                    <Spacer size={20} />
                    <DropDown
                      value={values.codeType}
                      list={[
                        { value: 'sms', label: 'sms' },
                        { label: 'call', value: 'call' }
                      ]}
                      onChange={dropDownVal => {
                        setFieldValue('codeType', dropDownVal);
                      }}
                    />
                  </>
                )}
                <Spacer size={50} />

                <Button
                  title={'Войти'}
                  onPress={() => handleSubmit()}
                />
              </View>
            );
          }}
        </Formik>
      </View>

      <Button
        title={'Хотите Зарегаться?'}
        onPress={() => navigation.navigate(AppRoutes.REGISTRATION)}
      />
    </SafeAreaContainer>
  );
};
