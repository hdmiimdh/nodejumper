import { Component, OnInit } from '@angular/core';
import { ChainService } from "../../service/chain.service";
import {ChainCheatSheet} from "../../model/chainCheatSheet";

@Component({
  selector: 'app-cheat-sheet',
  templateUrl: './cheat-sheet.component.html',
  styleUrls: ['./cheat-sheet.component.css']
})
export class CheatSheetComponent implements OnInit {

  chain?: ChainCheatSheet;

  constructor(public chainService: ChainService) {
  }

  ngOnInit(): void {
    if (this.chainService.activeChain) {
      const activeChain = this.chainService.activeChain

      const savedChainInfo = JSON.parse(localStorage.getItem(activeChain.chainId) || "{}");

      this.chain = new ChainCheatSheet(
        activeChain.id,
        activeChain.chainId,
        activeChain.denomName,
        this.chainService.getChainBinaryName(activeChain),
        activeChain.homeDirectoryName,
        savedChainInfo.walletName || "wallet",
        savedChainInfo.valoperAddress || "",
        savedChainInfo.fees || 200
      )
    }
  }

  ngAfterViewInit(): void {
  }

  handleBlur(paramName: String): void {
    const paramKey = paramName as keyof ChainCheatSheet;
    const value = this.chain?.[paramKey];
    const chainId = this.chain?.chainId || "default";

    const savedChainInfo = JSON.parse(localStorage.getItem(chainId) || "{}");
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
    htmlStr = htmlStr.replace(/&lt;/g , "<");
    htmlStr = htmlStr.replace(/&gt;/g , ">");
    htmlStr = htmlStr.replace(/&quot;/g , "\"");
    htmlStr = htmlStr.replace(/&#39;/g , "\'");
    htmlStr = htmlStr.replace(/&amp;/g , "&");
    htmlStr = htmlStr.replace(/&#123;/g , "{");
    htmlStr = htmlStr.replace(/&#125;/g , "}");
    htmlStr = htmlStr.replace(/<\/pre>/g , "");
    htmlStr = htmlStr.replace(/<pre (.*)>/g , "");
    return htmlStr;
  }
}
