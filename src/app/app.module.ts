import {HttpClientModule} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatOption, MatSelect} from "@angular/material/select";
import {BrowserModule} from '@angular/platform-browser';
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsModule} from "@ngxs/store";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HeaderComponent} from "./header/header.component";
import {MaterialModule} from "./shared/material/material.module";
import {BankState} from "./shared/store/bank/bank.state";
import {BanksState} from "./shared/store/banks/banks.state";
import {ContractState} from "./shared/store/contract/contract.state";
import {CreditState} from "./shared/store/credit/credit.state";
import {CreditsState} from "./shared/store/credits/credits.state";
import {UserState} from "./shared/store/user/user.state";
import {UsersState} from "./shared/store/users/users.state";
import {ConfirmationDialogComponent} from './shared/component/confirmation-dialog/confirmation-dialog.component';
import {EditUserDialogComponent} from './shared/component/create-edit-user-dialog/create-edit-user-dialog.component';
import { CreateEditBankDialogComponent } from './shared/component/create-edit-bank-dialog/create-edit-bank-dialog.component';
import { CreateEditCreditDialogComponent } from './shared/component/create-edit-credit-dialog/create-edit-credit-dialog.component';
import { CreateContractDialogComponent } from './shared/component/create-contract-dialog/create-contract-dialog.component';
import { PayRepaymentDialogComponent } from './shared/component/pay-repayment-dialog/pay-repayment-dialog.component';
import { UserSelectDialogComponent } from './shared/component/user-select-dialog/user-select-dialog.component';

@NgModule({
    declarations: [
        AppComponent,

        HeaderComponent,
        ConfirmationDialogComponent,
        EditUserDialogComponent,
        CreateEditBankDialogComponent,
        CreateEditCreditDialogComponent,
        CreateContractDialogComponent,
        PayRepaymentDialogComponent,
        UserSelectDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FlexLayoutModule,
        MaterialModule,
        MatDialogModule,
        HttpClientModule,
        NgxsModule.forRoot([UsersState, UserState, BanksState, BankState, CreditsState, CreditState, ContractState]),
        NgxsLoggerPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        MatSelect,
        MatOption,
    ],
    providers: [
        provideAnimationsAsync()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
