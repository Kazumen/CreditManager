import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "../shared/material/material.module";

import {BanksRoutingModule} from './banks-routing.module';
import {BanksComponent} from './banks.component';
import { BankComponent } from './bank/bank.component';


@NgModule({
    declarations: [
        BanksComponent,
        BankComponent
    ],
    imports: [
        CommonModule,
        BanksRoutingModule,
        MaterialModule,
        FlexLayoutModule
    ]
})
export class BanksModule {
}
