import { Action } from "@ngrx/store";
import { PageQuery } from "src/app/models/page/page-query.model";
import { PageResponse } from "src/app/models/page/page-response.model";
import { PrintingEditionFilterModel } from "src/app/components/admin/models/printing-edition-filter.model";

export enum GetPrintingEditionsEnum{
    GetPrintingEditions = "[GetPrintingEditions]  GetPrintingEditions",
    GetPrintingEditionsSuccess = "[GetPrintingEditions]  GetPrintingEditionsSuccess",

}

export class GetPrintingEditions implements Action{
    public readonly type = GetPrintingEditionsEnum.GetPrintingEditions;
    constructor(public payload: PageQuery, public filter: PrintingEditionFilterModel) {}
}

export class GetPrintingEditionsSuccess implements Action{
    public readonly type = GetPrintingEditionsEnum.GetPrintingEditionsSuccess;
    constructor(public payload: PageResponse) {}
}


export type GetPrintingEditionAction = GetPrintingEditions | GetPrintingEditionsSuccess;