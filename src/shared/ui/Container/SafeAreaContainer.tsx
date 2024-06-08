import React, { ReactNode } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';
import { isAndroid } from '../../utils/DevicesUtils';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  wrapperContentStyles?: StyleProp<ViewStyle>;
}
const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  wrapperContent: {
    paddingHorizontal: 20
  }
});
export function SafeAreaContainer({
  children,
  style,
  wrapperContentStyles
}: Props) {
  return (
    <SafeAreaView
      style={[
        styles.root,
        {
          paddingTop: isAndroid ? StatusBar.currentHeight : 0
        },
        style
      ]}
    >
      <View style={[styles.wrapperContent, wrapperContentStyles]}>
        {children}
      </View>
    </SafeAreaView>
  );
}
