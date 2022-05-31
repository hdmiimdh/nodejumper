import { Component, OnInit } from '@angular/core';
import { ChainService } from "../../service/chain.service";
import { HighlightService } from "../../service/highlight.service";
import { Chain } from "../../model/chain";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  chain?: Chain;
  data?: any;
  highlighted = false;

  constructor(private highlightService: HighlightService,
              public chainService: ChainService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.chain = this.chainService.activeChain;
    if (this.chain && !this.chain.projectOverview) {
      let coingekoCoinId = this.chain.coingekoCoinId || this.chain.id;
      this.chainService.getCoingekoSummary(coingekoCoinId)
        .subscribe({
          next: (data: any) => {
            this.data = data;
          },
          error: (error: any) => {
            this.data = {};
          }
        });
    }
  }

  ngAfterViewChecked() {
    if (this.chain && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }
}
