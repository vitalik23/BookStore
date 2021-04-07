import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { EffectsModule } from '@ngrx/effects';
import { RefreshTokenEffect } from '../account/store/effects/refresh-token.effect';
import { LoginEffects } from '../account/store/effects/login.effects';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([RefreshTokenEffect, LoginEffects]),
    SharedRoutingModule,
    MatDialogModule,
    MatMenuModule,
    MatBadgeModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    MatMenuModule,
    MatBadgeModule
  ]
})
export class SharedModule { }
