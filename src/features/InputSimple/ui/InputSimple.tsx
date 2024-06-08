import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle
} from 'react-native';

export interface InputProps {
  setValue: (value: string) => void;
  value: string | undefined;
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  label?: string;
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    width: '100%',
    height: 40
  },
  input: {
    height: '100%',
    paddingHorizontal: 3
  },
  root: {},
  label: {
    marginBottom: 4
  }
});

export function InputSimple({
  placeholder,
  setValue,
  label,
  value,
  style
}: InputProps) {
  return (
    <View style={styles.root}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.wrapper, style]}>
        <TextInput
          style={styles.input}
          onChangeText={setValue}
          placeholder={placeholder}
          value={value}
        />
      </View>
    </View>
  );
}
