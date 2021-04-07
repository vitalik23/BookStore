import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConstField } from 'src/app/constants/fields';
import { ConstShared } from 'src/app/constants/shared';
import { StatusTypeEnum } from 'src/app/enums/status-type.enum';
import { SpinnerState } from 'src/app/store/state/spinner.state';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';
import { OrdersFilterModel } from '../models/order-filter.model';
import { OrderItemModel } from '../models/order-item.model';
import { GetOrders } from '../store/actions/get-orders.action';
import { GetOrdersState } from '../store/state/get-orders.state';

@Component({
  selector: 'app-get-orders',
  templateUrl: './get-orders.component.html',
  styleUrls: ['./get-orders.component.scss']
})
export class GetOrdersComponent implements OnInit {

  @Select(GetOrdersState.getData) dataOrders: Observable<OrderItemModel[]>;
  @Select(GetOrdersState.getPageNumber) numberPage: Observable<number>;
  @Select(GetOrdersState.getPageSize) sizePage: Observable<number>;
  @Select(GetOrdersState.getTotalItems) totalOrders: Observable<number>;
  @Select(SpinnerState.isShowingSpinner) isSpinnerShow: Observable<boolean>;


  checkboxForm: FormGroup;

  orderItems: OrderItemModel[];

  filter: OrdersFilterModel;

  pageNumber: number;
  pageSize: number;
  totalItems: number;

  sortBy: string;
  typeSort: string;
  status: StatusTypeEnum;

  constructor(
    private store$: Store,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog
  ) { 
    this.checkboxForm = this.formBuilder.group({
      paid: false,
      unpaid: false,
    });
  }

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

    this.totalOrders.subscribe(
      data => {
        this.totalItems = data;
      }
    );

    this.dataOrders.subscribe(
      data => {
        this.orderItems = data;
      }
    );

    this.store$.dispatch(new GetOrders({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    },
      this.filter = {
        sortBy: null,
        status: null,
        typeSort: null
      }
    ));
  }

  openDialog(){
    this.matDialog.open(ProgressBarComponent);
  }

  closeDialog(){
    this.matDialog.closeAll();
  }

  pagedChanged(event) {

    this.pageNumber = event;

    this.store$.dispatch(new GetOrders({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    },
      this.filter = this.filter));
  }

  filterOrder() {
    this.filterCheckbox();
    this.filter = {
      sortBy: this.sortBy,
      status: this.status,
      typeSort: this.typeSort
    }
    this.store$.dispatch(new GetOrders({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    },
      this.filter = this.filter));
  }

  sorting(sort: string) {
    this.sortBy = sort;
    this.typeSort = this.typeSort === ConstShared.SORT_DESC ? ConstShared.SORT_ASC : ConstShared.SORT_DESC;
    this.filterOrder();
  }

  filterCheckbox() {
    if (this.checkboxForm.get(ConstField.FORM_PAID).value) {
      this.status = StatusTypeEnum.Paid;
    }
    if (this.checkboxForm.get(ConstField.FORM_UNPAID).value) {
      this.status = StatusTypeEnum.Unpaid;
    }
    if (this.checkboxForm.get(ConstField.FORM_PAID).value && this.checkboxForm.get(ConstField.FORM_UNPAID).value) {
      this.status = null;
    }
    if (!this.checkboxForm.get(ConstField.FORM_PAID).value && !this.checkboxForm.get(ConstField.FORM_UNPAID).value) {
      this.status = null;
    }
    return this.status;
  }

}
