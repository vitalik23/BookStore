import { State, Action, StateContext, Selector  } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthorModel } from 'src/app/components/author/models/author.model';
import { ListAuthors } from '../actions/list-authors.action';


export class ListAuthorsStateModel {
    authors: AuthorModel[];
}

@State<ListAuthorsStateModel>({
    name: 'listAuthorrs',
    defaults: {
        authors: null
    }
})

@Injectable()
export class ListAuthorsState {
    constructor(
        private _adminService: AdminService,
    ) {

    }


    @Selector()
    static getAuthors(state: ListAuthorsStateModel){
        return state.authors;
    }

    @Action(ListAuthors)
    listAuthors({ getState, setState }: StateContext<ListAuthorsStateModel>) {
        return this._adminService.listAuthors().pipe(
            tap((result) => { 
                const state = getState();
                setState({
                    ...state,
                    authors: result
                });
            }
        ));
    }

}
