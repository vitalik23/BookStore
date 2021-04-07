import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { AddAuthor } from '../../store/actions/get-authors.action';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss']
})
export class CreateAuthorComponent implements OnInit {

  createAuthorForm: FormGroup;

  constructor(
    private store$: Store,
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

    this.store$.dispatch(new AddAuthor(form));
    this.cancel();
  }

  cancel() {
    this.dialogRef.close();
  }

}
