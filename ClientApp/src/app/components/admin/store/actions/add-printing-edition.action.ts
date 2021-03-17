import { Action } from "@ngrx/store";
import { PrintingEdition } from "src/app/components/printing-edition/models/printing-edition.model";

export enum AddPrintingEditionEnum{
    AddPrintingEdition = "[AddPrintingEdition] AddPrintingEdition",
    AddPrintingEditionSuccess = "[AddPrintingEdition] AddPrintingEditionSuccess"
}

export class AddPrintingEdition implements Action{
    public readonly type = AddPrintingEditionEnum.AddPrintingEdition;
    constructor(public payload: PrintingEdition){}
}

export class AddPrintingEditionSuccess implements Action{
    public readonly type = AddPrintingEditionEnum.AddPrintingEditionSuccess;
    constructor(public payload: PrintingEdition){}
}

export type AddPrintingEditionActions = AddPrintingEdition | AddPrintingEditionSuccess;