import { Component, Inject, OnInit } from '@angular/core';
import { Chain } from "../../model/chain";
import { HighlightService } from "../../service/highlight.service";
import { ChainService } from "../../service/chain.service";
import { DOCUMENT } from "@angular/common";
import { SnapshotData } from "../../model/snapshotData";
import { UtilsService } from "../../service/utils.service";

@Component({
  selector: 'app-synchronization-data',
  templateUrl: './synchronization-scripts.component.html',
  styleUrls: ['./synchronization-scripts.component.css']
})
export class SynchronizationScriptsComponent implements OnInit {

  MAX_LIVE_PEERS = 200;

  chain?: Chain;
  snapshotData?: SnapshotData;
  livePeers: string[] = [];

  highlighted = false;

  constructor(@Inject(DOCUMENT) private document: Document,
              private highlightService: HighlightService,
              public chainService: ChainService,
              private utilsService: UtilsService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.chain = this.chainService.activeChain;
    if (this.chain) {
      this.chainService.getChainNetInfo(this.chain)
        .subscribe((data: any) => {
            this.livePeers.push(this.chain?.rpcPeer || '');
            let peersArray = data.result.peers;
            peersArray = peersArray.slice(0, this.MAX_LIVE_PEERS - 1);
            for (let i = 0; i < peersArray.length; i++) {
              const peerId = peersArray[i].node_info.id;
              const listenAddr = peersArray[i].node_info.listen_addr;
              const listenPort = listenAddr.slice(listenAddr.lastIndexOf(':') + 1);
              const remoteIp = peersArray[i].remote_ip;
              const livePeer = `${peerId}@${remoteIp}:${listenPort}`;
              this.livePeers.push(livePeer);
            }
            this.updateLivePeersView();
          }
        );
      this.chainService.getChainSnapshotInfo(this.chain)
        .subscribe((data: any) => {
          const snapshotHeight = data.snapshotHeight;
          const snapshotSize = data.snapshotSize + 'B';
          const snapshotBlockTime = this.utilsService.humanReadableTimeDifferenceString(data.snapshotBlockTime);
          this.snapshotData = new SnapshotData(snapshotHeight, snapshotSize, snapshotBlockTime);
        });
    }
  }

  updateLivePeersView(): void {
    const livePeersString = this.livePeers.join(',');
    const peersRow = document.getElementById('peers-row');
    if (peersRow) {
      peersRow.innerHTML = livePeersString;
    }
    const updatePeersRow = document.getElementById('update-peers-row')?.getElementsByClassName('token string')?.item(0);
    if (updatePeersRow) {
      updatePeersRow.innerHTML = `"${livePeersString}"`;
    }
  }

  ngAfterViewChecked() {
    if (this.chain && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }
}
