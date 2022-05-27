import { Component, OnInit } from '@angular/core';
import { Chain } from "../model/chain";
import { ChainService } from "../service/chain.service";
import { StateService } from "../service/state.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  chains: Chain[];
  searchText = '';
  showTestnets = false;

  constructor(public chainService: ChainService,
              public stateService: StateService) {
    this.chains = this.chainService.getChains(false)
  }

  ngOnInit(): void {
    this.stateService.homePageShowTestnets.subscribe({
        next: (showTestnets: boolean) => {
          this.showTestnets = showTestnets;
          this.chains = this.chainService.getChains(showTestnets)
        }
      }
    );
  }
}
