import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useGetEventsQuery } from '../App/api/apiSlices/EventApi';
import { EventsMedium } from '../entities/EventsMedium';
import { HorizontalCalendar } from '../features/HorizontalCalendar';
import { InputSearch } from '../features/InputSearch';
import { SafeAreaContainer } from '../shared/ui/Container/SafeAreaContainer';
import { EventsSwiper } from '../widgets/EventsSwiper';

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f2f2f2'
  },
  wrapperSearch: {
    position: 'relative',
    marginBottom: 20
  },
  content: {
    position: 'absolute',
    top: 60,
    height: 300,
    width: '100%',
    zIndex: 1
  }
});

export function MainPageScreen() {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const { data } = useGetEventsQuery({
    name: search
  });

  return (
    <SafeAreaContainer style={styles.root}>
      <View style={styles.wrapperSearch}>
        <InputSearch
          setValue={setSearch}
          value={search || ''}
          placeholder={'Поиск'}
        />
        {search && (
          <View style={styles.content}>
            <View>
              {dataEventsSearch?.data && (
                <FlatList
                  data={dataEventsSearch?.data || []}
                  keyExtractor={item => item._id}
                  renderItem={({ item }) => <EventsMedium event={item} />}
                />
              )}
            </View>
          </View>
        )}
      </View>
      <View style={{ zIndex: -1 }}>
        <HorizontalCalendar
          onSelectDate={function (value: DateTime): void {
            throw new Error('Function not implemented.');
          }}
          selected={DateTime.now()}
        />
      </View>
      <View style={{ zIndex: -1 }}>
        <EventsSwiper />
      </View>
    </SafeAreaContainer>
  );
}
