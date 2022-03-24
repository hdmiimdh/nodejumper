import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from "./home-page/home-page.component";
import { ChainDetailPageComponent } from "./chain-detail-page/chain-detail-page.component";
import {
  SynchronizationScriptsComponent
} from "./chain-detail-page/synchronization-scripts/synchronization-scripts.component";
import { AboutComponent } from "./chain-detail-page/about/about.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {
    path: ':chainName', component: ChainDetailPageComponent,
    children: [
      {path: '', component: SynchronizationScriptsComponent},
      {path: 'about', component: AboutComponent}
    ]
  },
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
