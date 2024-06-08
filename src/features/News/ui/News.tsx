import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import IconComment from '../../../assets/icon/IconComment.svg';
import IconLike from '../../../assets/icon/IconLike.svg';
import { Spacer } from '../../../shared/ui/Spacer';

const image =
  'https://sun9-61.userapi.com/impg/OFWgsikwxHgTW6iErPXcsoMXw1AvSNGRMCL0mQ/4C0IrWO8zbI.jpg?size=920x960&quality=95&sign=cd9fdfed6f05ffafe92f063e089eea36&c_uniq_tag=3uGpuif5e_svspmTdNGHMAOzwjq9hw2R79e1DX5vkfI&type=album';
const photo = 'https://s00.yaplakal.com/pics/pics_original/2/1/7/18585712.jpg';
const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 40,
    borderColor: '#000',
    borderWidth: 2,
    padding: 10,
    overflow: 'hidden'
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  wrapperAvatar: {
    width: 40,
    height: 40
  },
  avatar: {
    width: '100%',
    height: '100%'
  },
  avatar_text: {},
  wrapperPhotos: {
    width: '100%',
    height: 400
  },
  photo: {
    width: '100%',
    height: '100%'
  },
  bottom: {
    paddingVertical: 3,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  wrapperIconAction: {
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray'
  },
  action_text: {}
});
export const News = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.head}>
        <View style={styles.wrapperAvatar}>
          <Image
            style={styles.avatar}
            source={{ uri: image }}
          />
        </View>
        <Spacer size={15} />
        <Text style={styles.avatar_text}>pogodaev</Text>
      </View>
      <View style={styles.wrapperPhotos}>
        <Image
          style={styles.photo}
          source={{ uri: photo }}
        />
      </View>
      <View style={styles.bottom}>
        <View style={styles.wrapperIconAction}>
          <IconLike />
          <Spacer size={12} />
          <Text style={styles.action_text}>12</Text>
        </View>
        <Spacer size={10} />
        <View style={styles.wrapperIconAction}>
          <IconComment />
          <Spacer size={12} />
          <Text style={styles.action_text}>12</Text>
        </View>
      </View>
    </View>
  );
};
