import { State, Action, StateContext, Selector, Store  } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthorModel } from '../../models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { AddAuthor, DeleteAuthor, GetAuthors, UpdateAuthor } from '../actions/get-authors.action';
import { SpinnerHide, SpinnerShow } from 'src/app/store/actions/spinner.action';



export class GetAuthorsStateModel {
    data: AuthorModel[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
}


@State<GetAuthorsStateModel>({
    name: 'getAuthors',
    defaults: {
        data: null,
        totalItems: null,
        pageNumber: 1,
        pageSize: 6,
    }
})

@Injectable()
export class GetAuthorsState {
    constructor(
        private _authorService: AuthorService,
        private store$: Store
    ) {

    }

    @Selector()
    static getData(state: GetAuthorsStateModel) {
        return state.data;
    }

    @Selector()
    static getPageNumber(state: GetAuthorsStateModel) {
        return state.pageNumber;
    }

    @Selector()
    static getPageSize(state: GetAuthorsStateModel) {
        return state.pageSize;
    }

    @Selector()
    static getTotalItems(state: GetAuthorsStateModel) {
        return state.totalItems;
    }

    @Action(GetAuthors)
    getAuthors({ getState, setState }: StateContext<GetAuthorsStateModel>, { payload, filter }: GetAuthors) {
        this.store$.dispatch(new SpinnerShow());  
        return this._authorService.getAuthors(payload, filter).pipe(
            tap((result) => {
                const state = getState();
                setState({
                    ...state,
                    data: result.data,
                    pageNumber: result.pageNumber,
                    pageSize: result.pageSize,
                    totalItems: result.totalItems
                });
                this.store$.dispatch(new SpinnerHide());

            }
        ));
    }

    @Action(UpdateAuthor)
    updateAuthor({getState, setState}: StateContext<GetAuthorsStateModel>, { payload }: UpdateAuthor) {
        return this._authorService.updateAuthor(payload).pipe(
            tap((result) => { 
                const state = getState();
                const listAuthor = [...state.data];
                const authorIndex = listAuthor.findIndex(item => item.id === payload.id);
                listAuthor[authorIndex] = result;
                setState({
                    ...state,
                    data: listAuthor
                })
            }
           
        ));
    }

    @Action(DeleteAuthor)
    deleteAuthor({getState, setState}: StateContext<GetAuthorsStateModel>, { payload }: DeleteAuthor) {
        return this._authorService.deleteAuthor(payload).pipe(
            tap((result) => { 
                const state = getState();
                const listAuthor = state.data.filter(item => item.id !== payload);
                setState({
                    ...state,
                    data: listAuthor
                })
            }
           
        ));
    }

    @Action(AddAuthor)
    addAuthor({getState, patchState}: StateContext<GetAuthorsStateModel>, { payload }: AddAuthor) {
        return this._authorService.addAuthor(payload).pipe(
            tap((result) => { 
                const state = getState();
                patchState({
                    data: [...state.data, result]
                })
            }
        ));
    }

}
