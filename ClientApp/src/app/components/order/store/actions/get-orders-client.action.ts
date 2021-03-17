import { Action } from "@ngrx/store";
import { PageQuery } from "src/app/models/page/page-query.model";
import { PageResponse } from "src/app/models/page/page-response.model";

export enum GetOrdersClientEnum{
    GetOrdersClient = "[GetOrdersClient] GetOrdersClient",
    GetOrdersClientSuccess = "[GetOrdersClient] GetOrdersClientSuccess"
}

export class GetOrdersClient implements Action{
    public readonly type = GetOrdersClientEnum.GetOrdersClient;
    constructor(public payload: PageQuery){}
}

export class GetOrdersClientSuccess implements Action{
    public readonly type = GetOrdersClientEnum.GetOrdersClientSuccess;
    public constructor(public payload: PageResponse) {}
}

export type GetOrdersClientActions = GetOrdersClientSuccess | GetOrdersClient;