import { Component, OnInit } from '@angular/core';
import { Chain } from "../../model/chain";
import { HighlightService } from "../../service/highlight.service";
import { HttpClient } from "@angular/common/http";
import { ChainService } from "../../service/chain.service";

@Component({
  selector: 'app-synchronization-scripts',
  templateUrl: './synchronization-scripts.component.html',
  styleUrls: ['./synchronization-scripts.component.css']
})
export class SynchronizationScriptsComponent implements OnInit {

  chain?: Chain;
  snapshotHeight = '';
  snapshotSize = '';
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
      let id = this.chain.id;
      let snapshotStateFileLocation = this.chain?.snapshotServer + '/' + id + '/current_state.json';
      this.http.get(snapshotStateFileLocation)
        .subscribe((data: any) => {
          this.snapshotHeight = data.snapshotHeight;
          this.snapshotSize = data.snapshotSize + 'B';
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
