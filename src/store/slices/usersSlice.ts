import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersState } from '../../types';
import { IUser } from '../../models/IUser';
import { findUserIndexById } from '../../utils/functions';

const initialState: UsersState = {
    users: []
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state: UsersState, action: PayloadAction<IUser[]>) => {
            state.users = action.payload;
        },
        deleteUser: (state: UsersState, action: PayloadAction<number>) => {
            const userIndex = findUserIndexById(action.payload, state.users);
            state.users.splice(userIndex, 1);
        },
        updateUser: (state: UsersState, action: PayloadAction<IUser>) => {
            const userIndex = findUserIndexById(action.payload.id, state.users);
            state.users[userIndex] = { ...action.payload };
        },
        createNewUser: (state: UsersState, action: PayloadAction<IUser>) => {
            state.users.push(action.payload);
        },
        deleteAllUsers: () => initialState
    }
});

export const { setUsers, updateUser, createNewUser, deleteAllUsers, deleteUser } = usersSlice.actions;
