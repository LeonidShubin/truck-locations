import {Injectable} from '@angular/core';
import * as L from 'leaflet';
import {ITruck} from '../interfaces/truck';
import {Marker} from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map;
  markers: Marker[] = [];

  constructor() {
  }

  moveTo(lat, lon) {
    this.map.flyTo([lat, lon], 8);
  }

  addMarkers(trucks: ITruck[]) {
    trucks.map(item => {
      this.markers.push(L.marker([item.lat, item.lon], {title: item.name}).addTo(this.map));
    });
  }

  removeMarkers(markers: Marker[]) {
    markers.map(item => {
      item.remove();
    });
  }
}
