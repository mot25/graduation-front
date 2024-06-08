import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useGetEventByIdQuery } from '../../App/api/apiSlices/EventApi';
import IconBack from '../../assets/icon/IconBack.svg';
import IconDialog from '../../assets/icon/IconDialog.svg';
import IconMessage from '../../assets/icon/IconMessage.svg';
import IconPeople from '../../assets/icon/IconPeople.svg';
import IconSetting from '../../assets/icon/IconSetting.svg';
import { Spacer } from '../../shared/ui/Spacer';
import { useParams } from '../../shared/utils/NavigationUtils';

const { height } = Dimensions.get('window');

export interface EventScreenParamsType {
  idEvent: EventsType.ResponseEventsType['_id'];
}

const image =
  'https://sun9-61.userapi.com/impg/OFWgsikwxHgTW6iErPXcsoMXw1AvSNGRMCL0mQ/4C0IrWO8zbI.jpg?size=920x960&quality=95&sign=cd9fdfed6f05ffafe92f063e089eea36&c_uniq_tag=3uGpuif5e_svspmTdNGHMAOzwjq9hw2R79e1DX5vkfI&type=album';

export const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    fontSize: 30,
    color: '#fff'
  },
  textDescription: {
    fontSize: 17,
    marginTop: 50
  },
  mainImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  mainImageWrapper: {
    width: '100%',
    height: 300,
    position: 'relative'
  },
  header: {
    backgroundColor: 'black',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  buttonBuy: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 30
  },
  buttonBuy_text: {
    color: 'white'
  },
  bottomImage: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'flex-end',
    paddingBottom: 20
  },
  bottomImageLeft: {},
  bottomImageRight: {
    width: 70,
    height: 70,
    borderRadius: 60,
    overflow: 'hidden'
  },
  bottomImageLeft_image: {
    width: '100%',
    height: '100%'
  },
  name: {},
  name_text: {
    color: '#fff',
    fontSize: 25
  },
  actionWrapper: {
    flexDirection: 'row'
  },
  action_text: {
    color: '#fff'
  },
  action: {
    alignItems: 'center'
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  back: {
    flex: 1
  },
  wrapperIcon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {}
});
export const EventScreen = () => {
  const params = useParams<EventScreenParamsType>();
  // const heightAnimValue = useSharedValue(0)

  const { data } = useGetEventByIdQuery({
    _id: params.idEvent
  });
  // const event = data?.data;
  const event = {
    _id: '1',
    name: 'Tech Conference 2024',
    description:
      'Annual tech conference focusing on latest trends in technology.',
    date: [
      {
        start: new Date('2024-09-15T09:00:00Z'),
        end: new Date('2024-09-15T17:00:00Z')
      }
    ],
    duration: 8,
    place: 'Convention Center',
    address: '123 Main St, Tech City',
    mainImage:
      'https://www.womanhit.ru/media/CACHE/images/articleimage2/2022/8/8b460f41da58bf7c6547307598a505a4/3dd52716cd9af9b17e3f1d49830aa528.jpeg',
    images: [
      { url: 'https://example.com/images/session1.jpg', alt: 'Session 1' },
      { url: 'https://example.com/images/session2.jpg', alt: 'Session 2' }
    ],
    rate: 4.8,
    ageRating: 18,
    price: 150.0,
    categories: ['Technology', 'Conference'],
    participants: ['participant1@example.com', 'participant2@example.com'],
    organizers: ['organizer1@example.com'],
    status: 'will be'
  };
  if (!event) {
    return <Text>ждемссс....</Text>;
  }

  return (
    <View style={{ position: 'relative', flex: 1 }}>
      <View style={{ backgroundColor: '#616161', marginTop: 64, flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={[styles.mainImageWrapper]}>
            <View style={styles.head}>
              <View style={styles.back}>
                <IconBack />
              </View>
              <View style={styles.wrapperIcon}>
                <TouchableOpacity style={styles.icon}>
                  <IconMessage />
                </TouchableOpacity>
                <Spacer size={10} />
                <TouchableOpacity style={styles.icon}>
                  <IconSetting />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bottomImage}>
              <View style={styles.bottomImageLeft}>
                <View style={styles.name}>
                  <Text style={styles.name_text}>Мероприятие кротов</Text>
                </View>
                <Spacer size={10} />
                <View style={styles.actionWrapper}>
                  <View style={styles.action}>
                    <IconPeople />
                    <Spacer size={3} />
                    <Text style={styles.action_text}>Идут</Text>
                  </View>
                  <Spacer size={10} />
                  <View style={styles.action}>
                    <IconDialog />
                    <Spacer size={3} />
                    <Text style={styles.action_text}>Диалог</Text>
                  </View>
                </View>
              </View>
              <View style={styles.bottomImageRight}>
                <Image
                  style={styles.bottomImageLeft_image}
                  source={{ uri: image }}
                />
              </View>
            </View>
            <Image
              source={{ uri: event.mainImage }}
              style={[styles.mainImage]}
            />
          </View>
          <Text style={styles.title}>{event.name}</Text>
          <Text style={styles.textDescription}>
            Описание: {event.description}{' '}
          </Text>
          <Text style={styles.textDescription}>Место: {event.place}</Text>
          <Text style={styles.textDescription}>Адрес: {event.address} </Text>
          <Text style={styles.textDescription}>Начало: 25.12.2004</Text>
          <Text style={styles.textDescription}>
            Займет времени: {event.duration}
          </Text>
          <Text style={styles.textDescription}>
            Возврастной рейтинг: {event.ageRating}
          </Text>
          <Text style={styles.textDescription}>Цена: {event.price}</Text>
          <Text style={styles.textDescription}>Статус: {event.status} </Text>
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.buttonBuy}>
        <Text style={styles.buttonBuy_text}>Купить</Text>
      </TouchableOpacity>
    </View>
  );
};
