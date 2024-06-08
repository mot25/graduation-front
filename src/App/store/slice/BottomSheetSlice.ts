import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Keyboard } from 'react-native';
import { RootState } from '../index';

export interface BottomSheetContextStateProps {
  data: Record<string, any>;
  state: Record<string, any>;
}

interface PayloadActionBottomSheet {
  data: any;
  name: string;
}

const initialState: BottomSheetContextStateProps = {
  data: {},
  state: {}
};
export const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    showBottomSheet: (
      state,
      action: PayloadAction<PayloadActionBottomSheet>
    ) => {
      Keyboard.dismiss();
      const nameBottomSheet = action.payload.name;
      state.data = {
        ...state.data,
        [nameBottomSheet]: action.payload.data
      };
      state.state = {
        ...state.state,
        [nameBottomSheet]: true
      };
    },
    updateDataBottomSheet: (
      state,
      action: PayloadAction<PayloadActionBottomSheet>
    ) => {
      state.data = {
        ...state.data,
        [action.payload.name]: action.payload.data
      };
    },
    hideBottomSheet: (state, action: PayloadAction<string>) => {
      const nameBottomSheet = action.payload;
      state.data = {
        ...state.data,
        [nameBottomSheet]: false
      };
      state.state = {
        ...state.state,
        [nameBottomSheet]: undefined
      };
    },
    hideAllBottomSheet: state => {
      const newStateBottomSheet: Record<string, boolean> = Object.keys(
        state.state
      ).reduce((acc, current) => {
        return {
          ...acc,
          [current]: false
        };
      }, {} as Record<string, boolean>);
      const newDataBottomSheet: Record<string, any> = Object.keys(
        state.data
      ).reduce((acc, current) => {
        return {
          ...acc,
          [current]: undefined
        };
      }, {} as Record<string, any>);
      state.state = newStateBottomSheet;
      state.data = newDataBottomSheet;
    }
  }
});
export default bottomSheetSlice.reducer;

export const {
  showBottomSheet,
  hideBottomSheet,
  hideAllBottomSheet,
  updateDataBottomSheet
} = bottomSheetSlice.actions;

export const bottomSheetStateSelector = (state: RootState) =>
  state.bottomSheet.state;
export const bottomSheetDataSelector = (state: RootState) =>
  state.bottomSheet.data;
