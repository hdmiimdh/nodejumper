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

  getChains(chainType?: string, searchText?: string): Chain[] {
    const lowerCaseQuery = searchText?.toLocaleLowerCase() || ""
    return CHAINS
      .filter(chain => this.filterByType(chain, chainType))
      .filter(chain => this.filterByQuery(chain, lowerCaseQuery))
      .sort((chain1, chain2) => {
        const chainName1 = chain1.chainName.toLowerCase();
        const chainName2 = chain2.chainName.toLowerCase();
        if (chainName1 > chainName2) {
          return 1;
        }
        if (chainName1 < chainName2) {
          return -1;
        }
        return 0;
      });
  }

  filterByType(chain: Chain, chainType?: string): boolean {
    return (chainType == 'mainnet' && !chain.isTestnet || false)
      || (chainType == 'testnet' && !!chain.isTestnet || false);
  }

  filterByQuery(chain: Chain, query: string): boolean {
    return chain.chainName.toLocaleLowerCase().includes(query)
      || chain.chainId.toLocaleLowerCase().includes(query)
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

  getChainStatus(chain: Chain) {
    return this.http.get(`${chain.rpcServer}/status`)
  }

  getUnsafeResetAllString(chain: Chain): string {
    if (chain.newWayUnsafeResetAll) {
      return this.getChainBinaryName(chain) + ' tendermint unsafe-reset-all --home $HOME/' + chain.homeDirectoryName + " --keep-addr-book";
    }
    return this.getChainBinaryName(chain) + ' unsafe-reset-all';
  }

  getChainBinaryName(chain: Chain): string {
    return chain.binaryName || chain.serviceName;
  }
}
