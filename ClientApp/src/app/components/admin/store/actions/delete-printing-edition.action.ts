import { Action } from "@ngrx/store";

export enum DeletePrintingEditionEnum{
    DeletePrintingEdition = "[DeletePrintingEdition] DeletePrintingEdition",
    DeletePrintingEditionSuccess = "[DeletePrintingEdition] DeletePrintingEditionSuccess"
}

export class DeletePrintingEdition implements Action{
    public readonly type = DeletePrintingEditionEnum.DeletePrintingEdition;
    constructor(public payload: number){}
}

export class DeletePrintingEditionSuccess implements Action{
    public readonly type = DeletePrintingEditionEnum.DeletePrintingEditionSuccess;
    constructor(public payload: number){}
}

export type DeltePrintingEditionAction = DeletePrintingEdition | DeletePrintingEditionSuccess;