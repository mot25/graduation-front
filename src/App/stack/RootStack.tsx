import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AuthScreen } from '../../screen/AuthScreen';
import { EventScreen } from '../../screen/Events/EventScreen';
import { MapsScreen } from '../../screen/MapsScreen';
import { Registration } from '../../screen/Registration';
import { SettingScreen } from '../../screen/SettingScreen';
import { SplashScreen } from '../../screen/SplashScreen';
import { AppRoutes } from './config/AppRoutes';
import { ScreenOptionsWithOutHeader } from './config/ScreenOptions';
import { RootTab } from './RootTab';

const Stack = createStackNavigator();

export function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName={AppRoutes.SPLASHSCREEN}
      screenOptions={ScreenOptionsWithOutHeader}
    >
      <Stack.Screen
        name={AppRoutes.SPLASHSCREEN}
        component={SplashScreen}
      />
      <Stack.Screen
        name={AppRoutes.REGISTRATION}
        component={Registration}
      />
      <Stack.Screen
        name={AppRoutes.AUTH}
        component={AuthScreen}
      />
      <Stack.Screen
        name={AppRoutes.ROOT_TAB}
        component={RootTab}
      />
      <Stack.Screen
        name={AppRoutes.EVENT}
        component={EventScreen}
      />
      <Stack.Screen
        name={AppRoutes.SETTING}
        component={SettingScreen}
      />

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name={AppRoutes.MAP_EVENT}
          options={{ presentation: 'modal' }}
          component={MapsScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
