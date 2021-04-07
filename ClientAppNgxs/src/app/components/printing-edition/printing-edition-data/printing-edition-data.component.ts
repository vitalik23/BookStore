import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConstShared } from 'src/app/constants/shared';
import { CartService } from 'src/app/services/cart.service';
import { PrintingEditionModel } from '../models/printing-edition.model';
import { GetPrintingEdition } from '../store/actions/get-printing-edition.action';
import { GetPrintingEditionState } from '../store/state/get-printing-edition.state';
import * as alertify from 'alertifyjs';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';
import { SpinnerState } from 'src/app/store/state/spinner.state';


@Component({
  selector: 'app-printing-edition-data',
  templateUrl: './printing-edition-data.component.html',
  styleUrls: ['./printing-edition-data.component.scss']
})
export class PrintingEditionDataComponent implements OnInit {

  @Select(GetPrintingEditionState.getData) printingEditionData: Observable<PrintingEditionModel>;

  @Select(SpinnerState.isShowingSpinner) isSpinnerShow: Observable<boolean>;


  printingEdition: PrintingEditionModel;
  id: string;
  quantity: number = ConstShared.QUANTITY;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store$: Store,
    private cartService: CartService,
    public dialog: MatDialog
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

    this.id = this.activatedRoute.snapshot.paramMap.get(ConstShared.ID);

    this.store$.dispatch(new GetPrintingEdition(Number(this.id)));

    this.printingEditionData.subscribe(
      data => {
        this.printingEdition = data;
      }
    );
  }

  addToCart(product) {

    if (this.quantity > ConstShared.START_VALUE) {
      this.cartService.addToCart(product, this.quantity);

      alertify.success(`${this.printingEdition.title} ${ConstShared.SUCCESSFULLY_ADDED_TO_CART}`);
      return;
    }
    alertify.warning(`${ConstShared.QUANTITY_ISNT_LESS_THAN_ZERO}`);

  }

  openDialog(){
    this.dialog.open(ProgressBarComponent);
  }

  closeDialog(){
    this.dialog.closeAll();
  }

}
