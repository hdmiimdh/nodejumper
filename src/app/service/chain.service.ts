import { Injectable } from '@angular/core';
import { CHAINS } from "../data/data";
import { Chain } from "../model/chain";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChainService {

  activeChain?: Chain;

  constructor(private http: HttpClient) {
  }

  getChains(showTestnets?: boolean): Chain[] {
    return CHAINS
      .filter(chain => (chain.isTestnet || false) == (showTestnets || false))
      .sort((chain1, chain2) => {
        const chainName1 = chain1.chainName.toLowerCase();
        const chainName2 = chain2.chainName.toLowerCase();
        if (chainName1 > chainName2) { return 1; }
        if (chainName1 < chainName2) { return -1; }
        return 0;
      });
  }

  getAllChains(): Chain[] {
    return CHAINS;
  }

  getChainSummary(apiChainId: string) {
    return this.http.get(`${environment.baseUrl}/api/v1/${apiChainId}/summary`)
  }

  getChainValidators(apiChainId: string) {
    return this.http.get(`${environment.baseUrl}/api/v1/${apiChainId}/validators`)
  }

  getCoingekoSummary(coingekoCoinId: string) {
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${coingekoCoinId}`)
  }

  getCoingekoMarketData(coingekoCoinId: string, timeIntervalDays: number) {
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${coingekoCoinId}/market_chart?vs_currency=usd&days=${timeIntervalDays}&interval=daily`)
  }

  getUnsafeResetAllString(chain: Chain): string {
    if (chain.newWayUnsafeResetAll) {
      return (chain.binaryName || chain.serviceName) + ' tendermint unsafe-reset-all --home $HOME/' + chain.homeDirectoryName;
    }
    return (chain.binaryName || chain.serviceName) + ' unsafe-reset-all';
  }
}
