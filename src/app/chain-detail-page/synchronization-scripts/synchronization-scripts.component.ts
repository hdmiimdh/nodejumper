import { Component, OnInit } from '@angular/core';
import { Chain } from "../../model/chain";
import { HighlightService } from "../../service/highlight.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ChainService } from "../../service/chain.service";

@Component({
  selector: 'app-synchronization-data',
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
      let headers = new HttpHeaders();
      headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0');
      headers.set('Pragma', 'no-cache');
      headers.set('Expires', '0');
      this.http.get(snapshotStateFileLocation, {headers: headers})
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
