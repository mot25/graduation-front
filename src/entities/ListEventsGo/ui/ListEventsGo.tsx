import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {},
  eventWrapper: {
    width: 70,
    height: 70,
    marginRight: 15
  },
  imageUrl: {
    width: '100%',
    height: '100%'
  }
});

interface Props {
  events: string[];
}

interface PropsEvent {
  uri: string;
}

const Event = ({ uri }: PropsEvent) => {
  return (
    <View style={styles.eventWrapper}>
      <Image
        style={styles.imageUrl}
        source={{ uri }}
      />
    </View>
  );
};
export const ListEventsGo = ({ events }: Props) => {
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={events}
        horizontal={true}
        renderItem={({ item }) => <Event uri={item} />}
      />
    </View>
  );
};
