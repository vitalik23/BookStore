import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Constants } from 'src/app/constants/constants';
import { AppState } from 'src/app/store/state/app-state.state';
import { OrderItemModel } from '../models/order-item.model';
import { PaymentModel } from '../models/payment.model';
import { CreatePay } from '../store/actions/create-pay.action';

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
    private store$: Store<AppState>
  ) {
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

    this.store$.dispatch(new CreatePay(form));

    this.windowSuccess = true;

  }

  cancel() {
    this.dialogRef.close();
  }

  continue() {
    window.location.reload();
  }

}
