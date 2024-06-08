import { RefObject, useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  bottomSheetDataSelector,
  bottomSheetStateSelector,
  hideBottomSheet
} from '../../App/store/slice/BottomSheetSlice';
import { BottomSheetActions } from '../../features/bottom-sheet/BottomSheet';
import { useNativeRef } from './useNativeRef';

interface ResultProps<T> {
  readonly data: T;
  readonly open: boolean;
  readonly onClose: () => void;
  readonly hideBackdrop: () => void;
  readonly ref: RefObject<BottomSheetActions>;
}

export function useBottomSheet<T = unknown>(type: string): ResultProps<T> {
  const bottomSheetState = useSelector(bottomSheetStateSelector);
  const bottomSheetData = useSelector(bottomSheetDataSelector);

  const dispatch = useDispatch();

  const ref = useNativeRef<BottomSheetActions>();
  const open = bottomSheetState[type];
  const data = bottomSheetData[type] as T;

  const hideBackdropHandler = useCallback(() => {
    dispatch(hideBottomSheet(type));
  }, [type]);

  const closeHandler = useCallback(() => {
    if (ref.current) {
      ref.current.close();
    }
  }, [ref, type]);

  useEffect(() => {
    if (open && ref.current != null) {
      ref.current.open();
    }
  }, [open, ref]);

  useEffect(() => {
    const isClosing = !bottomSheetData[type] as T;
    if (isClosing) {
      closeHandler();
    }
  }, [bottomSheetData]);

  return {
    ref,
    open,
    data,
    onClose: closeHandler,
    hideBackdrop: hideBackdropHandler
  };
}
