import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Constants } from 'src/app/constants/constants';
import { AuthData } from 'src/app/models/auth-data.model';
import { AccountService } from '../../../service/account.service';
import { CartComponent } from '../../order/cart/cart.component';
import { OrderItemModel } from '../../order/models/order-item.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app-state.state';
import { RefreshToken } from '../../account/store/actions/refresh-token.action';
import { Logout } from '../../account/store/actions/login.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private matDialog: MatDialog,
    private jwtHelper: JwtHelperService,
    private accountService: AccountService,
    private store$: Store<AppState>
  ) { }

  accessToken: string = this.accountService.getAccessToken();

  authData: AuthData = this.jwtHelper.decodeToken(this.accessToken);

  role: string;

  isAdmin: boolean;
  client: boolean;

  login: boolean = true;

  countElementInCart: number = Constants.START_VALUE;
  product: OrderItemModel[];

  ngOnInit(): void {


    if (!this.jwtHelper.isTokenExpired(this.accessToken)) {

      this.login = true;

      this.role = this.authData[Constants.GET_ROLE];

      if (this.role === Constants.ADMIN) {
        this.isAdmin = true;
        this.client = false;
      }
      if(this.role != Constants.ADMIN) {
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
      width: Constants.STYLE_WIDTH_WINDOW
    };
    this.matDialog.open(CartComponent, dialogConfig);
  }

  logout() {
    this.store$.dispatch(new Logout());
  }

}
