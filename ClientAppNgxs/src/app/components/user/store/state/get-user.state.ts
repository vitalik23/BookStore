import { State, Action, StateContext, Selector, Store  } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { GetUser } from '../actions/get-user.action';
import { UserService } from 'src/app/services/user.service';
import { UpdateUser } from 'src/app/components/admin/store/actions/list-client.action';
import { SpinnerHide, SpinnerShow } from 'src/app/store/actions/spinner.action';



export class GetUserStateModel {
    user: UserModel;
}


@State<GetUserStateModel>({
    name: 'getUser',
    defaults: {
        user: null,
    }
})

@Injectable()
export class GetUserState {
    constructor(
        private _userService: UserService,
        private store$: Store
    ) {

    }

    @Selector()
    static getUser(state: GetUserStateModel) {
        return state.user;
    }

    @Action(GetUser)
    getUser({ getState, setState }: StateContext<GetUserStateModel>) {
        this.store$.dispatch(new SpinnerShow());  
        return this._userService.getUser().pipe(
            tap((result) => {
                const state = getState();
                setState({
                    ...state,
                    user: result
                });
                this.store$.dispatch(new SpinnerHide());
            }
        ));
    }

    @Action(UpdateUser)
    updateUser({ getState, setState }: StateContext<GetUserStateModel>, {payload} : UpdateUser) {
        return this._userService.updateUser(payload).pipe(
            tap((result) => {
                const state = getState();
                setState({
                    ...state,
                    user: result
                });
            }
        ));
    }

}
