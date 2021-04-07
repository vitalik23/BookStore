import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { CurrencyTypeEnum } from 'src/app/enums/currency-type.enum';
import { PrintingTypeEnum } from 'src/app/enums/printing-type.enum';
import { MatDialogRef } from '@angular/material/dialog';
import { PrintingEditionModel } from '../../printing-edition/models/printing-edition.model';
import { ConstShared } from 'src/app/constants/shared';
import { ConstField } from 'src/app/constants/fields';
import { ListAuthorsState } from '../store/state/list-authors.state';
import { Observable } from 'rxjs';
import { AuthorModel } from '../../author/models/author.model';
import { ListAuthors } from '../store/actions/list-authors.action';
import { AddPrintingEdition } from '../../printing-edition/store/actions/get-printing-editions.action';


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

  @Select(ListAuthorsState.getAuthors) authors$: Observable<AuthorModel[]>;

  constructor(
    private store$: Store,
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

  ngOnInit(): void {

    this.store$.dispatch(new ListAuthors());

    this.keysCurrency = Object.keys(this.currencyType).filter(Number);
    this.keysPrinting = Object.keys(this.printingType).filter(Number);
  }


  addPrintingEdition() {

    let form: PrintingEditionModel = {
      id: ConstShared.START_VALUE,
      authorsId: this.addPrintingEditionForm.controls[ConstField.FORM_FIELD_AUTHORS].value,
      currency: CurrencyTypeEnum.USD,
      description: this.addPrintingEditionForm.controls[ConstField.FORM_FIELD_DESCRIPTIONS].value,
      price: this.addPrintingEditionForm.controls[ConstField.FORM_FIELD_PRICE].value,
      type: this.enumsPrinting(this.addPrintingEditionForm.controls[ConstField.FORM_FIELD_TYPE].value),
      title: this.addPrintingEditionForm.controls[ConstField.FORM_FIELD_TITLE].value,
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
