import { Injectable } from '@angular/core';
import { CHAINS } from "../data/data";
import { Chain } from "../model/chain";

@Injectable({
  providedIn: 'root'
})
export class ChainService {

  activeChain?: Chain;

  constructor() {
  }

  getChains(): Chain[] {
    return CHAINS.sort((chain1, chain2) => {
      const chainName1 = chain1.chainName.toLowerCase();
      const chainName2 = chain2.chainName.toLowerCase();
      if (chainName1 > chainName2) { return 1; }
      if (chainName1 < chainName2) { return -1; }
      return 0;
    });
  }
}
