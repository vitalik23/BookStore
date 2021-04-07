import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AccountService } from 'src/app/services/account.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart.service';
import { AuthData } from '../../account/models/auth-data.model';
import { ConstShared } from 'src/app/constants/shared';
import { OrderItemModel } from '../../order/models/order-item.model';
import { SignOut, RefreshToken } from '../../account/store/actions/auth.action';
import { CartComponent } from '../../order/cart/cart.component';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  accessToken: string = this.accountService.getAccessToken();

  authData: AuthData = this.jwtHelper.decodeToken(this.accessToken);

  role: string;

  isAdmin: boolean;
  client: boolean;

  login: boolean = true;

  countElementInCart: number = ConstShared.START_VALUE;
  product: OrderItemModel[];


  constructor(
    private matDialog: MatDialog,
    private jwtHelper: JwtHelperService,
    private accountService: AccountService,
    private store$: Store,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {

    this.countElement();

    if (!this.jwtHelper.isTokenExpired(this.accessToken)) {

      this.login = true;

      this.role = this.authData[ConstShared.GET_ROLE];

      if (this.role === ConstShared.ADMIN) {
        this.isAdmin = true;
        this.client = false;
      }
      if(this.role != ConstShared.ADMIN) {
        this.client = true;
        this.isAdmin = false;
      }
    }
    if(this.jwtHelper.isTokenExpired(this.accessToken)) {
      const refreshToken = this.accountService.getRefreshToken();
      if (refreshToken != "" && refreshToken != null) {
        this.store$.dispatch(new RefreshToken({accessToken: this.accessToken, refreshToken: refreshToken}));
      }

      this.login = false;
    }
  }

  showCart() {
    const dialogConfig: MatDialogConfig = {
      width: ConstShared.STYLE_WIDTH_WINDOW
    };
    this.matDialog.open(CartComponent, dialogConfig);
  }

  logout() {
    this.store$.dispatch(new SignOut());
  }

  countElement(){
    this.product = this.cartService.getItems();

    if(this.product != null){
      this.countElementInCart = this.product.length;
    }
  }

}
