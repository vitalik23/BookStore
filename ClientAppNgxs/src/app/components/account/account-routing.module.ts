import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './signin/signin.component';

const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
