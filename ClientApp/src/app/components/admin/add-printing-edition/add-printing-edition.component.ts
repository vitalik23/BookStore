import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app-state.state';
import { PrintingEdition } from '../../printing-edition/models/printing-edition.model';
import { CurrencyTypeEnum } from '../../../enums/currency-type';
import { PrintingTypeEnum } from '../../../enums/printing-type';
import { AddPrintingEdition } from '../store/actions/add-printing-edition.action';
import { ListAuthors } from '../store/actions/list-authors.action';
import { listAuthors } from '../store/selectors/list-authors.selector';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-add-printing-edition',
  templateUrl: './add-printing-edition.component.html',
  styleUrls: ['./add-printing-edition.component.scss']
})
export class AddPrintingEditionComponent implements OnInit {

  addPrintingEditionForm: FormGroup

  keysPrinting: string[];
  printingType = PrintingTypeEnum;


  keysCurrency: string[];
  currencyType = CurrencyTypeEnum;

  constructor(
    private store$: Store<AppState>,
    public dialogRef: MatDialogRef<AddPrintingEditionComponent>,
  ) {
    this.addPrintingEditionForm = new FormGroup({
      "title": new FormControl("", Validators.required),
      "description": new FormControl("", Validators.required),
      "price": new FormControl("", Validators.required),
      "type": new FormControl("", Validators.required),
      "authors": new FormControl("", Validators.required)
    });
  }

  authors$ = this.store$.pipe(select(listAuthors));
 

  ngOnInit(): void {

    this.store$.dispatch(new ListAuthors());

    this.keysCurrency = Object.keys(this.currencyType).filter(Number);
    this.keysPrinting = Object.keys(this.printingType).filter(Number);
  }

  addPrintingEdition() {

    let form: PrintingEdition = {
      id: Constants.ID_START_VALUE,
      authorsId: this.addPrintingEditionForm.controls[Constants.FORM_FIELD_AUTHORS].value,
      currency: CurrencyTypeEnum.USD,
      description: this.addPrintingEditionForm.controls[Constants.FORM_FIELD_DESCRIPTIONS].value,
      price: this.addPrintingEditionForm.controls[Constants.FORM_FIELD_PRICE].value,
      type: this.enumsPrinting(this.addPrintingEditionForm.controls[Constants.FORM_FIELD_TYPE].value),
      title: this.addPrintingEditionForm.controls[Constants.FORM_FIELD_TITLE].value,
      authorInPrintingEdition: null
    }

    this.store$.dispatch(new AddPrintingEdition(form));

    this.cancel();
  }

  cancel() {
    this.dialogRef.close();
  }

  enumsPrinting(value) {
    return Number(value);
  }

  
}
