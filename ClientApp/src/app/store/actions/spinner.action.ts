import { Action } from "@ngrx/store";

export enum EnumSpinner{
    SpinnerShow = "[Spinner] SpinnerShow",
    SpinnerHide = "[Spinner] SpinnerHide",
}

export class SpinnerShow implements Action{
    public readonly type = EnumSpinner.SpinnerShow;
}

export class SpinnerHide implements Action{
    public readonly type = EnumSpinner.SpinnerHide;
}

export type SpinnerActions = SpinnerShow | SpinnerHide;