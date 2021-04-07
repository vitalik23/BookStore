import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConstField } from 'src/app/constants/fields';
import { Register } from '../store/actions/register.action';
import { RegisterState } from '../store/state/register.state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  @Select(RegisterState.getMessage) successMessage$: Observable<string>;
  
  constructor(private store: Store) 
  {
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

  ngOnInit(): void {
  }

  checkPasswords(group: FormGroup) {
    const password = group.get(ConstField.FORM_FIELD_PASSWORD).value;
    const confirmPassword = group.get(ConstField.FORM_FIELD_PASSWORD_CONFIRM).value;
    return password === confirmPassword ? null : { notSame: true }
  }

  signup(){
    let formRegister = this.registerForm.value;

    this.store.dispatch(new Register(formRegister));
  }
}
