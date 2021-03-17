import { Component, OnInit } from '@angular/core';
import { UserState } from '../store/state/user.state';
import { select, Store } from '@ngrx/store';
import { selectProfileModel } from '../store/selectors/profile.selector';
import { EditUser, GetUser } from '../store/actions/profile.actions';
import { UserProfile } from '../models/user-profile.model';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserProfile;

  editForm: FormGroup;

  isEdit: boolean;

  constructor
    (
      private userStore$: Store<UserState>,
  ) {
    this.editForm = new FormGroup({
      "firstName": new FormControl("", Validators.required),
      "lastName": new FormControl("", Validators.required),
      "email": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", Validators.required),
      "passwordConfirm": new FormControl("", Validators.required),
      "currentPassword": new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
    this.userStore$.dispatch(new GetUser());

    this.userStore$.pipe(select(selectProfileModel)).subscribe(
      data => {
        this.user = data;
        this.editForm.controls[Constants.FORM_FIRST_NAME].patchValue(this.user?.firstName);
        this.editForm.controls[Constants.FORM_LAST_NAME].patchValue(this.user?.lastName);
        this.editForm.controls[Constants.FORM_EMAIL].patchValue(this.user?.email);
      }
    )
  }

  edit() {
    this.isEdit = true;
  }

  save() {
    

    let password = this.editForm.get("password").value;
    let currentPassword = this.editForm.get("currentPassword").value;
    if(currentPassword == "" && password != ""){
        alert("Error");
        return;
    }
    let edit = this.editForm.value;

    this.userStore$.dispatch(new EditUser(edit));

    this.cancel();
  }

  cancel() {
    this.isEdit = false;
  }

}
