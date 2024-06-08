import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { AppRoutes } from '../App/stack/config/AppRoutes';

type NavigationTypeProps = {
  [AppRoutes.AUTH]: undefined;
  [AppRoutes.ROOT_TAB]: undefined;
};

export const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<NavigationTypeProps>>();
  const goToScreen = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      navigation.navigate(AppRoutes.ROOT_TAB);
    } else {
      navigation.navigate(AppRoutes.AUTH);
    }
  };
  useEffect(() => {
    goToScreen();
  }, []);
  return <SafeAreaView style={{ flex: 1 }}></SafeAreaView>;
};
