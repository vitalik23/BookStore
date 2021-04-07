import { ConfirmEmailModel } from "../../models/confirm-email.model";

export class ConfirmEmail{
    static readonly type = '[ConfirmEmail] ConfirmEmail';
    constructor(public payload: ConfirmEmailModel){}
}
