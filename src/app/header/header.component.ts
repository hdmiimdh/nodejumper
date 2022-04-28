import { Component, OnInit } from '@angular/core';
import { LeftHandMenuService } from "../service/left-hand-menu.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private leftHandMenuService: LeftHandMenuService) {
  }

  ngOnInit(): void {
  }

  openLeftHandMenuForMobile(): void {
    this.leftHandMenuService.openLeftHandMenuForMobile();
  }
}
