import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  homePageShowTestnets = new Subject<boolean>();

  constructor() { }
}
