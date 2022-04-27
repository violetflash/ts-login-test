import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConfirmDialogData, ConfirmDialogProps } from '../../types';

const initialState: ConfirmDialogProps = {
    isOpened: false,
    confirmData: {} as ConfirmDialogData
};

export const confirmDialogSlice = createSlice({
    name: 'confirmDialog',
    initialState,
    reducers: {
        openConfirmDialog: (state, action: PayloadAction<ConfirmDialogData>) => {
            state.isOpened = true;
            state.confirmData = action.payload;
        },
        closeConfirmDialog: () => initialState
    }
});

export const { openConfirmDialog, closeConfirmDialog } = confirmDialogSlice.actions;
