import { BottomSheetHandleProps as RNBottomSheetHandleProps } from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';

const styles = StyleSheet.create({
  title: { flexShrink: 1, flexGrow: 1 },
  containerWithClose: { justifyContent: 'flex-end' },
  root: { marginTop: -13 },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 20
  },
  line: {
    alignSelf: 'center',
    height: 5,
    width: 134,
    marginBottom: 8,
    borderRadius: 3,
    backgroundColor: '#fff'
  },
  closeButton: {
    width: 30,
    height: 30
  }
});

export interface BottomSheetHandleProps
  extends RNBottomSheetHandleProps,
    Omit<ViewProps, 'children'> {
  readonly title?: string;
  readonly titleProps?: any;

  readonly onClosePress?: () => void;
  readonly withCloseButton?: boolean;
}

export function BottomSheetHandle({
  title,
  titleProps,
  onClosePress,
  withCloseButton = true,
  ...props
}: BottomSheetHandleProps) {
  const withTitle = title != null && !!title;
  return (
    <View style={[styles.root, props.style]}>
      <View style={styles.line} />

      <View
        {...props}
        style={[
          styles.container,
          !withTitle && withCloseButton && styles.containerWithClose
        ]}
      >
        {withTitle && (
          <Text
            {...titleProps}
            style={[styles.title, titleProps?.style]}
          >
            {title}
          </Text>
        )}

        {withCloseButton && <Text>X</Text>}
      </View>
    </View>
  );
}
