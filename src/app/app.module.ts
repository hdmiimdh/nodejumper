import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ChainService } from "./service/chain.service";
import { HomePageComponent } from './home-page/home-page.component';
import { ChainCardComponent } from './home-page/chain-card/chain-card.component';
import { ChainDetailPageComponent } from './chain-detail-page/chain-detail-page.component';
import { FormsModule } from "@angular/forms";
import { ChainFilterPipe } from "./service/chain.filter.pipe";
import { HighlightService } from "./service/highlight.service";
import { HttpClientModule } from "@angular/common/http";
import { LeftHandMenuComponent } from './chain-detail-page/left-hand-menu/left-hand-menu.component';
import {
  SynchronizationScriptsComponent
} from './chain-detail-page/synchronization-scripts/synchronization-scripts.component';
import { AboutComponent } from './chain-detail-page/about/about.component';
import { InstallationScriptsComponent } from './chain-detail-page/installation-scripts/installation-scripts.component';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from "ngx-google-analytics";
import { SummaryComponent } from './chain-detail-page/summary/summary.component';
import { NgCircleProgressModule } from "ng-circle-progress";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    ChainCardComponent,
    ChainDetailPageComponent,
    ChainFilterPipe,
    LeftHandMenuComponent,
    SynchronizationScriptsComponent,
    AboutComponent,
    InstallationScriptsComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxGoogleAnalyticsModule.forRoot('G-J46ZYRRDQD'),
    NgxGoogleAnalyticsRouterModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      outerStrokeWidth: 6,
      innerStrokeWidth: 5,
      outerStrokeColor: "rgba(120, 192, 0, 1)",
      innerStrokeColor: "rgba(120, 192, 0, 0.4)",
      animationDuration: 500,
      animation: true,
      responsive: true
    })
  ],
  providers: [ChainService, HighlightService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
