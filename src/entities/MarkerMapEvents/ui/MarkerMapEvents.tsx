import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MarkerTypes } from '../../../shared/types/MapTypes';

const styles = StyleSheet.create({
  wrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#eaeeff',
    borderColor: '#000',
    borderWidth: 2,
    zIndex: 10
  },
  logo: {
    width: '100%',
    height: '100%'
  }
});

interface Props {
  dataMarker: MarkerTypes;
}

export const MarkerMapEvents = React.memo(({ dataMarker }: Props) => {
  return (
    <TouchableOpacity style={styles.wrapper}>
      <Image
        style={styles.logo}
        source={{ uri: dataMarker?.logo }}
      />
      <Text>{dataMarker.name}</Text>
    </TouchableOpacity>
  );
});
