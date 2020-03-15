import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import {ITruck} from '../interfaces/truck';
import {Marker} from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map;
  markers: Marker[] = [];

  constructor() { }

  moveTo( lat, lon ) {
    this.map.flyTo([lat, lon], 8);
  }

  createMarker(lat, lon, title) {
    L.marker([lat, lon], {title}).addTo(this.map);
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
