import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {ITruck} from '../interfaces/truck';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrucksDataService {
  truckList: ITruck[] = [];
  trucksToView = new Subject<ITruck[]>();

  constructor(
    private http: HttpClient
  ) {
    this.getRemoteData().subscribe(res => this.trucksToView.next(res));
  }

  getRemoteData() {
    return this.http.get('./assets/assets.json')
      .pipe(
        map((res: any[]) => {
          return res.map((item, i) => {
            if (!item.id) {
              item.id = Date.now() + i;
            }
            return item as ITruck;
          });
        }),
        tap(v => this.truckList = v)
      );
  }

  search( query ) {
    const newArr = this.truckList.filter(item => {
      return item.name.includes( query );
    });
    this.trucksToView.next(newArr);
  }

  addItem(item: ITruck) {
    this.truckList.push(item);
    this.trucksToView.next(this.truckList);
  }

  removeItem(id) {
    this.truckList = this.truckList.filter(item => item.id !== id );
    this.trucksToView.next(this.truckList);
  }
}
