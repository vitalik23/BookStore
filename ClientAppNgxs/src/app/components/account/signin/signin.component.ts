import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SignIn, SignOut } from '../store/actions/auth.action';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "email": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", Validators.required),
      "rememberMe": new FormControl(false)
    });
  }


  signin() {
    let form = this.loginForm.value;
    this.store.dispatch(new SignIn(form));
  }

  signOut(){
    this.store.dispatch(new SignOut());
  }

}
