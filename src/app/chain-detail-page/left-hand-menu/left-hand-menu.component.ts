import { Component, Inject, Input, OnInit } from '@angular/core';
import { Chain } from "../../model/chain";
import { DOCUMENT } from '@angular/common';
import { LeftHandMenuService } from "../../service/left-hand-menu.service";

@Component({
  selector: 'app-left-hand-menu',
  templateUrl: './left-hand-menu.component.html',
  styleUrls: ['./left-hand-menu.component.css']
})
export class LeftHandMenuComponent implements OnInit {

  @Input() chain?: Chain;

  constructor(@Inject(DOCUMENT) private document: Document,
              private leftHandMenuService: LeftHandMenuService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let barsMenuIcon = document.getElementById('btn-bars-menu');
    barsMenuIcon?.classList.remove('hide');
    let socialIcons = document.getElementsByClassName('btn-social');
    if (socialIcons && socialIcons.length) {
      for (let i = 0; i < socialIcons.length; i++) {
        socialIcons.item(i)?.classList.add('hide');
      }
    }
  }

  ngOnDestroy(): void {
    let barsMenuIcon = document.getElementById('btn-bars-menu');
    barsMenuIcon?.classList.add('hide');
    let socialIcons = document.getElementsByClassName('btn-social');
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
