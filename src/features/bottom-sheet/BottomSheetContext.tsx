import { useDispatch, useSelector } from 'react-redux';
import {
  BottomSheetContextStateProps,
  bottomSheetDataSelector,
  bottomSheetStateSelector,
  hideAllBottomSheet,
  hideBottomSheet,
  showBottomSheet,
  updateDataBottomSheet
} from '../../App/store/slice/BottomSheetSlice';

interface BottomSheetActionsProps {
  hide: (name: string) => void;
  hideAll: () => void;
  show: <T extends object>(name: string, data?: T) => void;
  updateData: <T extends object>(name: string, data?: T) => void;
}

interface BottomSheetMethodsProps {
  readonly getState: (name: string) => boolean;

  getData<T>(name: string): T;
}

export type BottomSheetContextProps = BottomSheetActionsProps &
  BottomSheetMethodsProps &
  BottomSheetContextStateProps;

export function useBottomSheetContext(): BottomSheetContextProps {
  const dispatch = useDispatch();

  const bottomSheetState = useSelector(bottomSheetStateSelector);
  const bottomSheetData = useSelector(bottomSheetDataSelector);

  function getDataByBottomSheet<T>(name: string): T {
    return bottomSheetData[name] as T;
  }

  function getStateByBottomSheet<T>(name: string): T {
    return bottomSheetState[name] as T;
  }

  const hideBottomSheetHandler = (type: string) => {
    dispatch(hideBottomSheet(type));
  };

  const hideAllBottomSheetHandler = () => {
    dispatch(hideAllBottomSheet());
  };

  const showBottomSheetHandler = <T extends object>(name: string, data?: T) => {
    dispatch(
      showBottomSheet({
        name,
        data
      })
    );
  };

  const updateData = <T extends object>(name: string, data?: T) => {
    dispatch(
      updateDataBottomSheet({
        name,
        data
      })
    );
  };

  return {
    getData: getDataByBottomSheet,
    getState: getStateByBottomSheet,

    data: bottomSheetData,
    state: bottomSheetState,

    hide: hideBottomSheetHandler,
    hideAll: hideAllBottomSheetHandler,
    show: showBottomSheetHandler,
    updateData: updateData
  };
}
