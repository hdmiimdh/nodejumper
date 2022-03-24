import { Component, OnInit } from '@angular/core';
import { ChainService } from "../../service/chain.service";
import { HighlightService } from "../../service/highlight.service";
import { HttpClient } from "@angular/common/http";
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
              private http: HttpClient,
              public chainService: ChainService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.chain = this.chainService.activeChain;
    if (this.chain) {
      let chainName = this.chain.chainName.toLowerCase();
      let coingekoUrl = 'https://api.coingecko.com/api/v3/coins/' + this.chain.coingekoCoinId;
      this.http.get(coingekoUrl)
        .subscribe((data: any) => {
          this.data = data;
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
