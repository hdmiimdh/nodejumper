import { Component, OnInit } from '@angular/core';
import { Chain } from "../../model/chain";
import { HighlightService } from "../../service/highlight.service";
import { HttpClient } from "@angular/common/http";
import { ChainService } from "../../service/chain.service";

@Component({
  selector: 'app-installation-data',
  templateUrl: './installation-scripts.component.html',
  styleUrls: ['./installation-scripts.component.css']
})
export class InstallationScriptsComponent implements OnInit {

  automaticScriptUrl?: string;
  manualScriptContent?: string;
  testnetInstructionsContent?: string;
  chain?: Chain;
  highlighted = false;

  constructor(private highlightService: HighlightService,
              private http: HttpClient,
              public chainService: ChainService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.chain = this.chainService.activeChain;
    if (this.chain) {

      const chainNet = this.chain.isTestnet ? "testnet" : "mainnet"
      const chainName = this.chain.chainName.toLowerCase()
      const chainId = this.chain.chainId
      this.automaticScriptUrl = `https://raw.githubusercontent.com/nodejumper-org/cosmos-utils/main/${chainNet}/${chainName}/${chainId}-install.sh`

      this.http.get(this.automaticScriptUrl, {responseType: 'text'}).subscribe(response => {
        this.manualScriptContent = "NODEMONIKER=<YOUR_NODE_MONIKER>\n\n"
          .concat(
            response
              .split('printCyan "Building binaries..." && sleep 1')[1]
              .split("printLine")[0]
              .split("\n")
              .filter(line => !line.includes("print"))
              .join('\n')
              .replace(new RegExp('\\$CHAIN_ID', 'g'), chainId)
              .trim()
          )
          .replace("\n\n\n", "\n\n")
      });

      if (this.chain.isTestnet) {
        const testnetInstructionsUrl = `https://raw.githubusercontent.com/nodejumper-org/cosmos-utils/main/testnet/${chainName}/testnet-instructions.sh`
        this.http.get(testnetInstructionsUrl, {responseType: 'text'}).subscribe(response => {
          this.testnetInstructionsContent = response || 'TBD';
          if (this.chain) {
            this.testnetInstructionsContent = this.testnetInstructionsContent
              .replace(new RegExp('\\$chainName', 'g'), this.chain.chainName)
              .replace(new RegExp('\\$chainId', 'g'), this.chain.chainId)
              .replace(new RegExp('\\$denomName', 'g'), this.chain.denomName)
              .replace(new RegExp('\\$rpcServer', 'g'), this.chain.rpcServer)
              .replace(new RegExp('\\$rpcPeer', 'g'), this.chain.rpcPeer)
              .replace(new RegExp('\\$homeDirectoryName', 'g'), this.chain.homeDirectoryName)
              .replace(new RegExp('\\$binaryName', 'g'), this.chainService.getChainBinaryName(this.chain))
              .replace(new RegExp('\\$serviceName', 'g'), this.chain.serviceName)
              .trim();
          }
        });
      }
    }
  }

  ngAfterViewChecked() {
    if (this.manualScriptContent && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }
}
