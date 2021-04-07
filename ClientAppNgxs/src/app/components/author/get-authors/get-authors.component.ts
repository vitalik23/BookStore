import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConstShared } from 'src/app/constants/shared';
import { SpinnerState } from 'src/app/store/state/spinner.state';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';
import { AuthorFilterModel } from '../models/author-filter.model';
import { AuthorModel } from '../models/author.model';
import { DeleteAuthor, GetAuthors } from '../store/actions/get-authors.action';
import { GetAuthorsState } from '../store/state/get-authors.state';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { UpdateAuthorComponent } from './update-author/update-author.component';

@Component({
  selector: 'app-get-authors',
  templateUrl: './get-authors.component.html',
  styleUrls: ['./get-authors.component.scss']
})
export class GetAuthorsComponent implements OnInit {

  @Select(GetAuthorsState.getData) dataAuthors: Observable<AuthorModel[]>;
  @Select(GetAuthorsState.getPageNumber) numberPage: Observable<number>;
  @Select(GetAuthorsState.getPageSize) sizePage: Observable<number>;
  @Select(GetAuthorsState.getTotalItems) totalAuthors: Observable<number>;
  @Select(SpinnerState.isShowingSpinner) isSpinnerShow: Observable<boolean>;


  id: number;

  authorName: string;
  sortBy: string;
  typeSort: string;

  pageNumber: number;
  pageSize: number;
  totalItems: number;

  authors: AuthorModel[];

  filter: AuthorFilterModel;

  constructor(
    private store$: Store,
    private matDialog: MatDialog,
  ) { }

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

    this.totalAuthors.subscribe(
      data => {
        this.totalItems = data;
      }
    );

    this.dataAuthors.subscribe(
      data => {
        this.authors = data;
      }
    );


    this.store$.dispatch(new GetAuthors({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
      },
      this.filter = {
        name: null,
        sortBy: null,
        typeSort: null
      }
    ));

  }

  authorFilter(){
    this.checkAuthorName();
      this.filter = {
        name: this.authorName,
        sortBy: this.sortBy,
        typeSort: this.typeSort
      }
      this.store$.dispatch(new GetAuthors({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
        },
        this.filter = this.filter
      ));
      
  }

  sorting(sort: string){
    this.sortBy = sort;
    this.typeSort = this.typeSort == ConstShared.SORT_DESC ? ConstShared.SORT_ASC : ConstShared.SORT_DESC;
    this.authorFilter();
  }

  deleteAuthor(id){
    this.store$.dispatch(new DeleteAuthor(id));
  
  }

  addAuthor(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(CreateAuthorComponent, dialogConfig);
  }

  pagedChanged(event){
    this.pageNumber = event;

    this.store$.dispatch(new GetAuthors({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    },
    this.filter = this.filter));
  }

  updateAuthor(author: AuthorModel){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { author }
    this.matDialog.open(UpdateAuthorComponent, dialogConfig);
  }

  checkAuthorName(){
    if(this.authorName == ''){
      this.authorName = null;
    }
  }

  openDialog(){
    this.matDialog.open(ProgressBarComponent);
  }

  closeDialog(){
    this.matDialog.closeAll();
  }

}
