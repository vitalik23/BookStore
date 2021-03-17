import { RegisterModel } from '../../models/register.model';


export interface RegisterState {
    registerModel: RegisterModel;
    message: string;
}

export const initialRegisterSate: RegisterState = {
    registerModel: null,
    message: null
}