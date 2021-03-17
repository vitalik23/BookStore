import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as loginActions from '../store/actions/login.actions';
import { getError } from 'src/app/store/selectors/base-error.selector';
import { AppState } from 'src/app/store/state/app-state.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private store$: Store<AppState>,
  ) {
    this.loginForm = new FormGroup({
      "email": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", Validators.required),
      "rememberMe": new FormControl(false)
    });

  }

  errorMessage$ = this.store$.pipe(select(getError));

  ngOnInit(): void {
    
  }

  signin() {
    let login = this.loginForm.value;

    this.store$.dispatch(new loginActions.LogIn(login));
  }

}
