import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';
import { ConstRoutes } from '../constants/routes';
import { AccountService } from '../services/account.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        private jwtHelper: JwtHelperService,
        private accountService: AccountService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
     
        const accessToken = this.accountService.getAccessToken();
        const refreshToken = this.accountService.getRefreshToken();
        if(this.jwtHelper.isTokenExpired(accessToken) && refreshToken == null){
            window.location.href = ConstRoutes.ROUTE_LOGIN;
            return false;
        }
        return true;
    }
}