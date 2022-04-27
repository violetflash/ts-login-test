import { LS_USER_KEY } from 'store/constants';
import { IUser } from '../models/IUser';

export const addUserToLS = (email: string) => localStorage.setItem(LS_USER_KEY, JSON.stringify(email));

export const checkIsLoggedIn = () => localStorage.getItem(LS_USER_KEY);

export const getUserFromLS = () => JSON.parse(JSON.stringify(localStorage.getItem(LS_USER_KEY)));

export const deleteUserFromLS = () => localStorage.removeItem(LS_USER_KEY);

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

export const findUserIndexById = (id: number, data: IUser[]) => data.findIndex((user) => user.id === id);
