import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary
} from 'react-native-image-picker';
import IconClose from '../../../assets/icon/IconClose.svg';
import IconPlus from '../../../assets/icon/iconPlus.svg';

interface Props {
  images: CommonTypes.FileImagesTypes[];
  addImages: (newImage: CommonTypes.FileImagesTypes[]) => void;
  deleteImages: (imageId: string) => void;
}

const styles = StyleSheet.create({
  conainerImages: {
    // backgroundColor: 'blue',
    marginVertical: 20,
    flex: 1
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50
  },
  closeWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(247, 247, 247, 0.7)',
    borderRadius: 15
  },
  wrapperImage: {
    position: 'relative',
    width: 80,
    height: 80,
    marginLeft: 15,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export const SelectImages = ({ addImages, images, deleteImages }: Props) => {
  const selectImages = async () => {
    const options: ImageLibraryOptions = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false
    };
    const res = await launchImageLibrary(options);
    // @ts-ignore
    if (!res?.assets[0]?.fileName) return;
    addImages({
      ...res.assets[0],
      // @ts-ignore
      name: res?.assets[0]?.fileName || ''
    });
  };
  // const deleteImages = () => {
  //
  // }
  return (
    <ScrollView
      contentContainerStyle={styles.conainerImages}
      horizontal={true}
    >
      <TouchableOpacity
        onPress={selectImages}
        style={styles.wrapperImage}
      >
        <IconPlus
          height={30}
          width={30}
        />
      </TouchableOpacity>
      {images.length
        ? images.map((image, index) => {
            return (
              <View
                key={image.name}
                style={styles.wrapperImage}
              >
                <Image
                  style={styles.image}
                  source={{ uri: image.uri }}
                />
                <TouchableOpacity
                  onPress={() => deleteImages(image.name)}
                  style={styles.closeWrapper}
                >
                  <IconClose
                    height={20}
                    width={20}
                  />
                </TouchableOpacity>
              </View>
            );
          })
        : null}
    </ScrollView>
  );
};
