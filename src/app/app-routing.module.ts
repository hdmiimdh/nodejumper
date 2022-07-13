import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from "./home-page/home-page.component";
import { ChainDetailPageComponent } from "./chain-detail-page/chain-detail-page.component";
import {
  SynchronizationScriptsComponent
} from "./chain-detail-page/synchronization-scripts/synchronization-scripts.component";
import { AboutComponent } from "./chain-detail-page/about/about.component";
import { InstallationScriptsComponent } from "./chain-detail-page/installation-scripts/installation-scripts.component";
import { SummaryComponent } from "./chain-detail-page/summary/summary.component";
import { CheatSheetComponent } from "./chain-detail-page/cheat-sheet/cheat-sheet.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {
    path: ':id', component: ChainDetailPageComponent,
    children: [
      {path: '', component: SummaryComponent},
      {path: 'installation', component: InstallationScriptsComponent},
      {path: 'sync', component: SynchronizationScriptsComponent},
      {path: 'cheat-sheet', component: CheatSheetComponent},
      {path: 'about', component: AboutComponent}
    ]
  },
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled",
    scrollOffset: [0, 80],
    anchorScrolling: "enabled",
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
