import { AddPrintingEditionState } from './add-printing-edition.state';
import { DeletePrintingEditionState } from './delete-printing-edition.state';
import { DeleteState } from './delete.state';
import { ListAuthorsState } from './list-authors.state';
import { ListClientState } from './list-client.state';
import { UpdatePrintingEditionState } from './update-printing-edition.state';
import { UpdateState } from './update.state';

export interface AdminState {
    listClientState: ListClientState;
    deleteState: DeleteState;
    updateState: UpdateState;
    deletePrintingEditionState: DeletePrintingEditionState;
    updatePrintingEditionState: UpdatePrintingEditionState;
    listAuthorsState: ListAuthorsState;
    addPrintingEditionState: AddPrintingEditionState;
}
