import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import RNBottomSheetBackdrop from '@gorhom/bottom-sheet/src/components/bottomSheetBackdrop';
import React from 'react';
import { StyleSheet } from 'react-native';

// const useStyles = makeStyles((theme) => ({
//   root: { ...theme.styles.absoluteFillObject, backgroundColor: theme.palette.common.black },
// }));
const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000'
  }
});

export function BottomSheetBackdrop(props: BottomSheetBackdropProps) {
  return (
    <RNBottomSheetBackdrop
      {...props}
      opacity={0.7}
      appearsOnIndex={0}
      style={styles.root}
      disappearsOnIndex={-1}
    />
  );
}
