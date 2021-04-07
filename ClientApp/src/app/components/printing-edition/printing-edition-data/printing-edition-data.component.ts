import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Constants } from 'src/app/constants/constants';
import { AppState } from 'src/app/store/state/app-state.state';
import { CartService } from '../../../service/cart.service';
import { PrintingEdition } from '../models/printing-edition.model';
import { GetPrintingEdition } from '../store/actions/get-printing-edition.action';
import { getPrintingEdition } from '../store/selectors/get-printing-edition.selector';
import * as alertify from 'alertifyjs';
import { isSpinnerShow } from 'src/app/store/selectors/spinner.selector';
import { MatDialog } from '@angular/material/dialog';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';

@Component({
  selector: 'app-printing-edition-data',
  templateUrl: './printing-edition-data.component.html',
  styleUrls: ['./printing-edition-data.component.scss']
})
export class PrintingEditionDataComponent implements OnInit {

  printingEdition: PrintingEdition;
  id: string;
  quantity: number = Constants.QUANTITY;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store$: Store<AppState>,
    private cartService: CartService,
    public dialog: MatDialog
  ) {

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

    this.id = this.activatedRoute.snapshot.paramMap.get(Constants.ID);

    this.store$.dispatch(new GetPrintingEdition(Number(this.id)));

    this.store$.pipe(select(getPrintingEdition)).subscribe(
      data => {
        this.printingEdition = data;
      }
    );

  }

  addToCart(product) {

    if (this.quantity > Constants.START_VALUE) {
      this.cartService.addToCart(product, this.quantity);

      alertify.success(`${this.printingEdition.title} ${Constants.SUCCESSFULLY_ADDED_TO_CART}`);
      return;
    }
    alertify.warning(`${Constants.QUANTITY_ISNT_LESS_THAN_ZERO}`);

  }

  openDialog(){
    this.dialog.open(ProgressBarComponent);
  }

  closeDialog(){
    this.dialog.closeAll();
  }

}
