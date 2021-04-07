import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PrintingTypeEnum } from 'src/app/enums/printing-type.enum';
import { PrintingEditionModel } from '../../printing-edition/models/printing-edition.model';
import { PrintingEditionFilterModel } from '../models/printing-edition.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetPrintingEditionsState } from '../../printing-edition/store/state/get-printing-editions.state';
import { DeletePrintingEdition, GetPrintingEditions } from '../../printing-edition/store/actions/get-printing-editions.action';
import { ConstShared } from 'src/app/constants/shared';
import { AddPrintingEditionComponent } from '../add-printing-edition/add-printing-edition.component';
import { UpdatePrintingEditionComponent } from '../update-printing-edition/update-printing-edition.component';
import { SpinnerState } from 'src/app/store/state/spinner.state';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';

@Component({
  selector: 'app-list-printing-edition',
  templateUrl: './list-printing-edition.component.html',
  styleUrls: ['./list-printing-edition.component.scss']
})
export class ListPrintingEditionComponent implements OnInit {

  printingEditions: PrintingEditionModel[];

  @Select(GetPrintingEditionsState.getPageNumber) numberPage: Observable<number>;
  @Select(GetPrintingEditionsState.getPageSize) sizePage: Observable<number>;
  @Select(GetPrintingEditionsState.getTotalItems) items: Observable<number>;
  @Select(GetPrintingEditionsState.getData) data: Observable<PrintingEditionModel[]>;
  @Select(SpinnerState.isShowingSpinner) isSpinnerShow: Observable<boolean>;


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
    private store$: Store,
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

    this.items.subscribe(
      data => {
        this.totalItems = data;
      }
    );

    this.data.subscribe(
      data => {
        this.printingEditions = data;
      }
    );

    this.store$.dispatch(new GetPrintingEditions({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
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
    }));

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
    this.typeSort = this.typeSort === ConstShared.SORT_DESC ? ConstShared.SORT_ASC : ConstShared.SORT_DESC
    this.printingEditionFilter();
  }

  checkFilterBook() {
    this.categories = Object.assign([], this.categories);
    if (this.checkboxForm.get(ConstShared.CATEGORY_BOOK).value) {
      this.categories.push(PrintingTypeEnum.Book);
    }
    if(!this.checkboxForm.get(ConstShared.CATEGORY_BOOK).value) {
      this.categories = this.categories.filter(item => item != PrintingTypeEnum.Book);
    }
    this.printingEditionFilter();
  }

  checkFilterJournal() {
    this.categories = Object.assign([], this.categories);
    if (this.checkboxForm.get(ConstShared.CATEGORY_JOURNAL).value) {
      this.categories.push(PrintingTypeEnum.Journal);
    }
    if(!this.checkboxForm.get(ConstShared.CATEGORY_JOURNAL).value) {
      this.categories = this.categories.filter(item => item != PrintingTypeEnum.Journal);
    }
    this.printingEditionFilter();
  }

  checkFilterNewsPaper() {
    this.categories = Object.assign([], this.categories);
    if (this.checkboxForm.get(ConstShared.CATEGORY_NEWSPAPER).value) {
      this.categories.push(PrintingTypeEnum.Newspaper);
    }
    if(!this.checkboxForm.get(ConstShared.CATEGORY_NEWSPAPER).value) {
      this.categories = this.categories.filter(item => item != PrintingTypeEnum.Newspaper);
    }
    this.printingEditionFilter();
  }

  checkCategory() {
    if (this.categories != null && this.categories.length < ConstShared.LENGTH_CATEGORY_ARRAY) {
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

  updatePrintingEdition(id: number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {id};
    this.matDialog.open(UpdatePrintingEditionComponent, dialogConfig);
  }

  openDialog(){
    this.matDialog.open(ProgressBarComponent);
  }

  closeDialog(){
    this.matDialog.closeAll();
  }

}