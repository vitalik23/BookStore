import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { UserModel } from 'src/app/components/user/models/user.model';
import { ConstField } from 'src/app/constants/fields';
import { UpdateUser } from '../../store/actions/list-client.action';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {


  editUserForm: FormGroup;
  user: UserModel;


  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userStore$: Store,
  ) { 
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

    this.editUserForm.controls[ConstField.FORM_FIRST_NAME].patchValue(this.user?.firstName);
    this.editUserForm.controls[ConstField.FORM_LAST_NAME].patchValue(this.user?.lastName);
    this.editUserForm.controls[ConstField.FORM_EMAIL].patchValue(this.user?.email);
  }

  save(){
    const user: UserModel = {
      id: this.user.id,
      firstName: this.editUserForm.controls[ConstField.FORM_FIRST_NAME].value,
      lastName: this.editUserForm.controls[ConstField.FORM_LAST_NAME].value,
      email: this.editUserForm.controls[ConstField.FORM_EMAIL].value,
      password: this.editUserForm.controls[ConstField.FORM_FIELD_PASSWORD].value,
      passwordConfirm: this.editUserForm.controls[ConstField.FORM_FIELD_PASSWORD_CONFIRM].value,
      isBlocked: this.user.isBlocked,
      roles: this.user.roles,
      currentPassword: null
    };

    this.userStore$.dispatch(new UpdateUser(user));
    this.cancel();
  }

  cancel(){
    this.dialogRef.close();
  }

}
