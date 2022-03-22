import {Pipe, PipeTransform} from "@angular/core";
import {Chain} from "../model/chain";

@Pipe({ name: 'chainFilter' })
export class ChainFilterPipe implements PipeTransform {

  transform(items: Chain[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    return items.filter(it => {
      return it.chainName.toLocaleLowerCase().includes(searchText)
        || it.chainId.toLocaleLowerCase().includes(searchText);
    });
  }
}
