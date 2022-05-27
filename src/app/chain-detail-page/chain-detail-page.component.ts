import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Chain } from "../model/chain";
import { ChainService } from "../service/chain.service";

@Component({
  selector: 'app-chain-detail-page',
  templateUrl: './chain-detail-page.component.html',
  styleUrls: ['./chain-detail-page.component.css']
})
export class ChainDetailPageComponent implements OnInit {

  chain?: Chain;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private chainService: ChainService) {
  }

  ngOnInit(): void {
    this.chainService.activeChain = undefined;
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.chain = this.chainService.getAllChains().find(it => it.id === id);
      this.chainService.activeChain = this.chain;
      if (!this.chain) {
        this.router.navigateByUrl('/');
      }
    })
  }
}
