import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Constants } from 'src/app/constants/constants';
import { AppState } from 'src/app/store/state/app-state.state';
import { OrderItemModel } from '../models/order-item.model';
import { PaymentComponent } from '../payment/payment.component';
import { GetOrdersClient } from '../store/actions/get-orders-client.action';
import { getOrderItem, getPageNumber, getPageSize, getTotalItems } from '../store/selectors/get-orders-client.selector';

@Component({
  selector: 'app-clients-order',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit {

  orderItems: OrderItemModel[];

  pageNumber: number;
  pageSize: number;
  totalItems: number;

  constructor(
    private store$: Store<AppState>,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {


    this.store$.pipe(select(getOrderItem)).subscribe(
      data => {
        this.orderItems = data;
        
      }
    );

    this.store$.pipe(select(getTotalItems)).subscribe(
      data => {
        this.totalItems = data;
      }
    );

    this.store$.pipe(select(getPageNumber)).subscribe(
      data => {
        this.pageNumber = data;
      }
    );

    this.store$.pipe(select(getPageSize)).subscribe(
      data => {
        this.pageSize = data;
      }
    );

    this.store$.dispatch(new GetOrdersClient({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }));

  }


  pagedChanged(event) {
    this.pageNumber = event;

    this.store$.dispatch(new GetOrdersClient({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }));
  }

  pay(data: OrderItemModel) {
    const dialogConfig: MatDialogConfig = {
      width: Constants.STYLE_WIDTH
    };

    dialogConfig.data = { data };

    this.matDialog.open(PaymentComponent, dialogConfig);
  }

}
