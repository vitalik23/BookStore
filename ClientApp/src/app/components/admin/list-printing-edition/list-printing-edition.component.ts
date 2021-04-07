import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/state/app-state.state';
import { PrintingEdition } from '../../printing-edition/models/printing-edition.model';
import { AddPrintingEditionComponent } from '../add-printing-edition/add-printing-edition.component';
import { PrintingEditionFilterModel } from '../models/printing-edition-filter.model';
import { DeletePrintingEdition } from '../store/actions/delete-printing-edition.action';
import { PrintingTypeEnum } from 'src/app/enums/printing-type';
import { Constants } from 'src/app/constants/constants';
import { getData, getPageNumber, getPageSize, getTotalItems } from '../../printing-edition/store/selectors/get-printing-editions.selector';
import { GetPrintingEditions } from '../../printing-edition/store/actions/get-printing-editions.action';
import { isSpinnerShow } from 'src/app/store/selectors/spinner.selector';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';


@Component({
  selector: 'app-list-printing-edition',
  templateUrl: './list-printing-edition.component.html',
  styleUrls: ['./list-printing-edition.component.scss']
})
export class ListPrintingEditionComponent implements OnInit {

  printingEditions: PrintingEdition[];

  checkboxForm: FormGroup;

  id: Observable<number>;

  pageNumber: number;
  pageSize: number;
  totalItems: number;

  filter: PrintingEditionFilterModel;

  sortBy: string;
  typeSort: string;
  printingEditionTitle: string;
  authorName: string;
  price: number;

  categories: PrintingTypeEnum[] = [];

  constructor(
    private store$: Store<AppState>,
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {
    this.checkboxForm = this.formBuilder.group({
      book: false,
      journal: false,
      newspaper: false
    });
  }

  ngOnInit(): void {

    this.store$.pipe(select(isSpinnerShow)).subscribe(
      data => {
        if(data){
          return this.openDialog();
        }
        this.closeDialog();
      }
    );

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

    this.store$.dispatch(new GetPrintingEditions({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    },
      this.filter = {
        authorName: null,
        category: null,
        currency: null,
        maxPrice: null,
        minPrice: null,
        price: null,
        printingEditionName: null,
        sortBy: null,
        typeSort: null
      }
    ));

    this.store$.pipe(select(getData)).subscribe(
      data => {
        if(data != undefined && data != null){
          this.printingEditions = data;
        }
        
      }
    );

    this.store$.pipe(select(getTotalItems)).subscribe(
      data => {
        this.totalItems = data;
      }
    );

  }

  openDialog(){
    this.matDialog.open(ProgressBarComponent);
  }

  closeDialog(){
    this.matDialog.closeAll();
  }

  pagedChanged(event) {
    this.pageNumber = event;

    this.store$.dispatch(new GetPrintingEditions({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    },
      this.filter = this.filter));
  }

  printingEditionFilter() {
    this.checkTitle();
    this.checkAuthorName();
    this.checkCategory();
    this.filter = {
      authorName: this.authorName,
      price: this.price,
      printingEditionName: this.printingEditionTitle,
      sortBy: this.sortBy,
      typeSort: this.typeSort,
      category: this.categories,
      maxPrice: null,
      minPrice: null,
      currency: null
    }
    this.store$.dispatch(new GetPrintingEditions({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    },
      this.filter = this.filter
    ))
  }

  sorting(sort: string) {
    this.sortBy = sort;
    this.typeSort = this.typeSort === Constants.SORT_DESC ? Constants.SORT_ASC : Constants.SORT_DESC
    this.printingEditionFilter();
  }

  checkFilterBook() {
    this.categories = Object.assign([], this.categories);
    if (this.checkboxForm.get(Constants.CATEGORY_BOOK).value) {
      this.categories.push(PrintingTypeEnum.Book);
    }
    if(!this.checkboxForm.get(Constants.CATEGORY_BOOK).value) {
      this.categories = this.categories.filter(item => item != PrintingTypeEnum.Book);
    }
    this.printingEditionFilter();
  }

  checkFilterJournal() {
    this.categories = Object.assign([], this.categories);
    if (this.checkboxForm.get(Constants.CATEGORY_JOURNAL).value) {
      this.categories.push(PrintingTypeEnum.Journal);
    }
    if(!this.checkboxForm.get(Constants.CATEGORY_JOURNAL).value) {
      this.categories = this.categories.filter(item => item != PrintingTypeEnum.Journal);
    }
    this.printingEditionFilter();
  }

  checkFilterNewsPaper() {
    this.categories = Object.assign([], this.categories);
    if (this.checkboxForm.get(Constants.CATEGORY_NEWSPAPER).value) {
      this.categories.push(PrintingTypeEnum.Newspaper);
    }
    if(!this.checkboxForm.get(Constants.CATEGORY_NEWSPAPER).value) {
      this.categories = this.categories.filter(item => item != PrintingTypeEnum.Newspaper);
    }
    this.printingEditionFilter();
  }

  checkCategory() {
    if (this.categories != null && this.categories.length < Constants.LENGTH_CATEGORY_ARRAY) {
      this.categories = null;
    }
  }

  checkTitle() {
    if (this.printingEditionTitle === '') {
      this.printingEditionTitle = null;
    }
  }

  checkAuthorName() {
    if (this.authorName === '') {
      this.authorName = null;
    }
  }

  delete(id: number) {
    this.store$.dispatch(new DeletePrintingEdition(id));

  }

  addPrintingEdition() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(AddPrintingEditionComponent, dialogConfig);
  }

}
