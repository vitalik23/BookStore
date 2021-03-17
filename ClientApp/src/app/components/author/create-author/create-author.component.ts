import { Component, Inject, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import {  Store } from '@ngrx/store';
import { CreateAuthor } from '../store/actions/create-author.action';
import { AuthorState } from '../store/state/author.state';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";



@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss']
})
export class CreateAuthorComponent implements OnInit {

  createAuthorForm: FormGroup;

  constructor(
    private store$: Store<AuthorState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateAuthorComponent>,
  ) {
    this.createAuthorForm = new FormGroup({
      "name": new FormControl("", Validators.required)
    });
  }

  ngOnInit(): void {
  
  }

  create() {
    let form = this.createAuthorForm.value;

    this.store$.dispatch(new CreateAuthor(form));
    this.cancel();
  }

  cancel() {
    this.dialogRef.close();
  }

}
