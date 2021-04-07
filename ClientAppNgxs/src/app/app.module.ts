import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS }   from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AuthInterceptor } from './interceptors/authconfig.interceptor';
import { ErrorInterceptorService } from './interceptors/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/shared/header/header.component';
import { SharedModule } from './components/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { ConstShared } from './constants/shared';
import { PrintingEditionModule } from './components/printing-edition/printing-edition.module';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerState } from './store/state/spinner.state';
import { AuthGuardService } from './guard/auth-guard.service';


export function tokenGetter() {
  return localStorage.getItem(ConstShared.ACCESS_TOKEN);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([SpinnerState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.apiUrl],
      }
    }),
    BrowserAnimationsModule,
    SharedModule,
    MatDialogModule,
    FormsModule,
    PrintingEditionModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptorService,
    multi: true
  },
  AuthGuardService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
