import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintingEditionDataComponent } from './printing-edition-data/printing-edition-data.component';
import { PrintingEditionComponent } from './printing-edition.component';

const routes: Routes = [
  { path: '', component: PrintingEditionComponent },
  { path: 'data/:id', component: PrintingEditionDataComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintingEditionRoutingModule { }
