import React from 'react';
import { ScrollView, View } from 'react-native';
import { TopTabButton } from '../../../shared/ui/TopTabButton';

interface Props {
  data: CategoriesTypes.Category[];
  setSelectTabId: (value: CategoriesTypes.Category['code']) => void;
  selectTabId: CategoriesTypes.Category['code'] | undefined;
}

export function TopTabList({ data, setSelectTabId, selectTabId }: Props) {
  return (
    <View>
      <ScrollView
        style={{ paddingBottom: 10 }}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {data.map(({ name, code }, index) => (
          <TopTabButton
            title={name}
            key={index}
            isActive={code === selectTabId}
            onPress={() => setSelectTabId(code)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
