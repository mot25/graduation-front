import { BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/src/types';
import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle
} from 'react';
import { StyleSheet } from 'react-native';

import { BottomSheetBackdrop } from './BottomSheetBackdrop';
import {
  BottomSheetBackground,
  BottomSheetBackgroundProps
} from './BottomSheetBackground';
import { BottomSheetHandle, BottomSheetHandleProps } from './BottomSheetHandle';

const styles = StyleSheet.create({
  background: {
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34
  }
});

export interface BottomSheetActions {
  open(): void;

  close(): void;

  snapToIndex(index: number): void;
}

export interface BottomSheetProps extends BottomSheetModalProps {
  readonly children: ReactNode;
  readonly handleProps?: Omit<
    BottomSheetHandleProps,
    'animatedPosition' | 'animatedIndex'
  >;
  readonly backdropProps?: Omit<
    BottomSheetBackgroundProps,
    'animatedPosition' | 'animatedIndex'
  >;
}

export const BottomSheet = forwardRef<BottomSheetActions, BottomSheetProps>(
  ({ children, handleProps, backdropProps, ...props }, ref) => {
    const bottomSheetRef = React.useRef<BottomSheetModalMethods>(null);

    useImperativeHandle(ref, () => ({
      open() {
        bottomSheetRef.current?.present();
      },
      close() {
        bottomSheetRef.current?.dismiss();
      },
      snapToIndex(index: number) {
        bottomSheetRef.current?.snapToIndex(index);
      }
    }));

    const backgroundComponent = useCallback(
      (backgroundProps: any) => (
        <BottomSheetBackground
          {...backgroundProps}
          {...backdropProps}
        />
      ),
      [backdropProps]
    );

    const handleComponent = useCallback(
      (handleComponentProps: any) => (
        <BottomSheetHandle
          {...handleProps}
          {...handleComponentProps}
        />
      ),
      [handleProps]
    );

    const backdropComponent = useCallback(
      (backdropComponentProps: any) => (
        <BottomSheetBackdrop
          {...backdropComponentProps}
          {...backdropProps}
        />
      ),
      [backdropProps]
    );

    return (
      <BottomSheetModal
        backgroundStyle={styles.background}
        stackBehavior="push"
        backgroundComponent={backgroundComponent}
        backdropComponent={backdropComponent}
        handleComponent={handleComponent}
        {...props}
        ref={bottomSheetRef}
      >
        {children}
      </BottomSheetModal>
    );
  }
);
