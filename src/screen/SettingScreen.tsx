import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';
import { AppRoutes } from '../App/stack/config/AppRoutes';
import { SafeAreaContainer } from '../shared/ui/Container/SafeAreaContainer';

type NavigationPropType = {
  [AppRoutes.AUTH]: undefined;
};

export const SettingScreen = () => {
  const navigation = useNavigation<NavigationProp<NavigationPropType>>();

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate(AppRoutes.AUTH);
  };
  return (
    <SafeAreaContainer
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Button
        title={'Exit'}
        onPress={logOut}
      />
    </SafeAreaContainer>
  );
};
