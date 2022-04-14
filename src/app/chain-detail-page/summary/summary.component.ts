import { Component, OnInit } from '@angular/core';
import { ChainService } from "../../service/chain.service";
import { Chain } from "../../model/chain";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  chain?: Chain;
  price?: string;
  summary?: any;

  constructor(public chainService: ChainService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.chain = this.chainService.activeChain;
    if (this.chain) {
      let apiChainId = this.chain.apiChainId || this.chain.id;
      this.chainService.getChainSummary(apiChainId)
        .subscribe((summary: any) => {
          if (this.chain) {
            this.summary = summary;
            this.summary.blockTime = this.extractBlockTime(summary);
            this.summary.inflation = this.extractInflation(summary);
            this.summary.bondedTokens = this.extractBondedTokens(this.chain, summary);
            this.summary.totalSupply = this.extractTotalSupply(this.chain, summary);
            this.summary.communityPool = this.extractCommunityPool(this.chain, summary);
          }
        });
      let coingekoCoinId = this.chain.coingekoCoinId || this.chain.id;
      this.chainService.getCoingekoSummary(coingekoCoinId)
        .subscribe((coingekoData: any) => {
          this.price = this.extractPrice(coingekoData);
        });
    }
  }

  extractBlockTime(summary: any) : string {
    return Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(summary.blockTime) + 's';
  }

  extractPrice(coingekoData: any): string {
    let price = coingekoData?.market_data?.current_price?.usd;
    return Intl.NumberFormat('en-US', {
      notation: 'compact',
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }

  extractInflation(summary: any) : string {
    return Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 2,
      style: 'percent'
    }).format(summary.inflation);
  }

  extractBondedTokens(chain: Chain, summary: any) : string {
    let bondedTokens = summary.bondedTokens / Math.pow(10, chain.denomPow);
    return this.compactNumber(bondedTokens);
  }

  extractTotalSupply(chain: Chain, summary: any): string {
    let totalSupply = 0;
    summary.totalSupply.supply.forEach(function (item: any) {
      if (item.denom === chain.denomName) {
        totalSupply = +item.amount;
      }
    });
    totalSupply = totalSupply / Math.pow(10, chain.denomPow);
    return this.compactNumber(totalSupply);
  }

  extractCommunityPool(chain: Chain, summary: any): string {
    let communityPool = 0;
    summary.communityPool.forEach(function (item: any) {
      if (item.denom === chain.denomName) {
        communityPool = +item.amount;
      }
    });
    communityPool = communityPool / Math.pow(10, chain.denomPow);
    return this.compactNumber(communityPool);
  }

  compactNumber(num: number): string {
    return Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 0
    }).format(num);
  }
}
