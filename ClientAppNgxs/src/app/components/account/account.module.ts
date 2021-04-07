import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { SignInComponent } from './signin/signin.component';
import { AccountService } from '../../services/account.service';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './store/state/auth.state';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RegisterState } from './store/state/register.state';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordState } from './store/state/forgot-password.state';
import { ConfirmEmailState } from './store/state/confirm-email.state';




@NgModule({
  declarations: [ SignInComponent, RegisterComponent, ConfirmEmailComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([AuthState, RegisterState, ForgotPasswordState, ConfirmEmailState]),
  ],
  providers: [ AccountService ]
})
export class AccountModule { }
