import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import IconSearch from '../../../assets/icon/iconSearch.svg';
import { InputProps, InputSimple } from '../../InputSimple/ui/InputSimple';

const { height } = Dimensions.get('window');

type Props = InputProps;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    paddingVertical: 2
  },
  wrapperIcon: {
    width: 30,
    height: 30
  },
  wrapperInput: {
    flex: 1,
    marginLeft: 10
  },
  input: {
    borderWidth: 0
  }
});

export function InputSearch({ ...props }: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.wrapperIcon}>
        <IconSearch
          width={'100%'}
          height={'100%'}
        />
      </View>
      <View style={styles.wrapperInput}>
        <InputSimple
          style={styles.input}
          {...props}
        />
      </View>
    </View>
  );
}
