import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderItemModel } from '../components/order/models/order-item.model';
import { Observable } from 'rxjs';
import { PaymentModel } from '../components/order/models/payment.model';
import { PageQuery } from 'src/app/models/page/page-query.model';
import { PageResponse } from 'src/app/models/page/page-response.model';
import { OrdersFilter } from '../components/order/models/filter-orders.model';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    constructor(
        private http: HttpClient
    )
    {}

    getOrdersClient(pagination: PageQuery): Observable<PageResponse>{
                                
        return this.http.post<PageResponse>(`${environment.apiUrl}${Constants.GET_USER_ORDERS}`, pagination );
    }

    getOrders(PaginationFilterModels: PageQuery, OrderFilterModels: OrdersFilter): Observable<PageResponse>{
                      
        return this.http.post<PageResponse>(`${environment.apiUrl}${Constants.GET_ORDERS}`, { OrderFilterModels, PaginationFilterModels });
    }

    createOrder(model: OrderItemModel[]){
        return this.http.post(`${environment.apiUrl}${Constants.CREATE_ORDER}`, model);
    }

    payOrder(model: PaymentModel){
        return this.http.post(`${environment.apiUrl}${Constants.BUY_ORDER}`, model)
    }
}