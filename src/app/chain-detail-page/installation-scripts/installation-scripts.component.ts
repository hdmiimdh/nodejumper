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

  autoInstallationScriptContent?: String;
  manualInstallationScriptContent?: String;
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
      this.http.get(`assets/data/installation-scripts/auto/${this.chain.id}.txt`, {responseType: 'text'}).subscribe(data => {
        this.autoInstallationScriptContent = data || 'TBD';
      });
      this.http.get(`assets/data/installation-scripts/manual/${this.chain.id}.txt`, {responseType: 'text'}).subscribe(data => {
        this.manualInstallationScriptContent = data || 'TBD';
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
