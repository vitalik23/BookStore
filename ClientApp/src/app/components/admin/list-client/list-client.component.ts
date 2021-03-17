import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UserProfile } from '../../user/models/user-profile.model';
import { BlockUnBlockUser } from '../store/actions/block.action';
import { DeleteUser } from '../store/actions/delete.action';
import { GetClientList } from '../store/actions/list-client.action';
import { getData, getPageNumber, getPageSize, getTotalItems } from '../store/selectors/list-client.selector';
import { AdminState } from '../store/state/admin.state';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditUserComponent } from './dialog/edit-user/edit-user.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserFilter } from '../models/user-filter.model';
import { Constants } from 'src/app/constants/constants';


@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {

  checkboxForm: FormGroup;

  clients: UserProfile[];

  userName: string;

  isBlocked: boolean;

  pageNumber: number;
  pageSize: number;
  totalItems: number;

  filter: UserFilter;

  constructor(
    private store$: Store<AdminState>,
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {
    this.checkboxForm = this.formBuilder.group({
      userIsBlockedFalse: false,
      userIsBlockedTrue: false
    });
  }

  ngOnInit(): void {

    this.store$.pipe(select(getPageNumber)).subscribe(
      data => {
        this.pageNumber = data;
      }
    );

    this.store$.pipe(select(getPageSize)).subscribe(
      data => {
        this.pageSize = data;
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


    this.store$.pipe(select(getData)).subscribe(
      data => {
        this.clients = data;
      }
    );

    this.store$.pipe(select(getTotalItems)).subscribe(
      data => {
        this.totalItems = data;
      }
    );

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
    if (this.checkboxForm.get(Constants.FORM_FIELD_USER_IS_BLOCKED_TRUE).value) {
      this.isBlocked = true;
    }
    if (this.checkboxForm.get(Constants.FORM_FIELD_USER_IS_BLOCKED_FALSE).value) {
      this.isBlocked = false;
    }
    if (this.checkboxForm.get(Constants.FORM_FIELD_USER_IS_BLOCKED_TRUE).value && this.checkboxForm.get(Constants.FORM_FIELD_USER_IS_BLOCKED_FALSE).value) {
      this.isBlocked = null;
    }
    if (!this.checkboxForm.get(Constants.FORM_FIELD_USER_IS_BLOCKED_TRUE).value && !this.checkboxForm.get(Constants.FORM_FIELD_USER_IS_BLOCKED_FALSE).value) {
      this.isBlocked = null;
    }
    return this.isBlocked;
  }

  deleteUser(id) {
    this.store$.dispatch(new DeleteUser(id));

  }

  editUser(user: UserProfile) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { user };
    this.matDialog.open(EditUserComponent, dialogConfig);
  }

  blockUnBlock(user: UserProfile) {
    this.store$.dispatch(new BlockUnBlockUser(user.id));

    setTimeout(() => {
      this.filtering();
    }, Constants.TIMEOUT);
  }



}
