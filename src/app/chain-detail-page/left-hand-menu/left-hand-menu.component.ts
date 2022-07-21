import { Component, Inject, Input, OnInit } from '@angular/core';
import { Chain } from "../../model/chain";
import { ChainStatus } from "../../model/chainStatus";
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
  chainStatus?: ChainStatus;
  chainStatusMessage?: string;

  constructor(@Inject(DOCUMENT) private document: Document,
              private leftHandMenuService: LeftHandMenuService,
              public chainService: ChainService,
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
    if (this.chain && !this.chain.isArchive) {
      this.chainService.getChainStatus(this.chain)
        .subscribe({
          next: (data: any) => {
            const latestBlockHeight = data.result.sync_info.latest_block_height;
            const latestBlockTime = data.result.sync_info.latest_block_time;
            const timeDifferenceInSeconds = this.utilsService.humanReadableTimeDifferenceSeconds(latestBlockTime);
            if (timeDifferenceInSeconds > 600) { // 10 minutes
              this.chainStatus = ChainStatus.HALTED;
              this.chainStatusMessage = `Chain is halted ${this.utilsService.secondsToHumanReadableFormat(timeDifferenceInSeconds)}
               ago, latest block height: ${latestBlockHeight}`
              return;
            }
            this.chainStatus = ChainStatus.SYNCED;
            this.chainStatusMessage = this.chain?.summaryDisabled
              ? `Chain is up and running, latest block height: ${latestBlockHeight}`
              : 'Chain is up and running';
          },
          error: (error: any) => {
            this.chainStatus = ChainStatus.INACTIVE;
            this.chainStatusMessage = 'Our RPC node is down, apologies for inconvenience.';
          }
        });
    }
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
