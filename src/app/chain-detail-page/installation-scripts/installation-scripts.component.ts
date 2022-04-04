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

  manualInstallationScriptContent?: string;
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
      this.http.get(`assets/data/installation-scripts/manual/${this.chain.id}.txt`, {responseType: 'text'}).subscribe(data => {
        this.manualInstallationScriptContent = data || 'TBD';
        if (this.chain) {
          this.manualInstallationScriptContent = this.manualInstallationScriptContent
            .replace(new RegExp('\\$chainName', 'g'), this.chain.chainName)
            .replace(new RegExp('\\$chainId', 'g'), this.chain.chainId)
            .replace(new RegExp('\\$rpcServer', 'g'), this.chain.rpcServer)
            .replace(new RegExp('\\$rpcPeer', 'g'), this.chain.rpcPeer)
            .replace(new RegExp('\\$homeDirectoryName', 'g'), this.chain.homeDirectoryName)
            .replace(new RegExp('\\$binaryName', 'g'), this.chain.binaryName || this.chain.serviceName)
            .replace(new RegExp('\\$serviceName', 'g'), this.chain.serviceName);
        }
      });
    }
  }

  ngAfterViewChecked() {
    if (this.manualInstallationScriptContent && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }
}
