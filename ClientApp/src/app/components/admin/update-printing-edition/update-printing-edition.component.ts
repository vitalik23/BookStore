import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app-state.state';
import { listAuthors } from '../store/selectors/list-authors.selector';
import { CurrencyTypeEnum } from '../../../enums/currency-type';
import { PrintingTypeEnum } from '../../../enums/printing-type';
import { UpdatePrintingEdition } from '../store/actions/update-printing-edition.action';
import { ListAuthors } from '../store/actions/list-authors.action';
import { PrintingEdition } from '../../printing-edition/models/printing-edition.model';
import { Constants } from 'src/app/constants/constants';
import { GetPrintingEdition } from '../../printing-edition/store/actions/get-printing-edition.action';
import { getPrintingEdition } from '../../printing-edition/store/selectors/get-printing-edition.selector';

@Component({
  selector: 'app-update-printing-edition',
  templateUrl: './update-printing-edition.component.html',
  styleUrls: ['./update-printing-edition.component.scss']
})
export class UpdatePrintingEditionComponent implements OnInit {

  updatePrintingEditionForm: FormGroup;

  printingEdition: PrintingEdition;

  keysPrinting: string[];
  printingType = PrintingTypeEnum;


  keysCurrency: string[];
  currencyType = CurrencyTypeEnum;

  id: string;


  constructor(
    private activateRoute: ActivatedRoute,
    private store$: Store<AppState>,
  ) {

    this.updatePrintingEditionForm = new FormGroup({
      "title": new FormControl(""),
      "description": new FormControl(""),
      "price": new FormControl(""),
      "type": new FormControl(""),
      "authors": new FormControl("")
    });
  }

  authors$ = this.store$.pipe(select(listAuthors));

  ngOnInit(): void {
  
    this.store$.dispatch(new ListAuthors());

    this.id = this.activateRoute.snapshot.paramMap.get(Constants.ID);

    this.store$.dispatch(new GetPrintingEdition(Number(this.id)));

    this.store$.pipe(select(getPrintingEdition)).subscribe(
      data => {
        this.printingEdition = data;
        this.updatePrintingEditionForm.controls[Constants.FORM_FIELD_PRICE].patchValue(this.printingEdition?.price);
        this.updatePrintingEditionForm.controls[Constants.FORM_FIELD_TITLE].patchValue(this.printingEdition?.title);
        this.updatePrintingEditionForm.controls[Constants.FORM_FIELD_DESCRIPTIONS].patchValue(this.printingEdition?.description);
        this.updatePrintingEditionForm.controls[Constants.FORM_FIELD_TYPE].patchValue(this.printingEdition?.type.toString());
        this.updatePrintingEditionForm.controls[Constants.FORM_FIELD_AUTHORS].patchValue(this.printingEdition?.authorsId);
      }
    );

 

    this.keysCurrency = Object.keys(this.currencyType).filter(Number);
    this.keysPrinting = Object.keys(this.printingType).filter(Number);
  }

  updatePrintingEdition() {

    let form: PrintingEdition = {
      id: Number(this.id),
      authorsId: this.updatePrintingEditionForm.controls[Constants.FORM_FIELD_AUTHORS].value,
      currency: CurrencyTypeEnum.USD,
      description: this.updatePrintingEditionForm.controls[Constants.FORM_FIELD_DESCRIPTIONS].value,
      price: this.updatePrintingEditionForm.controls[Constants.FORM_FIELD_PRICE].value,
      type: this.enumsPrinting(this.updatePrintingEditionForm.controls[Constants.FORM_FIELD_TYPE].value),
      title: this.updatePrintingEditionForm.controls[Constants.FORM_FIELD_TITLE].value,
      authorInPrintingEdition: null
    }

    this.store$.dispatch(new UpdatePrintingEdition(form));
  }

  enumsPrinting(value) {
    return Number(value);
  }

}
