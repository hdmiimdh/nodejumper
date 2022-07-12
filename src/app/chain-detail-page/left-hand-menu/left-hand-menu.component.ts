import { Component, Inject, Input, OnInit } from '@angular/core';
import { Chain } from "../../model/chain";
import { ChainState } from "../../model/chainState";
import { DOCUMENT } from '@angular/common';
import { LeftHandMenuService } from "../../service/left-hand-menu.service";
import { ChainService } from "../../service/chain.service";
import { UtilsService } from "../../service/utils.service";

@Component({
  selector: 'app-left-hand-menu',
  templateUrl: './left-hand-menu.component.html',
  styleUrls: ['./left-hand-menu.component.css']
})
export class LeftHandMenuComponent implements OnInit {

  @Input() chain?: Chain;
  chainState?: any;

  constructor(@Inject(DOCUMENT) private document: Document,
              private leftHandMenuService: LeftHandMenuService,
              private chainService: ChainService,
              private utilsService: UtilsService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const barsMenuIcon = document.getElementById('btn-bars-menu');
    barsMenuIcon?.classList.remove('hide');
    const socialIcons = document.getElementsByClassName('btn-social');
    if (socialIcons && socialIcons.length) {
      for (let i = 0; i < socialIcons.length; i++) {
        socialIcons.item(i)?.classList.add('hide');
      }
    }
    if (this.chain) {
      this.chainService.getChainStatus(this.chain)
        .subscribe({
          next: (data: any) => {
            const latestBlockHeight = data.result.sync_info.latest_block_height;
            const latestBlockTime = data.result.sync_info.latest_block_time;
            const latestBlockTimeDate = new Date(latestBlockTime);
            const now = new Date();
            const timeDifferenceInSeconds = (now.getTime() - latestBlockTimeDate.getTime()) / 1000;
            if (timeDifferenceInSeconds > 600) { // 10 minutes
              this.chainState = {};
              this.chainState.status = ChainState.HALTED;
              this.chainState.latestBlockHeight = latestBlockHeight;
              this.chainState.haltedTimeInterval = this.utilsService.secondsToHumanReadableFormat(timeDifferenceInSeconds);
              return;
            }
            this.chainState = {};
            this.chainState.status = ChainState.SYNCED;
            this.chainState.latestBlockHeight = latestBlockHeight;
          },
          error: (error: any) => {
            this.chainState = {};
            this.chainState.status = ChainState.INACTIVE;
          }
        });
    }
  }

  getChainStateTooltipText(): string {
    if (this.chainState && this.chainState.status) {
      if (this.chainState.status === ChainState.HALTED) {
        return `Chain is halted ${this.chainState.haltedTimeInterval} ago, the latest block height: ${this.chainState.latestBlockHeight}`;
      } else if (this.chainState.status === ChainState.SYNCED) {
        if (this.chain?.summaryDisabled) {
          return `Chain is synced, the latest block height: ${this.chainState.latestBlockHeight}`;
        }
        return 'Chain is synced';
      } else {
        return 'Our RPC node is down, apologies for inconvenience.';
      }
    }
    return '';
  }

  ngOnDestroy(): void {
    const barsMenuIcon = document.getElementById('btn-bars-menu');
    barsMenuIcon?.classList.add('hide');
    const socialIcons = document.getElementsByClassName('btn-social');
    if (socialIcons && socialIcons.length) {
      for (let i = 0; i < socialIcons.length; i++) {
        socialIcons.item(i)?.classList.remove('hide');
      }
    }
  }

  closeLeftHandMenuForMobile(): void {
    this.leftHandMenuService.closeLeftHandMenuForMobile();
  }
}
