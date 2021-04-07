import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { GetUserState } from './store/state/get-user.state';


@NgModule({
  declarations: [ ProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxsModule.forFeature([GetUserState]),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
