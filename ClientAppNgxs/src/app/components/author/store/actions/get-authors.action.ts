import { PageQuery } from "src/app/models/page-query";
import { AuthorFilterModel } from "../../models/author-filter.model";
import { AuthorModel } from "../../models/author.model";

export class GetAuthors{
    static readonly type = '[Author] GetAuthors';
    constructor(public payload: PageQuery, public filter: AuthorFilterModel){}
}

export class UpdateAuthor{
    static readonly type = '[Author] UpdateAuthor';
    constructor(public payload: AuthorModel){}
}

export class AddAuthor{
    static readonly type = '[Author] AddAuthor';
    constructor(public payload: AuthorModel){}
}

export class GetAuthor{
    static readonly type = '[Author] GetAuthor';
    constructor(public payload: number){}
}

export class DeleteAuthor{
    static readonly type = '[Author] DeleteAuthor';
    constructor(public payload: number){}
}