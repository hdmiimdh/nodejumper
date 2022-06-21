import { Component, OnInit } from '@angular/core';
import { ChainService } from "../../service/chain.service";

@Component({
  selector: 'app-cheat-sheet',
  templateUrl: './cheat-sheet.component.html',
  styleUrls: ['./cheat-sheet.component.css']
})
export class CheatSheetComponent implements OnInit {

  chain?: any;

  constructor(public chainService: ChainService) {
  }

  ngOnInit(): void {
    if (this.chainService.activeChain) {
      this.chain = {
        binaryName: this.chainService.getChainBinaryName(this.chainService.activeChain),
        walletName: 'wallet',
        chainId: this.chainService.activeChain.chainId,
        denomName: this.chainService.activeChain.denomName,
        homeDirectoryName: this.chainService.activeChain.homeDirectoryName,
        fees: 200
      }
    }
  }

  ngAfterViewInit(): void {
  }

  handleCopyClick(event: Event): void {
    let htmlElement = (event.target as HTMLInputElement);
    htmlElement.innerText = 'Copied!';
    setTimeout(function () {
      htmlElement.innerText = 'Copy';
    }, 5000);
    let commandText = (event.target as HTMLInputElement).closest<HTMLInputElement>('.command')?.querySelector('.details')?.innerHTML || '';
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
