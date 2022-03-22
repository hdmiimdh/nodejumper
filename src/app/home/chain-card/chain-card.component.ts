import {Component, Input, OnInit} from '@angular/core';
import {Chain} from "../../model/chain";

@Component({
  selector: 'app-chain-card',
  templateUrl: './chain-card.component.html',
  styleUrls: ['./chain-card.component.css']
})
export class ChainCardComponent implements OnInit {

  @Input() chain?: Chain;

  constructor() {
  }

  ngOnInit(): void {
  }

}
