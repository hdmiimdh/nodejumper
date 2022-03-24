import { Component, Input, OnInit } from '@angular/core';
import { Chain } from "../../model/chain";

@Component({
  selector: 'app-left-hand-menu',
  templateUrl: './left-hand-menu.component.html',
  styleUrls: ['./left-hand-menu.component.css']
})
export class LeftHandMenuComponent implements OnInit {

  @Input() chain?: Chain;

  constructor() {
  }

  ngOnInit(): void {
  }

}
