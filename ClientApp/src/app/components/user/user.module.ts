import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { StoreModule } from '@ngrx/store';
import * as reducers from './store/reducers/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffect } from './store/effects/profile.effect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ ProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature(reducers.userReducer, reducers.userReducers),
    EffectsModule.forFeature([ProfileEffect]),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
