import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SpinnerHide, SpinnerShow } from '../actions/spinner.action';



export class SpinnerStateModel {
    isShowing: boolean;
}


@State<SpinnerStateModel>({
    name: 'spinner',
    defaults: {
        isShowing: false,
    }
})

@Injectable()
export class SpinnerState {
    constructor(
    ) {

    }

    @Selector()
    static isShowingSpinner(state: SpinnerStateModel) {
        return state.isShowing;
    }

    @Action(SpinnerShow)
    spinnerShow({ setState }: StateContext<SpinnerStateModel>) {
        setState({
            isShowing: true
        });
    }

    @Action(SpinnerHide)
    spinnerHide({ setState }: StateContext<SpinnerStateModel>) {
        setState({
            isShowing: false
        });
    }

}
