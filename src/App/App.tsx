import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { BottomSheetContainer } from './container/BottomSheetContainer';
import { RootStack } from './stack/RootStack';
import { store } from './store';

export function App() {
  return (
    <GestureHandlerRootView
      style={{
        flex: 1
      }}
    >
      <Provider store={store}>
        <BottomSheetContainer>
          <NavigationContainer>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <RootStack />
              </View>
            </GestureHandlerRootView>
          </NavigationContainer>
        </BottomSheetContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}
