import { Component, Inject, OnInit } from '@angular/core';
import { Chain } from "../../model/chain";
import { HighlightService } from "../../service/highlight.service";
import { ChainService } from "../../service/chain.service";
import { DOCUMENT } from "@angular/common";

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
  livePeers: string[] = [];
  MAX_LIVE_PEERS = 200;

  constructor(@Inject(DOCUMENT) private document: Document,
              private highlightService: HighlightService,
              public chainService: ChainService) {
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
          this.snapshotHeight = data.snapshotHeight;
          this.snapshotSize = data.snapshotSize + 'B';
        });
    }
  }

  updateLivePeersView(): void {
    const livePeersString = this.livePeers.join(',');
    const peers = document.getElementsByClassName('peers');
    const peersItem = peers.item(0);
    if (peersItem) {
      peersItem.innerHTML = livePeersString;
    }
    const updatePeers = document.getElementsByClassName('update-peers').item(0)?.getElementsByClassName('token string');
    const updatePeersItem = updatePeers?.item(0);
    if (updatePeersItem) {
      updatePeersItem.innerHTML = `"${livePeersString}"`;
    }
  }

  ngAfterViewChecked() {
    if (this.chain && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }
}
