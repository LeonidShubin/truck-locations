import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {TrucksDataService} from '../shared/services/trucks-data.service';
import {ITruck} from '../shared/interfaces/truck';
import {Marker} from 'leaflet';
import {MapService} from '../shared/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map;
  tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  constructor(
    private dataService: TrucksDataService,
    private mapService: MapService
  ) {
  }

  ngOnInit(): void {
    this.initMap();
    this.tiles.addTo(this.map);
    this.dataService.trucksToView.subscribe(res => {
      if (this.mapService.markers) {
        this.mapService.removeMarkers(this.mapService.markers);
      }
      this.mapService.addMarkers(res);
    });
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
    });
    this.mapService.map = this.map;

    this.tiles.on('load', () => this.map.invalidateSize());
  }
}
