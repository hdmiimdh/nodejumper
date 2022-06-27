import {Component, OnInit } from '@angular/core';
import { Chain } from "../model/chain";
import { ChainService } from "../service/chain.service";
import { StateService } from "../service/state.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  mainnetChains: Chain[] = [];
  testnetChains: Chain[] = [];
  searchText = '';
  chainType = 'all';

  constructor(public chainService: ChainService, public stateService: StateService) {
    this.applyChainTypeWithFilter(this.chainType, "");
  }

  ngOnInit(): void {
    this.stateService.chainType.subscribe({
        next: (chainType: string) => {
          this.chainType = chainType;
          this.applyChainTypeWithFilter(chainType, this.searchText);
        }
      }
    );
  }

  applyChainTypeWithFilter(chainType: string, searchText: string): void {
    switch (chainType) {
      case 'mainnet':
        this.mainnetChains = this.chainService.getChains(chainType, searchText);
        this.testnetChains = [];
        break;
      case 'testnet':
        this.mainnetChains = [];
        this.testnetChains = this.chainService.getChains(chainType, searchText);
        break;
      case 'all':
      default:
        this.mainnetChains = this.chainService.getChains('mainnet', searchText);
        this.testnetChains = this.chainService.getChains('testnet', searchText);
    }
  }
}
