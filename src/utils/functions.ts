import { LS_USER_KEY } from 'store/constants';

export const addUserToLS = (email: string) => localStorage.setItem(LS_USER_KEY, JSON.stringify(email));

export const checkIsLoggedIn = () => localStorage.getItem(LS_USER_KEY);

export const getUserFromLS = () => JSON.parse(JSON.stringify(localStorage.getItem(LS_USER_KEY)));
