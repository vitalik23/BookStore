import { RegisterModel } from "../../models/register.model";

export class Register{
    static readonly type = '[Register] Register';
    constructor(public payload: RegisterModel){}
}