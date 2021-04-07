import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app-state.state';
import { PrintingEditionFilterModel } from '../admin/models/printing-edition-filter.model';
import { PrintingEdition } from './models/printing-edition.model';
import { Options } from 'ng5-slider';
import { CurrencyTypeEnum } from '../../enums/currency-type';
import { Observable } from 'rxjs';
import { getMaxPricePrintingEdition } from './store/selectors/get-maxprice-printing-edition.selector';
import { GetMaxPricePrintingEdition } from './store/actions/get-maxprice-printing-edition.action';
import { Constants } from 'src/app/constants/constants';
import { PrintingTypeEnum } from 'src/app/enums/printing-type';
import { getData, getPageNumber, getPageSize, getTotalItems } from './store/selectors/get-printing-editions.selector';
import { GetPrintingEditions } from './store/actions/get-printing-editions.action';
import { ofType } from '@ngrx/effects';
import * as actionsPrintingEdition from './store/actions/get-printing-editions.action';
import { MatDialog } from '@angular/material/dialog';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { isSpinnerShow } from 'src/app/store/selectors/spinner.selector';
import { SpinnerShow } from 'src/app/store/actions/spinner.action';

@Component({
  selector: 'app-printing-edition',
  templateUrl: './printing-edition.component.html',
  styleUrls: ['./printing-edition.component.scss'],
  providers: []
})
export class PrintingEditionComponent implements OnInit {

  priceRange: FormGroup;
  cetegoriesForm: FormGroup;

  minPrice: number = Constants.MIN_PRICE;
  maxPrice: number = Constants.MAX_PRICE;
  options: Options = {
    floor: this.minPrice,
    ceil: this.maxPrice

  };

  ceilNumber: Observable<number>;

  printingEditions: PrintingEdition[];

  pageNumber: number;
  pageSize: number;

  filter: PrintingEditionFilterModel;

  title: string;
  price: number;
  sortBy: string;
  typeSort: string;
  categories: PrintingTypeEnum[] = [];
  currency: CurrencyTypeEnum;
  enumCurrency = CurrencyTypeEnum;
  totalItems: number;

  typeCurrency: number;

  keysCurrency: string[] = [];
  currencyType = CurrencyTypeEnum;

  progressBar: boolean;

  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {

    this.priceRange = this.formBuilder.group({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });

    this.cetegoriesForm = this.formBuilder.group({
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

    this.store$.dispatch(new GetMaxPricePrintingEdition());

    this.store$.pipe(select(getMaxPricePrintingEdition)).subscribe(
      data => {
        if (data != null) {
          this.options = {
            floor: this.minPrice,
            ceil: data
          }
        }
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
        this.printingEditions = data;
        if(data != null){
          this.typeCurrency = data[Constants.START_VALUE]?.currency;
        }
      }
    );

    this.store$.pipe(select(getTotalItems)).subscribe(
      data => {
        this.totalItems = data;
      }

    );
    this.keysCurrency = Object.keys(this.currencyType).filter(Number);
  }

  openDialog(){
    this.dialog.open(ProgressBarComponent);
  }

  closeDialog(){
    this.dialog.closeAll();
  }

  pagedChanged(event) {
    this.pageNumber = event;

    this.store$.dispatch(new GetPrintingEditions({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    },
      this.filter = this.filter));
    this.store$.pipe(select(getData));
  }

  printingEditionFilter() {
    this.checkTitle();
    this.checkCategory();
    this.filter = {
      authorName: null,
      price: this.price,
      printingEditionName: this.title,
      sortBy: this.sortBy,
      typeSort: this.typeSort,
      category: this.categories,
      maxPrice: this.maxPrice,
      minPrice: this.minPrice,
      currency: this.currency
    }
    this.store$.dispatch(new GetPrintingEditions({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    },
      this.filter = this.filter
    ))
  }

  convertCurrency(currency) {
    this.currency = currency;
    this.printingEditionFilter();
  }

  sortByPrice(type: string) {
    this.sortBy = Constants.SORT_BY_PRICE;
    this.typeSort = type;
    this.printingEditionFilter();
  }

  filterByMinAndMaxPrice() {
    this.minPrice = this.priceRange.controls[Constants.FORM_MINPRICE].value;
    this.maxPrice = this.priceRange.controls[Constants.FORM_MAXPRICE].value;
    this.printingEditionFilter();
  }

  checkFilterBook() {
    this.categories = Object.assign([], this.categories);
    if (this.cetegoriesForm.get(Constants.CATEGORY_BOOK).value) {
      this.categories.push(PrintingTypeEnum.Book);
    }
    else {
      this.categories = this.categories.filter(item => item != PrintingTypeEnum.Book);
    }
    this.printingEditionFilter();
  }

  checkFilterJournal() {
    this.categories = Object.assign([], this.categories);
    if (this.cetegoriesForm.get(Constants.CATEGORY_JOURNAL).value) {
      this.categories.push(PrintingTypeEnum.Journal);
    }
    if(!this.cetegoriesForm.get(Constants.CATEGORY_JOURNAL).value) {
      this.categories = this.categories.filter(item => item != PrintingTypeEnum.Journal);
    }
    this.printingEditionFilter();
  }

  checkFilterNewspaper() {
    this.categories = Object.assign([], this.categories);
    if (this.cetegoriesForm.get(Constants.CATEGORY_NEWSPAPER).value) {
      this.categories.push(PrintingTypeEnum.Newspaper);
    }
    if(!this.cetegoriesForm.get(Constants.CATEGORY_NEWSPAPER).value) {
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
    if (this.title === '') {
      this.title = null;
    }
  }

}
