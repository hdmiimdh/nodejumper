import { Component, Input, OnInit } from '@angular/core';
import { Chain } from "../../model/chain";

@Component({
  selector: 'app-shadow-pulse-circle',
  templateUrl: './shadow-pulse-circle.component.html',
  styleUrls: ['./shadow-pulse-circle.component.css']
})
export class ShadowPulseCircleComponent implements OnInit {

  @Input() chain?: Chain;

  constructor() { }

  ngOnInit(): void {
  }
}
