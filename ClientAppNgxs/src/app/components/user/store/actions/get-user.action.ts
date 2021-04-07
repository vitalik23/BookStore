import { UserModel } from "../../models/user.model";

export class GetUser{
    static readonly type = '[User] GetUser';
}

export class EditUser{
    static readonly type = '[User] EditUser';
    constructor(public payload: UserModel){}
}