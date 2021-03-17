import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import * as reducers from './store/reducers/account.reducers';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { LoginEffects } from './store/effects/login.effects';
import { RegisterComponent } from './register/register.component';
import { RegisterEffect } from './store/effects/register.effects';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ConfirmEmailEffect } from './store/effects/confirm-email.effects';
import { ForgotPasswordEffect } from './store/effects/forgot-password.effects';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RefreshTokenEffect } from './store/effects/refresh-token.effect';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ConfirmEmailComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    StoreModule.forFeature(reducers.accountReducer, reducers.accountReducers),
    EffectsModule.forFeature([LoginEffects, RegisterEffect, ConfirmEmailEffect, ForgotPasswordEffect, RefreshTokenEffect]),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
