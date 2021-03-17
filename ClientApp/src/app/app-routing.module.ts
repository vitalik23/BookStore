import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'account', loadChildren: () => import('./components/account/account.module').then(m => m.AccountModule) },
  { path: 'user', loadChildren: () => import('./components/user/user.module').then(m => m.UserModule) },
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
  { path: 'author', loadChildren: () => import('./components/author/author.module').then(m => m.AuthorModule) },
  { path: '', loadChildren: () => import('./components/printing-edition/printing-edition.module').then(m => m.PrintingEditionModule) },
  { path: 'shared', loadChildren: () => import('./components/shared/shared.module').then(m => m.SharedModule) },
  { path: 'order', loadChildren: () => import('./components/order/order.module').then(m => m.OrderModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
