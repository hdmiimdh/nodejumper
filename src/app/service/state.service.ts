import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  chainType = new Subject<string>();

  constructor() { }
}
