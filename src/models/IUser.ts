import { IAddress } from './IAddress';
import { ICompany } from './ICompany';

export interface IUser {
    id: number | string;
    name: string;
    username: string;
    email: string;
    address: IAddress,
    phone: string;
    website: string;
    company: ICompany;
}
