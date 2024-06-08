import React, { useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: '100%',
    height: 250,
    position: 'relative'
  },
  imagesWrapper: {
    flexDirection: 'row'
  },
  barContainer: {
    position: 'absolute',
    top: 5,
    left: 0,
    width: '100%',
    zIndex: 1,
    flexDirection: 'row'
  },
  itemProgress: {
    height: 4,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 5
  }
});

interface Props {
  images: CommonTypes.FileImagesTypes['uri'][];
}

export const SwiperImage = ({ images }: Props) => {
  const selectSlide = useRef(0);
  const [slideActive, setSlideActive] = useState(0);
  const transitionX = useSharedValue(0);
  const transitionXRef = useSharedValue(0);
  const percentSwiper = width * 0.3;
  const snapPoints = images.map((_, i) => i * -width);

  const editTranslateX = (pointScroll: number) => {
    'worklet';
    transitionX.value = withTiming(pointScroll);
    transitionXRef.value = pointScroll;
  };
  const handlerEndSwiper = (number: number) => {
    setSlideActive(number);
  };
  const gesture = Gesture.Pan()
    .onUpdate(e => {
      transitionX.value = transitionXRef.value + e.translationX;
    })
    .onEnd(e => {
      if (Math.abs(e.translationX) < percentSwiper) {
        editTranslateX(snapPoints[selectSlide.current]);
        runOnJS(handlerEndSwiper)(selectSlide.current);
        return;
      }
      if (e.translationX < 0) {
        if (selectSlide.current === images.length - 1) {
          // editTranslateX(snapPoints[selectSlide.current])
          // runOnJS(handlerEndSwiper)(selectSlide.current)
          return;
        }

        selectSlide.current += 1;
      } else {
        if (selectSlide.current === 0) {
          editTranslateX(snapPoints[selectSlide.current]);
          runOnJS(handlerEndSwiper)(selectSlide.current);
          return;
        }
        selectSlide.current -= 1;
      }
      editTranslateX(snapPoints[selectSlide.current]);
      runOnJS(handlerEndSwiper)(selectSlide.current);
    });
  const imagesWrapperStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: transitionX.value }]
  }));

  return (
    <View style={styles.container}>
      {images.length > 1 && (
        <View style={styles.barContainer}>
          {images.map((_, indexLine) => {
            return (
              <View
                style={{
                  ...styles.itemProgress,
                  width: width / images.length - 10,
                  opacity: indexLine === slideActive ? 1 : 0.5
                }}
                key={_}
              />
            );
          })}
        </View>
      )}
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.imagesWrapper, imagesWrapperStyles]}>
          {images.map((image, i) => (
            <Image
              style={{
                width,
                height: 250
                // flex: 1
              }}
              key={i}
              source={{ uri: image }}
            />
          ))}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
