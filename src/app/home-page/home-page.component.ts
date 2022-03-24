import { Component, OnInit } from '@angular/core';
import { Chain } from "../model/chain";
import { ChainService } from "../service/chain.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  chains: Chain[];
  searchText = '';

  constructor(private chainService: ChainService) {
    this.chains = this.chainService.getChains();
  }

  ngOnInit(): void {
  }
}
