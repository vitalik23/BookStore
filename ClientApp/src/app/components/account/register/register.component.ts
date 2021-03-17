import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AccountState } from '../store/state/account.state';
import * as registerAction from '../store/actions/register.actions';
import { getError } from 'src/app/store/selectors/base-error.selector';
import { selectMessage } from '../store/selectors/register.selector';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private store$: Store<AccountState>,
  ) {
    this.registerForm = new FormGroup({
      "firstName": new FormControl("", Validators.required),
      "lastName": new FormControl("", Validators.required),
      "email": new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      "password": new FormControl("", Validators.required),
      "passwordConfirm": new FormControl("", Validators.required),

    }, {
      validators: this.checkPasswords
    });
  }

  errorMessage$ = this.store$.pipe(select(getError));
  successMessage$ = this.store$.pipe(select(selectMessage));

  ngOnInit(): void {

    
  }

  signup() {
    let formRegister = this.registerForm.value;

    this.store$.dispatch(new registerAction.Register(formRegister));
  }

  checkPasswords(group: FormGroup) {
    const password = group.get(Constants.FORM_FIELD_PASSWORD).value;
    const confirmPassword = group.get(Constants.FORM_FIELD_PASSWORD_CONFIRM).value;
    return password === confirmPassword ? null : { notSame: true }
  }
}
