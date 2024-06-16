import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BankComponent} from "./bank/bank.component";
import {BanksComponent} from './banks.component';

const routes: Routes = [
    {path: '', component: BanksComponent},
    {path: ':id', component: BankComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BanksRoutingModule {
}
