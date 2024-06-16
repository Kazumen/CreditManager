import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BanksComponent} from "./banks/banks.component";

const routes: Routes = [
    {path: '', redirectTo: '/users', pathMatch: 'full'},
    {path: 'banks', component: BanksComponent},
    {path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
    { path: 'banks', loadChildren: () => import('./banks/banks.module').then(m => m.BanksModule) },
    { path: 'credits', loadChildren: () => import('./credits/credits.module').then(m => m.CreditsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
