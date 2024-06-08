import { BottomSheetBackgroundProps as RNBottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import { BackdropPressBehavior } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import RNBottomSheetBackground from '@gorhom/bottom-sheet/src/components/bottomSheetBackground';
import React from 'react';
import { StyleSheet } from 'react-native';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.walter.main,
//   },
// }));

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff'
  }
});

export interface BottomSheetBackgroundProps
  extends RNBottomSheetBackgroundProps {
  readonly pressBehavior?: BackdropPressBehavior;
}

export function BottomSheetBackground(props: BottomSheetBackgroundProps) {
  return (
    <RNBottomSheetBackground
      {...props}
      style={[styles.root, props.style]}
    />
  );
}
