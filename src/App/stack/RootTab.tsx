import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import { CreateEventsScreen } from '../../screen/Events/CreateEventsScreen';
import { MainPageScreen } from '../../screen/MainPageScreen';
import { MyTicketsScreen } from '../../screen/MyTicketsScreen';
import { ProfileScreen } from '../../screen/ProfileScreen';
import { SearchScreen } from '../../screen/SearchScreen';
import {
  CreateEventsTabOptions,
  MainPageTabOptions,
  MyTicketsTabOptions,
  ProfileTabOptions,
  SearchTabOptions
} from '../constant/RootTabConstant';
import { AppRoutes } from './config/AppRoutes';
import { ScreenOptionsWithOutHeader } from './config/ScreenOptions';

const Tab = createBottomTabNavigator();
{
  /*  */
}

export function RootTab() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName={AppRoutes.CREATE_EVENT}
        screenOptions={ScreenOptionsWithOutHeader}
      >
        <Tab.Screen
          options={MainPageTabOptions}
          name={AppRoutes.MAIN_PAGE}
          component={MainPageScreen}
        />
        <Tab.Screen
          options={SearchTabOptions}
          name={AppRoutes.SEARCH}
          component={SearchScreen}
        />
        <Tab.Screen
          options={CreateEventsTabOptions}
          name={AppRoutes.CREATE_EVENT}
          component={CreateEventsScreen}
        />
        <Tab.Screen
          options={MyTicketsTabOptions}
          name={AppRoutes.MY_TICKETS}
          component={MyTicketsScreen}
        />
        <Tab.Screen
          options={ProfileTabOptions}
          name={AppRoutes.PROFILE}
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </View>
  );
}
