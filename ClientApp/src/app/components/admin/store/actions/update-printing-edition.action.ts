import { Action } from "@ngrx/store";
import { PrintingEdition } from "src/app/components/printing-edition/models/printing-edition.model";

export enum UpdatePrintingEditionEnum{
    UpdatePrintingEdition = "[UpdatePrintingEdition] UpdatePrintingEdition",
    UpdatePrintingEditionSuccess = "[UpdatePrintingEdition] UpdatePrintingEditionSuccess",
}

export class UpdatePrintingEdition implements Action{
    public readonly type =  UpdatePrintingEditionEnum.UpdatePrintingEdition;
    constructor(public payload: PrintingEdition){}
}

export class UpdatePrintingEditionSuccess implements Action{
    public readonly type =  UpdatePrintingEditionEnum.UpdatePrintingEditionSuccess;
    constructor(public payload: PrintingEdition){}
}

export type UpdatePrintingEditionAction = UpdatePrintingEdition | UpdatePrintingEditionSuccess;