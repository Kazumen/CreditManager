import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexModule} from "@angular/flex-layout";
import {MaterialModule} from "../shared/material/material.module";

import {CreditsRoutingModule} from './credits-routing.module';
import {CreditsComponent} from './credits.component';
import { CreditComponent } from './credit/credit.component';


@NgModule({
    declarations: [
        CreditsComponent,
        CreditComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        CreditsRoutingModule,
        FlexModule
    ]
})
export class CreditsModule {
}
