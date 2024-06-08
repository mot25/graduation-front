import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { EventsListMedium } from '../../../features/EventsListMedium';
import { TopTabList } from '../../../features/TopButtonTab/ui/TopButtonTab';
import { useGetCategoriesQuery } from '../../../shared/API/CategoriesApi';

const styles = StyleSheet.create({
  wrapperContent: {
    // flex: 1
  }
});

export function EventsSwiper() {
  const { data: dataCategories } = useGetCategoriesQuery();

  const [selectTabId, setSelectTabId] = useState<
    CategoriesTypes.Category['code'] | undefined
  >(undefined);

  return (
    <View>
      <TopTabList
        data={[
          { code: undefined, name: 'Все', _id: '' },
          ...(dataCategories?.data || [])
        ]}
        selectTabId={selectTabId}
        setSelectTabId={setSelectTabId}
      />
      <View>
        <ScrollView style={styles.wrapperContent}>
          <EventsListMedium code={selectTabId} />
        </ScrollView>
      </View>
    </View>
  );
}
