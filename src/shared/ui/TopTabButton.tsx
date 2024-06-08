import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;

  isActive?: boolean;
}
const styles = StyleSheet.create({
  root: {
    marginHorizontal: 5,
    paddingBottom: 10
  },
  title: {
    color: '#474444'
  },
  isActive: {
    // backgroundColor: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#474444'
  }
});
export function TopTabButton({ title, onPress, isActive }: Props) {
  return (
    <TouchableOpacity
      style={[styles.root, isActive && styles.isActive]}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
