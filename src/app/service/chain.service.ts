import { Injectable } from '@angular/core';
import {CHAINS} from "../data/data";
import {Chain} from "../model/chain";

@Injectable({
  providedIn: 'root'
})
export class ChainService {

  constructor() {
  }

  getChains(): Chain[] {
    return CHAINS;
  }
}
