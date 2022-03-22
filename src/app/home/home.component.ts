import { Component, OnInit } from '@angular/core';
import {Chain} from "../model/chain";
import {ChainService} from "../service/chain.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chains: Chain[];
  searchText = '';

  constructor(private chainService: ChainService) {
    this.chains = this.chainService.getChains();
  }

  ngOnInit(): void {
  }
}
