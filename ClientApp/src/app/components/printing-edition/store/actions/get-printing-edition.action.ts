import { Action } from "@ngrx/store";
import { PrintingEditionSuccessModel } from "../../models/printing-edition-success.model";

export enum GetPrintingEditionEnum{
    GetPrintingEdition = "[GetPrintingEdition] GetPrintingEdition",
    GetPrintingEditionSuccess = "[GetPrintingEdition] GetPrintingEditionSuccess"
}

export class GetPrintingEdition implements Action{
    public readonly type =  GetPrintingEditionEnum.GetPrintingEdition;
    constructor(public payload: number){}
}

export class GetPrintingEditionSuccess implements Action{
    public readonly type =  GetPrintingEditionEnum.GetPrintingEditionSuccess;
    constructor(public payload: PrintingEditionSuccessModel){}
}

export type GetPrintingEditionActions = GetPrintingEdition | GetPrintingEditionSuccess;