import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Options } from 'ng5-slider';
import { Observable } from 'rxjs';
import { ConstField } from 'src/app/constants/fields';
import { ConstShared } from 'src/app/constants/shared';
import { CurrencyTypeEnum } from 'src/app/enums/currency-type.enum';
import { PrintingTypeEnum } from 'src/app/enums/printing-type.enum';
import { SpinnerState } from 'src/app/store/state/spinner.state';
import { PrintingEditionFilterModel } from '../admin/models/printing-edition.model';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { PrintingEditionModel } from './models/printing-edition.model';
import { GetMaxPricePrintingEdition } from './store/actions/get-max-price.action';
import { GetPrintingEditions } from './store/actions/get-printing-editions.action';
import { GetMaxPricePrintingEditionState } from './store/state/get-max-price.state';
import { GetPrintingEditionsState } from './store/state/get-printing-editions.state';


@Component({
  selector: 'app-printing-edition',
  templateUrl: './printing-edition.component.html',
  styleUrls: ['./printing-edition.component.scss']
})
export class PrintingEditionComponent implements OnInit {

  @Select(GetPrintingEditionsState.getPageNumber) numberPage: Observable<number>;
  @Select(GetPrintingEditionsState.getPageSize) sizePage: Observable<number>;
  @Select(GetPrintingEditionsState.getTotalItems) items: Observable<number>;
  @Select(GetPrintingEditionsState.getData) data: Observable<PrintingEditionModel[]>;
  @Select(GetMaxPricePrintingEditionState.getMaxPrice) priceMax: Observable<number>;
  @Select(SpinnerState.isShowingSpinner) isSpinnerShow: Observable<boolean>;


  priceRange: FormGroup;
  cetegoriesForm: FormGroup;

  minPrice: number = ConstShared.MIN_PRICE;
  maxPrice: number = ConstShared.MAX_PRICE;
  options: Options = {
    floor: this.minPrice,
    ceil: this.maxPrice

  };

  ceilNumber: Observable<number>;

  printingEditions: PrintingEditionModel[];

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

  constructor(
    private store$: Store,
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
        if(data != null){
          this.typeCurrency = data[ConstShared.START_VALUE]?.currency;
        }
      }
    );

    this.store$.dispatch(new GetMaxPricePrintingEdition());

    this.priceMax.subscribe(
      data => {
        if (data != null) {
          this.options = {
            floor: this.minPrice,
            ceil: data
          }
        }
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
    this.sortBy = ConstShared.SORT_BY_PRICE;
    this.typeSort = type;
    this.printingEditionFilter();
  }

  filterByMinAndMaxPrice() {
    this.minPrice = this.priceRange.controls[ConstField.FORM_MINPRICE].value;
    this.maxPrice = this.priceRange.controls[ConstField.FORM_MAXPRICE].value;
    this.printingEditionFilter();
  }

  checkFilterBook() {
    this.categories = Object.assign([], this.categories);
    if (this.cetegoriesForm.get(ConstShared.CATEGORY_BOOK).value) {
      this.categories.push(PrintingTypeEnum.Book);
    }
    else {
      this.categories = this.categories.filter(item => item != PrintingTypeEnum.Book);
    }
    this.printingEditionFilter();
  }

  checkFilterJournal() {
    this.categories = Object.assign([], this.categories);
    if (this.cetegoriesForm.get(ConstShared.CATEGORY_JOURNAL).value) {
      this.categories.push(PrintingTypeEnum.Journal);
    }
    if(!this.cetegoriesForm.get(ConstShared.CATEGORY_JOURNAL).value) {
      this.categories = this.categories.filter(item => item != PrintingTypeEnum.Journal);
    }
    this.printingEditionFilter();
  }

  checkFilterNewspaper() {
    this.categories = Object.assign([], this.categories);
    if (this.cetegoriesForm.get(ConstShared.CATEGORY_NEWSPAPER).value) {
      this.categories.push(PrintingTypeEnum.Newspaper);
    }
    if(!this.cetegoriesForm.get(ConstShared.CATEGORY_NEWSPAPER).value) {
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
    if (this.title === '') {
      this.title = null;
    }
  }

}
