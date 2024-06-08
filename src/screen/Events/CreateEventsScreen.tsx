import { Formik } from 'formik';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import { useCreateEventsMutation } from '../../App/api/apiSlices/EventApi';
import { CalendarButton } from '../../features/CalendarButton';
import { OptionType } from '../../features/DropDown/DropDownTypes';
import { DropDownMultiSelect } from '../../features/DropDownMultiSelect';
import { InputSimple } from '../../features/InputSimple';
import { SelectImages } from '../../features/SelectImages';
import { SwiperImage } from '../../features/SwiperImage/ui/SwiperImage';
import { useGetCategoriesQuery } from '../../shared/API/CategoriesApi';
import { SafeAreaContainer } from '../../shared/ui/Container/SafeAreaContainer';

const styles = StyleSheet.create({
  wrapperContent: {
    paddingHorizontal: 20,
    marginTop: 20
  },
  wrapperInput: {
    marginBottom: 10
  }
});

const initialValues: EventsType.RequestCreateEvent = {
  name: '',
  description: '',
  date: [],
  duration: 0,
  place: '',
  address: '',
  mainImage: undefined,
  images: [],
  categories: [],
  ageRating: 6,
  price: 0
};

const image =
  'https://mirpozitiva.ru/wp-content/uploads/2019/11/1476889932_zakat-derevo.jpg';

export function CreateEventsScreen() {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [createEventsMutation, { isLoading }] = useCreateEventsMutation();
  const { data: dataCategories } = useGetCategoriesQuery();

  const categoryForOptionType = useMemo((): OptionType[] => {
    return (
      dataCategories?.data.map(category => ({
        value: category._id,
        label: category.name
      })) || []
    );
  }, [dataCategories]);

  const createEvent = (event: EventsType.RequestCreateEvent) => {
    createEventsMutation(event);
  };

  if (isLoading) {
    <Text>Загружаю на бек </Text>;
  }
  return (
    <SafeAreaContainer wrapperContentStyles={{ paddingHorizontal: 0 }}>
      <ScrollView>
        <Formik
          initialValues={initialValues}
          onSubmit={createEvent}
        >
          {({ values, handleChange, handleSubmit, setFieldValue }) => {
            const selectPhoto = () => {
              const handlerCamera = async () => {
                const options: CameraOptions = {
                  saveToPhotos: true,
                  mediaType: 'photo',
                  includeBase64: false
                };
                const res = await launchCamera(options);
              };
              const handlerGallery = async () => {
                const options: ImageLibraryOptions = {
                  selectionLimit: 1,
                  mediaType: 'photo',
                  includeBase64: false
                };
                const res = await launchImageLibrary(options);
                // @ts-ignore
                if (!res?.assets[0]) return;
                setFieldValue('mainImage', {
                  ...res.assets[0],
                  name: res.assets[0].fileName
                });
              };
              Alert.alert('Выберите изображение', '', [
                {
                  text: 'Сделать фотографию',
                  onPress: handlerCamera
                },
                {
                  text: 'Взять из галереи',
                  onPress: handlerGallery
                }
              ]);
            };

            const deleteImageById = (imageId: string) => {
              const newImages = values.images.filter(
                image => image.name !== imageId
              );
              setFieldValue('images', newImages);
            };
            return (
              <>
                {values?.mainImage?.uri && (
                  <SwiperImage images={[values.mainImage.uri]} />
                )}
                <View style={styles.wrapperContent}>
                  <View style={styles.wrapperInput}>
                    <Button
                      title={'Добавить фотографию'}
                      onPress={selectPhoto}
                    />
                  </View>
                  <View style={styles.wrapperInput}>
                    <InputSimple
                      placeholder="Название"
                      setValue={handleChange('name')}
                      value={values.name}
                    />
                  </View>

                  <SelectImages
                    images={values.images}
                    addImages={newImage => {
                      setFieldValue('images', [...values.images, newImage]);
                    }}
                    deleteImages={deleteImageById}
                  />

                  <View style={styles.wrapperInput}>
                    <DropDownMultiSelect
                      list={categoryForOptionType}
                      onChange={item => setFieldValue('categories', item)}
                      value={values.categories}
                    />
                  </View>
                  <View style={styles.wrapperInput}>
                    <InputSimple
                      placeholder="Описание"
                      setValue={handleChange('description')}
                      value={values.description}
                    />
                  </View>
                  <View style={styles.wrapperInput}>
                    <CalendarButton
                      date={values.date}
                      onChange={date => handleChange('date')(date.toString())}
                    />
                  </View>
                  <View style={styles.wrapperInput}>
                    <InputSimple
                      placeholder="Время действия"
                      setValue={handleChange('duration')}
                      value={String(values.duration)}
                    />
                  </View>
                  <View style={styles.wrapperInput}>
                    <InputSimple
                      placeholder="Место"
                      setValue={handleChange('place')}
                      value={values.place}
                    />
                  </View>
                  <View style={styles.wrapperInput}>
                    <InputSimple
                      placeholder="Адрес"
                      setValue={handleChange('address')}
                      value={values.address}
                    />
                  </View>
                  <View style={styles.wrapperInput}>
                    <InputSimple
                      placeholder="Возраст"
                      setValue={handleChange('ageRating')}
                      value={String(values.ageRating)}
                    />
                  </View>
                  <View style={styles.wrapperInput}>
                    <InputSimple
                      placeholder="Цена"
                      setValue={handleChange('price')}
                      value={String(values.price)}
                    />
                  </View>
                  <Button
                    title="Send"
                    onPress={() => handleSubmit()}
                  />
                </View>
              </>
            );
          }}
        </Formik>
      </ScrollView>
    </SafeAreaContainer>
  );
}
