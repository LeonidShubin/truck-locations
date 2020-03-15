import {Component, OnInit} from '@angular/core';
import {TrucksDataService} from '../shared/services/trucks-data.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-truck-search',
  templateUrl: './truck-search.component.html',
  styleUrls: ['./truck-search.component.scss']
})
export class TruckSearchComponent implements OnInit {
  searchQuery = new BehaviorSubject('');

  constructor(
    private truckData: TrucksDataService
  ) {
  }

  ngOnInit(): void {
    this.searchQuery.subscribe(res => {
      this.truckData.search(res);
    });
  }

  search(event) {
    this.searchQuery.next(event.target.value);
  }
}
