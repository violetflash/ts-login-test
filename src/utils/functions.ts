import { LS_ACCOUNT_KEY, LS_USERS_KEY } from 'store/constants';
import { IUser } from '../models/IUser';

export const addAccountToLS = (email: string) => localStorage.setItem(LS_ACCOUNT_KEY, JSON.stringify(email));
export const checkIsLoggedIn = () => localStorage.getItem(LS_ACCOUNT_KEY);
export const deleteDataFromLS = (key: string) => localStorage.removeItem(key);
export const addUsersToLS = (users: IUser[]) => localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
export const getDataFromLS = (key: string) => JSON.parse(localStorage.getItem(key)!);

export const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
};

export const findUserIndexById = (id: IUser['id'], data: IUser[]) => data.findIndex((user) => user.id === id);
