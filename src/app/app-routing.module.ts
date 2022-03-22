import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ChainDetailsComponent} from "./chain-details/chain-details.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rizon', component: ChainDetailsComponent },
  { path: 'bitcanna', component: ChainDetailsComponent },
  { path: 'kichain', component: ChainDetailsComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
