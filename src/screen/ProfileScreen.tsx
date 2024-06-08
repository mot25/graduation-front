import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { AppRoutes } from '../App/stack/config/AppRoutes';
import IconMessage from '../assets/icon/IconMessage.svg';
import IconSetting from '../assets/icon/IconSetting.svg';
import { ListEventsGo } from '../entities/ListEventsGo';
import { News } from '../features/News';
import { SafeAreaContainer } from '../shared/ui/Container/SafeAreaContainer';
import { Spacer } from '../shared/ui/Spacer';
import { WrapperWithLine } from '../shared/ui/WrapperWithLine';

const image =
  'https://sun9-61.userapi.com/impg/OFWgsikwxHgTW6iErPXcsoMXw1AvSNGRMCL0mQ/4C0IrWO8zbI.jpg?size=920x960&quality=95&sign=cd9fdfed6f05ffafe92f063e089eea36&c_uniq_tag=3uGpuif5e_svspmTdNGHMAOzwjq9hw2R79e1DX5vkfI&type=album';

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  login: {
    flex: 1
  },
  wrapperIcon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {},
  wrapperImage: {
    flexDirection: 'row'
  },
  wrapperAvatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
    overflow: 'hidden'
  },
  avatar: {
    width: '100%',
    height: '100%'
  },
  wrapperButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#38e2ff',
    padding: 7,
    borderRadius: 10
  },
  button_text: {},
  description: {
    marginVertical: 20
  },
  description_text: {}
});
type NavigationPropType = {
  [AppRoutes.SETTING]: undefined;
};

export function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<NavigationPropType>>();

  const toSetting = () => {
    navigation.navigate(AppRoutes.SETTING);
  };
  return (
    <SafeAreaContainer>
      <ScrollView>
        <View style={styles.head}>
          <Text style={styles.login}>@pogodaev</Text>
          <View style={styles.wrapperIcon}>
            <TouchableOpacity style={styles.icon}>
              <IconMessage />
            </TouchableOpacity>
            <Spacer size={10} />
            <TouchableOpacity
              onPress={toSetting}
              style={styles.icon}
            >
              <IconSetting />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.wrapperImage}>
          <View style={styles.wrapperAvatar}>
            <Image
              style={styles.avatar}
              source={{
                uri: image
              }}
            />
          </View>
          <Spacer size={30} />
          <View style={styles.wrapperButton}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.button_text}>Подписаться</Text>
            </TouchableOpacity>
            <Spacer size={10} />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.button_text}>Подписаться</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.description}>
          <Text style={styles.description_text}>
            О человеке.... Я бла бла блаблаблабалабалбалаа
          </Text>
        </View>
        <View>
          <WrapperWithLine title={'Куда иду'}>
            <ListEventsGo events={[image, image]} />
          </WrapperWithLine>
        </View>
        <View>
          <WrapperWithLine title={'Мероприятия'}>
            <ListEventsGo events={[image, image]} />
          </WrapperWithLine>
        </View>
        <View>
          <WrapperWithLine title={'Новости'}>
            <News />
          </WrapperWithLine>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
}
