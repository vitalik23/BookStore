import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {  Store } from '@ngrx/store';
import { UserState } from 'src/app/components/user/store/state/user.state';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserProfile } from 'src/app/components/user/models/user-profile.model';
import { Update } from '../../../store/actions/update.action';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editUserForm: FormGroup;
  user: UserProfile;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userStore$: Store<UserState>,
  )
  {
    this.editUserForm = new FormGroup({
      "firstName": new FormControl("", Validators.required),
      "lastName": new FormControl("", Validators.required),
      "email": new FormControl("", [ Validators.required, Validators.email ]),
      "password": new FormControl("", Validators.required),
      "passwordConfirm": new FormControl("", Validators.required),
     });
  }

  
  ngOnInit(): void {
    this.user = this.data.user;

    this.editUserForm.controls[Constants.FORM_FIRST_NAME].patchValue(this.user?.firstName);
    this.editUserForm.controls[Constants.FORM_LAST_NAME].patchValue(this.user?.lastName);
    this.editUserForm.controls[Constants.FORM_EMAIL].patchValue(this.user?.email);
  }

  save(){
    const user: UserProfile = {
      id: this.user.id,
      firstName: this.editUserForm.controls[Constants.FORM_FIRST_NAME].value,
      lastName: this.editUserForm.controls[Constants.FORM_LAST_NAME].value,
      email: this.editUserForm.controls[Constants.FORM_EMAIL].value,
      password: this.editUserForm.controls[Constants.FORM_FIELD_PASSWORD].value,
      passwordConfirm: this.editUserForm.controls[Constants.FORM_FIELD_PASSWORD_CONFIRM].value,
      isBlocked: this.user.isBlocked,
      roles: this.user.roles,
      currentPassword: null
    };

    this.userStore$.dispatch(new Update(user));
    this.cancel();
  }

  cancel(){
    this.dialogRef.close();
  }

}
