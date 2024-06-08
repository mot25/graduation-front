import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Spacer } from '../../../shared/ui/Spacer';

interface Props {
  onMe: () => void;
  onZoomPlus: () => void;
  onZoomMinus: () => void;
}

const styles = StyleSheet.create({
  wrapper: {},
  button: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40
  }
});

export const ControllerMap = ({ onZoomPlus, onZoomMinus, onMe }: Props) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={onZoomPlus}
        style={styles.button}
      >
        <Text>+</Text>
      </TouchableOpacity>
      <Spacer size={15} />
      <TouchableOpacity
        onPress={onZoomMinus}
        style={styles.button}
      >
        <Text>-</Text>
      </TouchableOpacity>
      <Spacer size={15} />
      <TouchableOpacity
        onPress={onMe}
        style={styles.button}
      >
        <Text>L</Text>
      </TouchableOpacity>
    </View>
  );
};
