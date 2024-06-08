import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import {
  BottomSheet,
  BottomSheetActions,
  BottomSheetProps
} from './BottomSheet';

export interface AutoSizeBottomSheetProps
  extends Omit<BottomSheetProps, 'snapPoints'> {
  readonly snapPoints?: BottomSheetProps['snapPoints'];
  readonly contentContainerStyle?: StyleProp<ViewStyle>;
}

export const AutoSizeBottomSheet = forwardRef<
  BottomSheetActions,
  AutoSizeBottomSheetProps
>(({ children, contentContainerStyle, ...props }, ref) => {
  return (
    <BottomSheet
      ref={ref}
      enableDynamicSizing={true}
      {...props}
    >
      <BottomSheetView style={contentContainerStyle}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
});
