import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ForgotPassword } from '../store/actions/forgot-password.action';
import { ForgotPasswordState } from '../store/state/forgot-password.state';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @Select(ForgotPasswordState.getMessage) successMessage$: Observable<string>;

  forgotForm: FormGroup;

  constructor(
    private store$: Store
  ) {
    this.forgotForm = new FormGroup({
      "email": new FormControl("", Validators.email)
    });
   }

  ngOnInit(): void {
  }

  forgotPassword() {

    let forgot = this.forgotForm.value;

    this.store$.dispatch(new ForgotPassword(forgot));
  }

}
