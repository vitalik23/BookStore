import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionsSubject, Store } from '@ngrx/store';
import { Constants } from 'src/app/constants/constants';
import { AppState } from 'src/app/store/state/app-state.state';
import { OrderItemModel } from '../models/order-item.model';
import { PaymentModel } from '../models/payment.model';
import * as actions from '../store/actions/create-pay.action';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  orderItem: OrderItemModel;

  payForm: FormGroup;

  windowSuccess: boolean;

  constructor(
    public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store$: Store<AppState>,
    actionsSubject: ActionsSubject,
  ) {

    actionsSubject.pipe(
      ofType(actions.CreatePayEnum.CreatePaySuccess))
      .subscribe(_ => {
       this.windowSuccess = true;
      }
    );

    this.payForm = new FormGroup({
      "description": new FormControl(""),
      "cardnumber": new FormControl(""),
      "month": new FormControl(""),
      "year": new FormControl(""),
      "cvc": new FormControl(""),
    });
  }

  ngOnInit(): void {
    this.orderItem = this.data.data;
  }

  createPay() {
    let form: PaymentModel = {
      cardNumber: this.payForm.controls[Constants.FORM_CARDNUMBER].value,
      cvc: this.payForm.controls[Constants.FORM_CVC].value,
      description: this.payForm.controls[Constants.FORM_FIELD_DESCRIPTIONS].value,
      month: this.payForm.controls[Constants.FORM_MONTH].value,
      value: this.orderItem.totalAmount,
      year: this.payForm.controls[Constants.FORM_YEAR].value,
      orderId: this.orderItem.id
    };

    this.store$.dispatch(new actions.CreatePay(form));
  }

  cancel() {
    this.dialogRef.close();
  }

  continue() {
    window.location.reload();
  }

}

