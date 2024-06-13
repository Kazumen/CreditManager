import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BanksComponent} from "./banks/banks.component";
import {CreditsComponent} from "./credits/credits.component";

const routes: Routes = [
  {path: 'credits', component: CreditsComponent},
  {path: '', redirectTo: '/credits', pathMatch: 'full'},
  {path: 'banks', component: BanksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
