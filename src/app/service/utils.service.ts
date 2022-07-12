import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  compactNumber(num: number, maximumFractionDigits = 0): string {
    return Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: maximumFractionDigits
    }).format(num);
  }
}
