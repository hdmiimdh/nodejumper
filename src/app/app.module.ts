import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {ChainService} from "./service/chain.service";
import { HomeComponent } from './home/home.component';
import { ChainCardComponent } from './home/chain-card/chain-card.component';
import { ChainDetailsComponent } from './chain-details/chain-details.component';
import {FormsModule} from "@angular/forms";
import {ChainFilterPipe} from "./service/chain.filter.pipe";
import {HighlightService} from "./service/highlight.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ChainCardComponent,
    ChainDetailsComponent,
    ChainFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ChainService, HighlightService],
  bootstrap: [AppComponent]
})
export class AppModule { }
