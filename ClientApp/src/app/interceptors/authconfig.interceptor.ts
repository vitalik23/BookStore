import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Constants } from '../constants/constants';
import { AccountService } from '../service/account.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.accountService.getAccessToken();
        req = req.clone({
            setHeaders: {
                Authorization: `${Constants.BEARER}${authToken}`
            }
        });
        return next.handle(req);
    }
}
