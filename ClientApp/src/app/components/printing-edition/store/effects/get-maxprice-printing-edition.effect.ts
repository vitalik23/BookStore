import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import {  map, mergeMap } from 'rxjs/operators';
import { PrintingEditionService } from '../../../../service/printing-edition.service';

import * as maxPricePrintingEditionAction from '../actions/get-maxprice-printing-edition.action';

@Injectable()
export class GetMaxPricePrintingEditionEffect {
    constructor
    (
        private printingEditionService: PrintingEditionService,
        private actions$: Actions,
    )
    {}

    @Effect()
    GetPrintingEdition = this.actions$.pipe(
        ofType<maxPricePrintingEditionAction.GetMaxPricePrintingEdition>(maxPricePrintingEditionAction.GetMaxPricePrintingEditionEnum.GetMaxPricePrintingEdition),
        mergeMap((action: maxPricePrintingEditionAction.GetMaxPricePrintingEdition) =>
            this.printingEditionService.getMaxPricePrintingEdition().pipe(
                map((maxPrice) => {
                    return new maxPricePrintingEditionAction.GetMaxPricePrintingEditionSuccess(maxPrice);
                })
            ))
    );

}
