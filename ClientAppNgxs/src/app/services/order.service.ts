import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrdersFilterModel } from '../components/order/models/order-filter.model';
import { OrderItemModel } from '../components/order/models/order-item.model';
import { PaymentModel } from '../components/order/models/payment.model';
import { ConstRoutes } from '../constants/routes';
import { PageQuery } from '../models/page-query';
import { PageResponse } from '../models/page-responce';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
)
{}

getOrdersClient(pagination: PageQuery){
                            
    return this.http.post<PageResponse>(`${environment.apiUrl}${ConstRoutes.GET_USER_ORDERS}`, pagination );
}

getOrders(PaginationFilterModels: PageQuery, OrderFilterModels: OrdersFilterModel){
                  
    return this.http.post<PageResponse>(`${environment.apiUrl}${ConstRoutes.GET_ORDERS}`, { OrderFilterModels, PaginationFilterModels });
}

createOrder(model: OrderItemModel[]){
    return this.http.post<OrderItemModel>(`${environment.apiUrl}${ConstRoutes.CREATE_ORDER}`, model);
}

payOrder(model: PaymentModel){
    return this.http.post<OrderItemModel>(`${environment.apiUrl}${ConstRoutes.BUY_ORDER}`, model)
}
}
