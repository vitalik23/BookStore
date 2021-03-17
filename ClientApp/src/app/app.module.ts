import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/authconfig.interceptor';
import { AuthGuardService } from './guard/auth-guard.service';
import { appReducers } from '../app/store/state/app-state.state';
import { JwtModule } from "@auth0/angular-jwt";
import * as appReducer from '../app/store/reducers/app-reducer.reducer';
import { HeaderComponent } from './components/shared/header/header.component';
import { SharedModule } from './components/shared/shared.module';
import { CreateOrderEffect } from './components/order/store/effects/create-order.effect';
import { ErrorInterceptorService } from './interceptors/error.interceptor.';
import { RefreshTokenEffect } from './components/account/store/effects/refresh-token.effect';
import { Constants } from './constants/constants';
import { clearState } from '../app/store/reducers/app-reducer.reducer';

export function tokenGetter() {
  return localStorage.getItem(Constants.ACCESS_TOKEN);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers, { metaReducers: [clearState] }),
    StoreModule.forFeature(appReducer.appReducer, appReducer.appReducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([CreateOrderEffect, RefreshTokenEffect]),
    StoreRouterConnectingModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.apiUrl],
      }
    }),
    BrowserAnimationsModule,
    FormsModule,
    SharedModule

  ],
  exports: [
  ],
  providers:
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptorService,
        multi: true
      },
      AuthGuardService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
