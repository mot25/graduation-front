import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  children: ReactNode;
  title: string;
}

const styles = StyleSheet.create({
  root: {},
  title: {
    marginBottom: 20,
    borderColor: '#000',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 4
  },
  title_text: {},
  content: {}
});
export const WrapperWithLine = ({ children, title }: Props) => {
  return (
    <View style={styles.root}>
      <View style={styles.title}>
        <Text style={styles.title_text}>{title}</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};
