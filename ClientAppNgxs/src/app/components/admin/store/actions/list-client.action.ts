import { UserModel } from "src/app/components/user/models/user.model";
import { PageQuery } from "src/app/models/page-query";
import { UserFilterModel } from "../../models/user-filter.model";

export class GetClientList{
    static readonly type = '[GetClientList] GetClientList';
    constructor(public payload: PageQuery, public filter: UserFilterModel){}
}

export class DeleteUser{
    static readonly type = '[DeleteUser] DeleteUser';
    constructor(public payload: number){}
}


export class UpdateUser{
    static readonly type = '[UpdateUser] UpdateUser';
    constructor(public payload: UserModel){}
}