import {Component, Injectable, OnInit} from '@angular/core';
import {SnackBarService} from '../shared/services/snack-bar.service';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {
  class: string;
  message: string;
  show = false;

  constructor(
    private snackBarService: SnackBarService
  ) {
  }

  ngOnInit(): void {
    this.snackBarService.snackBarData.subscribe(({message, color, duration}) => {
      this.message = message;
      this.class = `alert-${color}`;
      this.show = true;

      setTimeout(() => {
        this.show = false;
      }, duration);
    });
  }
}
