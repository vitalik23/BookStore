import { ActionReducerMap } from '@ngrx/store';
import { AdminState } from '../state/admin.state';
import { addPrintingEditionReducer } from './add-printing-edition.reducer';
import { deletePrintingEditionReducer } from './delete-printing-edition.reducer';
import { deleteReducer } from './delete.reducer';
import { listAuthorsReducer } from './list-authors.reducer';
import { getClientReducer } from './list-client.reducer';
import { updatePrintingEditionReducer } from './update-printing-edition.reducer';
import { updateReducer } from './update.reducer';


export const adminReducer = 'adminReducer';

export const adminReducers: ActionReducerMap<AdminState> = {
    listClientState: getClientReducer,
    deleteState: deleteReducer,
    updateState: updateReducer,
    deletePrintingEditionState: deletePrintingEditionReducer,
    updatePrintingEditionState: updatePrintingEditionReducer,
    listAuthorsState: listAuthorsReducer,
    addPrintingEditionState: addPrintingEditionReducer,
};
