import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Constants } from 'src/app/constants/constants';
import { StatusTypeEnum } from 'src/app/enums/status.enum';
import { AppState } from 'src/app/store/state/app-state.state';
import { OrdersFilter } from '../models/filter-orders.model';
import { OrderItemModel } from '../models/order-item.model';
import { GetOrders } from '../store/actions/get-orders.action';
import { getData, getPageNumber, getPageSize, getTotalItems } from '../store/selectors/get-orders.selector';

@Component({
  selector: 'app-get-orders',
  templateUrl: './get-orders.component.html',
  styleUrls: ['./get-orders.component.scss']
})
export class GetOrdersComponent implements OnInit {

  checkboxForm: FormGroup;

  orderItems: OrderItemModel[];

  filter: OrdersFilter;

  pageNumber: number;
  pageSize: number;
  totalItems: number;

  sortBy: string;
  typeSort: string;
  status: StatusTypeEnum;

  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder,
  ) {
    this.checkboxForm = this.formBuilder.group({
      paid: false,
      unpaid: false,
    });
  }

  ngOnInit(): void {

    this.store$.pipe(select(getData)).subscribe(
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
    this.typeSort = this.typeSort === Constants.SORT_DESC ? Constants.SORT_ASC : Constants.SORT_DESC;
    this.filterOrder();
  }

  filterCheckbox() {
    if (this.checkboxForm.get(Constants.FORM_PAID).value) {
      this.status = StatusTypeEnum.Paid;
    }
    if (this.checkboxForm.get(Constants.FORM_UNPAID).value) {
      this.status = StatusTypeEnum.Unpaid;
    }
    if (this.checkboxForm.get(Constants.FORM_PAID).value && this.checkboxForm.get(Constants.FORM_UNPAID).value) {
      this.status = null;
    }
    if (!this.checkboxForm.get(Constants.FORM_PAID).value && !this.checkboxForm.get(Constants.FORM_UNPAID).value) {
      this.status = null;
    }
    return this.status;
  }

  
}
