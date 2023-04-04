import { Role } from '../enums/role';

export interface AuthDTO {
    _id: string;
    status: string;
    message: string;
    jwtToken: string;
    role: Role;
}
