import { Action } from "@ngrx/store";

export enum GetMaxPricePrintingEditionEnum{
    GetMaxPricePrintingEdition = "[GetMaxPricePrintingEdition] GetMaxPricePrintingEdition",
    GetMaxPricePrintingEditionSuccess = "[GetMaxPricePrintingEdition] GetMaxPricePrintingEditionSuccess"
}

export class GetMaxPricePrintingEdition implements Action{
    public readonly type =  GetMaxPricePrintingEditionEnum.GetMaxPricePrintingEdition;
}

export class GetMaxPricePrintingEditionSuccess implements Action{
    public readonly type =  GetMaxPricePrintingEditionEnum.GetMaxPricePrintingEditionSuccess;
    constructor(public payload: number){}
}

export type GetMaxPricePrintingEditionActions = GetMaxPricePrintingEdition | GetMaxPricePrintingEditionSuccess;