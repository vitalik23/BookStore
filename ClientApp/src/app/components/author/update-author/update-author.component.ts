import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {  Store } from '@ngrx/store';
import { Constants } from 'src/app/constants/constants';
import { AppState } from 'src/app/store/state/app-state.state';
import { AuthorModel } from '../models/author.model';
import { UpdateAuthor } from '../store/actions/update-author.action';

@Component({
  selector: 'app-update-author',
  templateUrl: './update-author.component.html',
  styleUrls: ['./update-author.component.scss']
})
export class UpdateAuthorComponent implements OnInit {

  updateAuthorForm: FormGroup;
  id: string;
  author: AuthorModel;

  constructor(
    private store$: Store<AppState>,
    private activateRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateAuthorComponent>,
  ) {
    this.updateAuthorForm = new FormGroup({
      "name": new FormControl("", Validators.required)
    });
  }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get(Constants.ID);

    this.author = this.data.author;

    this.updateAuthorForm.controls[Constants.FORM_NAME].patchValue(this.author?.name);
  }

  updateAuthor() {
    let form: AuthorModel = {
      id: Number(this.author.id),
      name: this.updateAuthorForm.controls[Constants.FORM_NAME].value,
      authorInPrintings: null
    };
    this.store$.dispatch(new UpdateAuthor(form));
  }



}
