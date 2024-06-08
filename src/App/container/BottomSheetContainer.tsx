import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { ReactNode } from 'react';
import { EventsBottomSheet } from '../../widgets/BottomSheet/EventsBottomSheet';

export const BottomSheetContainer = ({ children }: { children: ReactNode }) => {
  return (
    <BottomSheetModalProvider>
      {children}

      <EventsBottomSheet />
    </BottomSheetModalProvider>
  );
};
