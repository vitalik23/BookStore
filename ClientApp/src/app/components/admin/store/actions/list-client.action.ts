import { Action } from '@ngrx/store';
import { PageQuery } from 'src/app/models/page/page-query.model';
import { PageResponse } from 'src/app/models/page/page-response.model';
import { UserFilter } from '../../models/user-filter.model';

export enum ClientListActionEnum{
    GetClientList = '[GetClientList] GetClientList',
    GetClientListSuccess = '[GetClientList] GetClientListSuccess',
}

export class GetClientList implements Action {
    public readonly type = ClientListActionEnum.GetClientList;
    constructor(public payload: PageQuery, public filter: UserFilter){}
}

export class GetClientListSuccess implements Action {
    public readonly type = ClientListActionEnum.GetClientListSuccess;
    constructor(public payload: PageResponse){}
}



export type GetListClient =  GetClientList | GetClientListSuccess;
