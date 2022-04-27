import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { UsersState } from '../../types';
import { IUser } from '../../models/IUser';
import { addUsersToLS, deleteDataFromLS, findUserIndexById, getDataFromLS } from '../../utils/functions';
import { LS_USERS_KEY } from '../constants';

const initialState: UsersState = {
    users: [],
    searchTerm: ''
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state: UsersState, action: PayloadAction<IUser[]>) => {
            state.users = action.payload;
            addUsersToLS(action.payload);
        },
        deleteUser: (state: UsersState, action: PayloadAction<IUser['id']>) => {
            const users = getDataFromLS(LS_USERS_KEY);
            const userIndex = findUserIndexById(action.payload, users);
            users.splice(userIndex, 1);
            state.users = users;
            addUsersToLS(users);
        },
        updateUser: (state: UsersState, action: PayloadAction<IUser>) => {
            const users = getDataFromLS(LS_USERS_KEY);
            const userIndex = findUserIndexById(action.payload.id, users);
            users[userIndex] = { ...action.payload };
            state.users = users;
            addUsersToLS(users);
        },
        createNewUser: (state: UsersState, action: PayloadAction<IUser>) => {
            const users = getDataFromLS(LS_USERS_KEY);
            users.push({ ...action.payload, id: nanoid() });
            state.users = users;
            addUsersToLS(users);
        },
        deleteAllUsers: () => {
            deleteDataFromLS(LS_USERS_KEY);
            return initialState;
        },
        setSearchTerm: (state: UsersState, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        }
    }
});

export const { setUsers, updateUser, createNewUser, deleteAllUsers, deleteUser, setSearchTerm } = usersSlice.actions;
