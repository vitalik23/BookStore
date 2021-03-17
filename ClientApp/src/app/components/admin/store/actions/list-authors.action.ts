import { Action } from "@ngrx/store";
import { AuthorModel } from "src/app/components/author/models/author.model";

export enum ListAuthorsEnum{
    ListAuthors = "[ListAuthors] ListAuthors",
    ListAuthorsSuccess = "[ListAuthors] ListAuthorsSuccess"
}

export class ListAuthors implements Action{
    public readonly type = ListAuthorsEnum.ListAuthors;
}

export class ListAuthorsSuccess implements Action{
    public readonly type = ListAuthorsEnum.ListAuthorsSuccess;
    constructor(public payload: AuthorModel[]) {}
}

export type ListAuthorsActions = ListAuthors | ListAuthorsSuccess;