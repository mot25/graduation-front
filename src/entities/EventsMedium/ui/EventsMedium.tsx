import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DateTime } from 'luxon';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppRoutes } from '../../../App/stack/config/AppRoutes';
import { EventScreenParamsType } from '../../../screen/Events/EventScreen';

interface Props {
  event: EventsType.ResponseEventsType;
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#4f4f4f',
    borderRadius: 15,
    marginBottom: 20
  },
  wrapperImage: {
    width: 90,
    height: '100%',
    overflow: 'hidden',
    borderRadius: 15,
    marginRight: 20
  },
  image: {
    width: '100%',
    height: '100%'
  },
  textTitle: {
    color: '#fff'
  },
  wrapperContent: {
    width: '100%',
    padding: 10
  },
  content_top: {
    flex: 1
  },
  content_bottom: {},
  price: {
    color: '#fff',
    fontSize: 15
  }
});

interface NavigationType {
  [AppRoutes.EVENT]: EventScreenParamsType;
}

export function EventsMedium({ event }: Props) {
  const navigation = useNavigation<NavigationProp<NavigationType>>();
  const goToEventScreen = (id: EventsType.ResponseEventsType['_id']) => {
    navigation.navigate(AppRoutes.EVENT, { idEvent: id });
  };
  return (
    <TouchableOpacity
      onPress={() => goToEventScreen(event._id)}
      style={styles.root}
    >
      {event.mainImage && (
        <View style={styles.wrapperImage}>
          <Image
            style={styles.image}
            source={{ uri: event.mainImage }}
          />
        </View>
      )}
      <View style={styles.wrapperContent}>
        <View style={styles.content_top}>
          <View>
            <Text style={styles.textTitle}>
              {DateTime.fromISO(event.date.toString()).toFormat(
                'dd.MM.yy HH:mm'
              )}
            </Text>
          </View>
          <View>
            <Text style={styles.textTitle}>{event.name}</Text>
          </View>
          <View>
            <Text style={styles.textTitle}>{event.place}</Text>
          </View>
        </View>
        <View style={styles.content_bottom}>
          <Text style={styles.price}>{event.price}₽</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
