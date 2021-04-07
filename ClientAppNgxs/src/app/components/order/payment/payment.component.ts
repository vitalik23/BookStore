import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { ConstField } from 'src/app/constants/fields';
import { OrderItemModel } from '../models/order-item.model';
import { PaymentModel } from '../models/payment.model';
import { CreatePay } from '../store/actions/get-client-orders.action';

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
    private store$: Store,
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
      cardNumber: this.payForm.controls[ConstField.FORM_CARDNUMBER].value,
      cvc: this.payForm.controls[ConstField.FORM_CVC].value,
      description: this.payForm.controls[ConstField.FORM_FIELD_DESCRIPTIONS].value,
      month: this.payForm.controls[ConstField.FORM_MONTH].value,
      value: this.orderItem.totalAmount,
      year: this.payForm.controls[ConstField.FORM_YEAR].value,
      orderId: this.orderItem.id
    };

    this.store$.dispatch(new CreatePay(form));
    this.cancel();
  }

  cancel() {
    this.dialogRef.close();
  }

  continue() {
    window.location.reload();
  }


}
