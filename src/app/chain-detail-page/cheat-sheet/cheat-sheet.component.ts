import { Component, Inject, OnInit } from '@angular/core';
import { ChainService } from "../../service/chain.service";
import { ChainCheatSheet } from "../../model/chainCheatSheet";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-cheat-sheet',
  templateUrl: './cheat-sheet.component.html',
  styleUrls: ['./cheat-sheet.component.css']
})
export class CheatSheetComponent implements OnInit {

  chain?: ChainCheatSheet;
  searchText = '';

  constructor(@Inject(DOCUMENT) private document: Document,
              public chainService: ChainService) {
  }

  ngOnInit(): void {
    if (this.chainService.activeChain) {
      let activeChain = this.chainService.activeChain
      let savedChainInfo = JSON.parse(localStorage.getItem(activeChain.chainId) || '{}');

      this.chain = new ChainCheatSheet(
        activeChain.id,
        activeChain.chainId,
        activeChain.denomName,
        this.chainService.getChainBinaryName(activeChain),
        activeChain.homeDirectoryName,
        savedChainInfo.walletName || 'wallet',
        savedChainInfo.gas || 0.1,
        savedChainInfo.moniker || 'Moniker',
        savedChainInfo.identity || 'FFB0AA51A2DF5954', // nodejumper keybase
        savedChainInfo.details || 'I\'m sexy and I know it😉',
        savedChainInfo.proposalId || 1,
        savedChainInfo.toValoperAddress || '',
        savedChainInfo.toWalletAddress || '',
        savedChainInfo.portIncrement || 0,
        activeChain.serviceName,
        savedChainInfo.commissionRate || "0.10",
        savedChainInfo.commissionMaxRate || "0.20",
        savedChainInfo.commissionMaxChangeRate || "0.01",
        activeChain.githubRepoName || '',
        savedChainInfo.amount || 1000000,
        savedChainInfo.indexer || 'kv',
        savedChainInfo.pruning || 'custom',
        savedChainInfo.pruningKeepRecent || 100,
        savedChainInfo.pruningKeepEvery || 0,
        savedChainInfo.pruningInterval || 10,
        savedChainInfo.txId || '',
      );
    }
  }

  ngAfterViewInit(): void {
  }

  saveParam(paramName: String): void {
    let paramKey = paramName as keyof ChainCheatSheet;
    let value = this.chain?.[paramKey];
    let chainId = this.chain?.chainId || 'default';

    let savedChainInfo = JSON.parse(localStorage.getItem(chainId) || '{}');
    savedChainInfo[paramKey] = value;
    localStorage.setItem(chainId, JSON.stringify(savedChainInfo))
  }

  handleCopyClick(event: Event): void {
    let htmlElement = (event.target as HTMLInputElement);
    htmlElement.innerText = 'Copied!';
    setTimeout(function () {
      htmlElement.innerText = 'Copy';
    }, 5000);
    let commandText = (event.target as HTMLInputElement).closest<HTMLInputElement>('.copy-button-container')?.querySelector('.command')?.innerHTML || '';
    commandText = this.unEscape(commandText);
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = commandText;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  unEscape(htmlStr: string): string {
    htmlStr = htmlStr.replace(/<br (.*)>/g, "");
    htmlStr = htmlStr.replace(/<\/pre>/g, "");
    htmlStr = htmlStr.replace(/<pre (.*)>/g, "");
    htmlStr = htmlStr.replace(/&lt;/g, "<");
    htmlStr = htmlStr.replace(/&gt;/g, ">");
    htmlStr = htmlStr.replace(/&quot;/g, "\"");
    htmlStr = htmlStr.replace(/&#39;/g, "\'");
    htmlStr = htmlStr.replace(/&amp;/g, "&");
    htmlStr = htmlStr.replace(/&#123;/g, "{");
    htmlStr = htmlStr.replace(/&#125;/g, "}");
    return htmlStr;
  }

  setPortIncrement(portIncrement: number): void {
    if (this.chain) {
      this.chain.portIncrement = portIncrement;
    }
  }

  setIndexer(indexer: string): void {
    if (this.chain) {
      this.chain.indexer = indexer;
    }
  }

  hideForSearch(section: HTMLDivElement): boolean {
    if (!this.searchText) {
      return false;
    }
    let innerHTML = section.innerHTML;
    if (!innerHTML) {
      return false;
    }
    return !innerHTML.toLowerCase().includes(this.searchText.toLowerCase());
  }

  hideForSearchArray(sectionArray: Array<HTMLDivElement>): boolean {
    for (let i = 0; i < sectionArray.length; i++) {
      let section = sectionArray[i];
      if (!this.hideForSearch(section)) {
        return false;
      }
    }
    return true;
  }
}
