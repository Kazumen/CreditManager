import { NgModule } from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {CreditsComponent} from "./credits/credits.component";
import {HeaderComponent} from "./header/header.component";
import { BanksComponent } from './banks/banks.component';

@NgModule({
  declarations: [
    AppComponent,
    CreditsComponent,
    HeaderComponent,
    BanksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
