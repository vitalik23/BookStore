import { PrintingEditionFilterModel } from "src/app/components/admin/models/printing-edition.model";
import { PageQuery } from "src/app/models/page-query";
import { PrintingEditionModel } from "../../models/printing-edition.model";


export class GetPrintingEditions {
    static readonly type = "[GetPrintingEditions]  GetPrintingEditions";
    constructor(public payload: PageQuery, public filter: PrintingEditionFilterModel) {}
}

export class DeletePrintingEdition{
    static type = '[DeletePrintingEdition] DeletePrintingEdition';
    constructor(public payload: number){}
}

export class UpdatePrintingEdition{
    static type = '[UpdatePrintingEdition] UpdatePrintingEdition';
    constructor(public payload: PrintingEditionModel){}
}


export class AddPrintingEdition{
    static type = "[AddPrintingEdition] AddPrintingEdition";
    constructor(public payload: PrintingEditionModel){}
}