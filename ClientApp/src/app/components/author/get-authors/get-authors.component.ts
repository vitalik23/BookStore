import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/constants/constants';
import { CreateAuthorComponent } from '../create-author/create-author.component';
import { AuthorFilter } from '../models/author-filter.model';
import { AuthorModel } from '../models/author.model';
import { DeleteAuthor } from '../store/actions/delete-author.action';
import { GetAuthors } from '../store/actions/get-authors.action';
import { selectAuthorId } from '../store/selectors/delete-author.selector';
import { getPageNumber, getPageSize, getTotalItems, selectAuthorModel } from '../store/selectors/get-authors.selector';
import { AuthorState } from '../store/state/author.state';
import { UpdateAuthorComponent } from '../update-author/update-author.component';

@Component({
  selector: 'app-get-authors',
  templateUrl: './get-authors.component.html',
  styleUrls: ['./get-authors.component.scss']
})
export class GetAuthorsComponent implements OnInit {
  id: Observable<number>;

  authorName: string;
  sortBy: string;
  typeSort: string;

  pageNumber: number;
  pageSize: number;
  totalItems: number;

  authors: AuthorModel[];

  filter: AuthorFilter;

  constructor(
    private store$: Store<AuthorState>,
    private matDialog: MatDialog,
  )
  {
    this.id = this.store$.pipe(select(selectAuthorId));

  }

  

  ngOnInit(): void {

    this.store$.pipe(select(selectAuthorModel)).subscribe(
      data => {
        this.authors = data;
      }
    )

    

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

    this.store$.pipe(select(getTotalItems)).subscribe(
      data => {
        this.totalItems = data;
      }
    );

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
    this.typeSort = this.typeSort == Constants.SORT_DESC ? Constants.SORT_ASC : Constants.SORT_DESC;
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

}
