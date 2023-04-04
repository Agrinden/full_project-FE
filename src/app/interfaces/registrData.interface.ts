import { Role } from './../enums/role';
export interface RegistrData {
    _id?: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: Role;
}

export interface RegistrDataDTO extends Omit<RegistrData, 'confirmPassword'> {}
