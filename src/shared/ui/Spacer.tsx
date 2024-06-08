import React from 'react';
import { View } from 'react-native';

interface Props {
  size: number;
}

export const Spacer = ({ size }: Props) => {
  return <View style={{ height: size, width: size }} />;
};
