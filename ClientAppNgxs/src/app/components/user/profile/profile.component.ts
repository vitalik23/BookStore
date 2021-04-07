import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConstField } from 'src/app/constants/fields';
import { ConstShared } from 'src/app/constants/shared';
import { UpdateUser } from '../../admin/store/actions/list-client.action';
import { UserModel } from '../models/user.model';
import { GetUser } from '../store/actions/get-user.action';
import { GetUserState } from '../store/state/get-user.state';
import * as alertify from 'alertifyjs';
import { SpinnerState } from 'src/app/store/state/spinner.state';
import { MatDialog } from '@angular/material/dialog';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Select(GetUserState.getUser) getUser: Observable<UserModel>;
  @Select(SpinnerState.isShowingSpinner) isSpinnerShow: Observable<boolean>;


  user: UserModel;

  editForm: FormGroup;

  isEdit: boolean;

  constructor(
    private store$: Store,
    private matDialog: MatDialog,
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

    this.isSpinnerShow.subscribe(
      data => {
        if(data){
          return this.openDialog();
        }
        this.closeDialog();
      }
    );

    this.store$.dispatch(new GetUser());

    this.getUser.subscribe(
      data => {
        this.user = data;
        this.editForm.controls[ConstField.FORM_FIRST_NAME].patchValue(this.user?.firstName);
        this.editForm.controls[ConstField.FORM_LAST_NAME].patchValue(this.user?.lastName);
        this.editForm.controls[ConstField.FORM_EMAIL].patchValue(this.user?.email);
      }
    )
  }

  edit() {
    this.isEdit = true;
  }

  save() {
    let password = this.editForm.get(ConstField.FORM_FIELD_PASSWORD).value;
    let currentPassword = this.editForm.get(ConstField.FORM_CURRENT_PASSWORD).value;
    if(currentPassword == "" && password != ""){
        alertify.error(ConstShared.PLEASE_ENTER_OLD_PASSWORD);
        return;
    }
    let edit = this.editForm.value;

    this.store$.dispatch(new UpdateUser(edit));

    this.cancel();
  }

  cancel() {
    this.isEdit = false;
  }

  openDialog(){
    this.matDialog.open(ProgressBarComponent);
  }

  closeDialog(){
    this.matDialog.closeAll();
  }

}
