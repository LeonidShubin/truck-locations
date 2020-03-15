import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  snackBarData = new Subject();

  constructor() { }

  show(message: string, color: string = 'primary', duration: number = 2000) {
    this.snackBarData.next({
      message,
      color,
      duration
    });
  }
}
