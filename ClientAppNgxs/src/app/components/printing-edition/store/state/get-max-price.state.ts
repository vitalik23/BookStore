import { State, Action, StateContext, Selector  } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GetMaxPricePrintingEdition } from '../actions/get-max-price.action';
import { PrintingEditionService } from 'src/app/services/printing-edition.service';



export class GetMaxPricePrintingEditionStateModel {
    maxPrice: number;
}


@State<GetMaxPricePrintingEditionStateModel>({
    name: 'getMaxPricePrintingEdition',
    defaults: {
        maxPrice: null,
    }
})

@Injectable()
export class GetMaxPricePrintingEditionState {
    constructor(
        private _printingEditionService: PrintingEditionService,
    ) {

    }

    @Selector()
    static getMaxPrice(state: GetMaxPricePrintingEditionStateModel) {
        return state.maxPrice;
    }

    @Action(GetMaxPricePrintingEdition)
    getPrintingEdition({ getState, setState }: StateContext<GetMaxPricePrintingEditionStateModel>) {
        return this._printingEditionService.getMaxPricePrintingEdition().pipe(
            tap((result) => {
                const state = getState();
                setState({
                    ...state,
                    maxPrice: result
                });
            }
        ));
    }

}
