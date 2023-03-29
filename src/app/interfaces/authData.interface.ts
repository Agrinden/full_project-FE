import { Role } from './../enums/role';

export interface AuthData {
    _id: string;
    name: string;
    password: string;
    role: Role;
}
