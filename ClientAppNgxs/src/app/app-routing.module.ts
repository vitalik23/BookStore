import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'account', loadChildren: () => import('./components/account/account.module').then(m => m.AccountModule) }, 
  { path: 'shared', loadChildren: () => import('./components/shared/shared.module').then(m => m.SharedModule) },
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
  { path: 'user', loadChildren: () => import('./components/user/user.module').then(m => m.UserModule) },
  { path: 'author', loadChildren: () => import('./components/author/author.module').then(m => m.AuthorModule) },
  { path: 'printing-edition', loadChildren: () => import('./components/printing-edition/printing-edition.module').then(m => m.PrintingEditionModule) },
  { path: 'order', loadChildren: () => import('./components/order/order.module').then(m => m.OrderModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
