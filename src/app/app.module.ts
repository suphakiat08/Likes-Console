import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from "angular-6-social-login";

import { AppComponent } from './app.component';
import { AppNevComponent } from './components/app-nev/app-nev.component';
import { AppTableComponent } from './components/app-table/app-table.component';
import { AppDialogComponent } from './components/app-dialog/access-token/app-dialog.component';
import { ManageComponent } from './components/app-dialog/manage/manage.component';
import { DeleteComponent } from './components/app-dialog/delete/delete.component';

import { DatabaseService } from './services/database.service';
import { CookieService } from 'ngx-cookie-service';
import { MyCookieService } from './services/cookie.service';
import { FacebookService } from './services/facebook.service';

@NgModule({
  declarations: [
    AppComponent,
    AppNevComponent,
    AppTableComponent,
    AppDialogComponent,
    ManageComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    SocialLoginModule
  ],
  providers: [
    DatabaseService,
    CookieService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    MyCookieService,
    FacebookService,
    AppTableComponent
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AppDialogComponent,
    ManageComponent,
    DeleteComponent
  ]
})
export class AppModule { }

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [{
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("2462994850384693")
    }]
  );
  return config;
}