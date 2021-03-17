import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { EffectsModule } from '@ngrx/effects';
import { RefreshTokenEffect } from '../account/store/effects/refresh-token.effect';
import { LoginEffects } from '../account/store/effects/login.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([RefreshTokenEffect, LoginEffects]),
    SharedRoutingModule,
    MatDialogModule,
    MatMenuModule
  ],
  exports:[
    MatMenuModule
  ]
})
export class SharedModule { }
