import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AccountState } from '../store/state/account.state';
import { ForgotPassword } from '../store/actions/forgot-password.actions';
import { selectMessage } from '../store/selectors/forgot-password.selector';
import { getError } from 'src/app/store/selectors/base-error.selector';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;

  constructor
    (
      private store$: Store<AccountState>,
  ) {
    this.forgotForm = new FormGroup({
      "email": new FormControl("", Validators.required)
    });
  }

  errorMessages$ = this.store$.select(getError);
  successMessage$ = this.store$.select(selectMessage);

  ngOnInit(): void {

  }

  forgotPassword() {

    let forgot = this.forgotForm.value;

    this.store$.dispatch(new ForgotPassword(forgot));
  }
}
