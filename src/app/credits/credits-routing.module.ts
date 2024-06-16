import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreditComponent} from "./credit/credit.component";
import {CreditsComponent} from './credits.component';

const routes: Routes = [
    {path: '', component: CreditsComponent},
    {path: ':id', component: CreditComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CreditsRoutingModule {
}
