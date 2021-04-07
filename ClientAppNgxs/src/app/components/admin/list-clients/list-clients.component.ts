import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConstField } from 'src/app/constants/fields';
import { SpinnerState } from 'src/app/store/state/spinner.state';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';
import { UserModel } from '../../user/models/user.model';
import { UserFilterModel } from '../models/user-filter.model';
import { DeleteUser, GetClientList } from '../store/actions/list-client.action';
import { GetClientListState } from '../store/state/list-client.state';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss']
})
export class ListClientsComponent implements OnInit {

  @Select(GetClientListState.getData) dataClients: Observable<UserModel[]>;
  @Select(GetClientListState.getPageNumber) numberPage: Observable<number>;
  @Select(GetClientListState.getPageSize) sizePage: Observable<number>;
  @Select(GetClientListState.getTotalItems) totalClients: Observable<number>;
  @Select(SpinnerState.isShowingSpinner) isSpinnerShow: Observable<boolean>;


  checkboxForm: FormGroup;

  clients: UserModel[];

  userName: string;

  isBlocked: boolean;

  pageNumber: number;
  pageSize: number;
  totalItems: number;

  filter: UserFilterModel;

  constructor(
    private store$: Store,
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {
    this.checkboxForm = this.formBuilder.group({
      userIsBlockedFalse: false,
      userIsBlockedTrue: false
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

    this.numberPage.subscribe(
      data => {
        this.pageNumber = data;
      }
    );

    this.sizePage.subscribe(
      data => {
        this.pageSize = data;
      }
    );

    this.totalClients.subscribe(
      data => {
        this.totalItems = data;
      }
    );

    this.dataClients.subscribe(
      data => {
        this.clients = data;
      }
    );

    this.store$.dispatch(new GetClientList({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    },
      this.filter = {
        isBlocked: null,
        userName: null
      }
    ));
    
  }

  pagedChanged(event) {
   
    this.pageNumber = event;

    this.store$.dispatch(new GetClientList({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    },
      this.filter = this.filter));
  }

  filtering() {
    
    this.checkUserName();
    this.CheckboxFilter();
    this.filter = {
      userName: this.userName,
      isBlocked: this.isBlocked
    };
    this.store$.dispatch(new GetClientList({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    },
      this.filter = this.filter
    ));

  }

  checkUserName() {
    if (this.userName === '') {
      this.userName = null;
    }
  }
  
  CheckboxFilter() {
    if (this.checkboxForm.get(ConstField.FORM_FIELD_USER_IS_BLOCKED_TRUE).value) {
      this.isBlocked = true;
    }
    if (this.checkboxForm.get(ConstField.FORM_FIELD_USER_IS_BLOCKED_FALSE).value) {
      this.isBlocked = false;
    }
    if (this.checkboxForm.get(ConstField.FORM_FIELD_USER_IS_BLOCKED_TRUE).value && this.checkboxForm.get(ConstField.FORM_FIELD_USER_IS_BLOCKED_FALSE).value) {
      this.isBlocked = null;
    }
    if (!this.checkboxForm.get(ConstField.FORM_FIELD_USER_IS_BLOCKED_TRUE).value && !this.checkboxForm.get(ConstField.FORM_FIELD_USER_IS_BLOCKED_FALSE).value) {
      this.isBlocked = null;
    }
    return this.isBlocked;
  }

  deleteUser(id) {
    this.store$.dispatch(new DeleteUser(id));

  }

  editUser(user: UserModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { user };
    this.matDialog.open(EditUserComponent, dialogConfig);
  }

  blockUnBlock(user: UserModel) {
    //this.store$.dispatch(new BlockUnBlockUser(user.id));

    // setTimeout(() => {
    //   this.filtering();
    // }, Constants.TIMEOUT);
  }

  openDialog(){
    this.matDialog.open(ProgressBarComponent);
  }

  closeDialog(){
    this.matDialog.closeAll();
  }

}
