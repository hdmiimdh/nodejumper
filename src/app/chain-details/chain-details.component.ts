import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Chain} from "../model/chain";
import {ChainService} from "../service/chain.service";
import {HighlightService} from "../service/highlight.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-chain-details',
  templateUrl: './chain-details.component.html',
  styleUrls: ['./chain-details.component.css']
})
export class ChainDetailsComponent implements OnInit {

  chain?: Chain;
  snapshotHeight = '';
  snapshotSize = '';
  highlighted = false;

  constructor(private route: ActivatedRoute,
              private chainService: ChainService,
              private highlightService: HighlightService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.route.url.subscribe(params => {
      let chainName = params[0].path;
      this.chain = this.chainService.getChains().find(it => it.chainName.toLocaleLowerCase() === chainName);
      let snapshotStateFileLocation = this.chain?.snapshotServer + '/' + chainName + '/current_state.json';
      this.http.get(snapshotStateFileLocation)
        .subscribe((data: any) => {
          this.snapshotHeight = data.snapshotHeight;
          this.snapshotSize = data.snapshotSize + 'B';
        })
    });
  }

  ngAfterViewChecked() {
    if (this.chain && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }
}
