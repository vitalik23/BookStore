import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConstShared } from 'src/app/constants/shared';
import { SpinnerState } from 'src/app/store/state/spinner.state';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';
import { OrderItemModel } from '../models/order-item.model';
import { PaymentComponent } from '../payment/payment.component';
import { GetClientOrders } from '../store/actions/get-client-orders.action';
import { GetClientOrdersState } from '../store/state/get-client-orders.state';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit {

  @Select(GetClientOrdersState.getData) dataClientOrders: Observable<OrderItemModel[]>;
  @Select(GetClientOrdersState.getPageNumber) numberPage: Observable<number>;
  @Select(GetClientOrdersState.getPageSize) sizePage: Observable<number>;
  @Select(GetClientOrdersState.getTotalItems) totalClientOrders: Observable<number>;
  @Select(SpinnerState.isShowingSpinner) isSpinnerShow: Observable<boolean>;


  orderItems: OrderItemModel[];

  pageNumber: number;
  pageSize: number;
  totalItems: number;

  constructor(
    private store$: Store,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.isSpinnerShow.subscribe(
      data => {
        if(data){
          return this.openDialog();
        }
        this.closeDialog();
      }
    );

    this.numberPage.subscribe(
      data => {
        this.pageNumber = data;
      }
    );

    this.sizePage.subscribe(
      data => {
        this.pageSize = data;
      }
    );

    this.totalClientOrders.subscribe(
      data => {
        this.totalItems = data;
      }
    );

    this.dataClientOrders.subscribe(
      data => {
        this.orderItems = data;
      }
    );

    this.store$.dispatch(new GetClientOrders({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }));
  }

  openDialog(){
    this.matDialog.open(ProgressBarComponent);
  }

  closeDialog(){
    this.matDialog.closeAll();
  }

  pagedChanged(event) {
    this.pageNumber = event;

    this.store$.dispatch(new GetClientOrders({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }));
  }

  pay(data: OrderItemModel) {
    const dialogConfig: MatDialogConfig = {
      width: ConstShared.STYLE_WIDTH
    };

    dialogConfig.data = { data };

    this.matDialog.open(PaymentComponent, dialogConfig);
  }

}
