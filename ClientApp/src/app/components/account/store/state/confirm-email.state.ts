import { ConfirmEmailModel } from '../../models/confirm-email.model';

export interface ConfirmEmailState{
    confirmModel: ConfirmEmailModel;
}

export const initialConfirtEmailState: ConfirmEmailState = {
    confirmModel: null
};
