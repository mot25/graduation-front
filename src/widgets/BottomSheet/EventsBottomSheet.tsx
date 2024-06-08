import React from 'react';
import { Text } from 'react-native';
import { BottomSheet } from '../../features/bottom-sheet/BottomSheet';
import { useBottomSheet } from '../../shared/hooks/useBottomSheet';

export const EVENTS_BOTTOM_SHEET_TYPE = 'bottom-sheet/events-bottom-sheet-type';

export type StrategyBottomSheetDataProps = {};

export function EventsBottomSheet() {
  const bottomSheet = useBottomSheet<StrategyBottomSheetDataProps>(
    EVENTS_BOTTOM_SHEET_TYPE
  );
  const closeHandler = () => {};

  const selectHandler = (currency: any) => {
    closeHandler();
  };

  return (
    <BottomSheet
      index={0}
      ref={bottomSheet.ref}
      onDismiss={closeHandler}
      handleProps={{ title: 'Мероприятия Никиты', onClosePress: closeHandler }}
      snapPoints={[400]}
    >
      <Text>Тут может быть все что-то надо</Text>
      {/*content*/}
    </BottomSheet>
  );
}
