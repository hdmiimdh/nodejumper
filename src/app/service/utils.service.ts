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

  humanReadableTimeDifferenceSeconds(dateTimeString: string) {
    const dateTime = new Date(dateTimeString);
    const now = new Date();
    return (now.getTime() - dateTime.getTime()) / 1000;
  }

  humanReadableTimeDifferenceString(dateTimeString: string) {
    const timeDifferenceInSeconds = this.humanReadableTimeDifferenceSeconds(dateTimeString);
    return this.secondsToHumanReadableFormat(timeDifferenceInSeconds);
  }

  secondsToHumanReadableFormat(seconds: number) {
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + " year" + (interval > 1 ? 's' : '');
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " month" + (interval > 1 ? 's' : '');
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " day" + (interval > 1 ? 's' : '');
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hour" + (interval > 1 ? 's' : '');
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minute" + (interval > 1 ? 's' : '');
    }
    return Math.floor(seconds) + " second" + (interval > 1 ? 's' : '');
  }
}
