import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConstField } from 'src/app/constants/fields';
import { CurrencyTypeEnum } from 'src/app/enums/currency-type.enum';
import { PrintingTypeEnum } from 'src/app/enums/printing-type.enum';
import { AuthorModel } from '../../author/models/author.model';
import { PrintingEditionModel } from '../../printing-edition/models/printing-edition.model';
import { GetPrintingEdition } from '../../printing-edition/store/actions/get-printing-edition.action';
import { UpdatePrintingEdition } from '../../printing-edition/store/actions/get-printing-editions.action';
import { GetPrintingEditionState } from '../../printing-edition/store/state/get-printing-edition.state';
import { ListAuthors } from '../store/actions/list-authors.action';
import { ListAuthorsState } from '../store/state/list-authors.state';

@Component({
  selector: 'app-update-printing-edition',
  templateUrl: './update-printing-edition.component.html',
  styleUrls: ['./update-printing-edition.component.scss']
})
export class UpdatePrintingEditionComponent implements OnInit {

  @Select(ListAuthorsState.getAuthors) authors$: Observable<AuthorModel[]>;

  @Select(GetPrintingEditionState.getData) getPrintingEdition$: Observable<PrintingEditionModel>;


  updatePrintingEditionForm: FormGroup;

  printingEdition: PrintingEditionModel;

  keysPrinting: string[];
  printingType = PrintingTypeEnum;


  keysCurrency: string[];
  currencyType = CurrencyTypeEnum;

  id: string;

  constructor(
    private store$: Store,
    public dialogRef: MatDialogRef<UpdatePrintingEditionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.updatePrintingEditionForm = new FormGroup({
      "title": new FormControl(""),
      "description": new FormControl(""),
      "price": new FormControl(""),
      "type": new FormControl(""),
      "authors": new FormControl("")
    });
  }

  ngOnInit(): void {
    this.store$.dispatch(new ListAuthors());

    this.id = this.data.id;

    this.store$.dispatch(new GetPrintingEdition(Number(this.id)));

    this.getPrintingEdition$.subscribe(
      data => {
        this.printingEdition = data;
        this.updatePrintingEditionForm.controls[ConstField.FORM_FIELD_PRICE].patchValue(this.printingEdition?.price);
        this.updatePrintingEditionForm.controls[ConstField.FORM_FIELD_TITLE].patchValue(this.printingEdition?.title);
        this.updatePrintingEditionForm.controls[ConstField.FORM_FIELD_DESCRIPTIONS].patchValue(this.printingEdition?.description);
        this.updatePrintingEditionForm.controls[ConstField.FORM_FIELD_TYPE].patchValue(this.printingEdition?.type.toString());
        this.updatePrintingEditionForm.controls[ConstField.FORM_FIELD_AUTHORS].patchValue(this.printingEdition?.authorsId);
      }
    );

    this.keysCurrency = Object.keys(this.currencyType).filter(Number);
    this.keysPrinting = Object.keys(this.printingType).filter(Number);
  }

  updatePrintingEdition() {

    let form: PrintingEditionModel = {
      id: Number(this.id),
      authorsId: this.updatePrintingEditionForm.controls[ConstField.FORM_FIELD_AUTHORS].value,
      currency: CurrencyTypeEnum.USD,
      description: this.updatePrintingEditionForm.controls[ConstField.FORM_FIELD_DESCRIPTIONS].value,
      price: this.updatePrintingEditionForm.controls[ConstField.FORM_FIELD_PRICE].value,
      type: this.enumsPrinting(this.updatePrintingEditionForm.controls[ConstField.FORM_FIELD_TYPE].value),
      title: this.updatePrintingEditionForm.controls[ConstField.FORM_FIELD_TITLE].value,
      authorInPrintingEdition: null
    }

    this.store$.dispatch(new UpdatePrintingEdition(form));
    this.cancel();
  }

  cancel(){
    this.dialogRef.close();
  }

  enumsPrinting(value) {
    return Number(value);
  }

}
