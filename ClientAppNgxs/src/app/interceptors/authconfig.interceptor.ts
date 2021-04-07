import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AccountService } from "../services/account.service";
import { ConstShared } from '../constants/shared';
@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.accountService.getAccessToken();
        req = req.clone({
            setHeaders: {
                Authorization: `${ConstShared.BEARER}${authToken}`
            }
        });
        return next.handle(req);
    }
}
