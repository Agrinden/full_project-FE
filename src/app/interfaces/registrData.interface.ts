export interface RegistrData {
    id?: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegistrDataDTO extends Omit<RegistrData, 'confirmPassword'> {}
