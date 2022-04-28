import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LeftHandMenuService {

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  openLeftHandMenuForMobile(): void {
    let body = document.getElementsByTagName('body');
    if (body && body.length) {
      body[0].classList.add('left-hand-menu-open')
    }
  }

  closeLeftHandMenuForMobile(): void {
    let body = document.getElementsByTagName('body');
    if (body && body.length) {
      body[0].classList.remove('left-hand-menu-open')
    }
  }
}
