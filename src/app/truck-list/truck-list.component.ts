import { Component, OnInit } from '@angular/core';
import {TrucksDataService} from '../shared/services/trucks-data.service';
import {ITruck} from '../shared/interfaces/truck';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {SnackBarService} from '../shared/services/snack-bar.service';
import {MapService} from '../shared/services/map.service';

@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.scss']
})
export class TruckListComponent implements OnInit {
  trucksToView: ITruck[];
  currentTruck: ITruck = {
    id: null,
    name: '',
    lat: null,
    lon: null
  };

  constructor(
    private trucksData: TrucksDataService,
    private config: NgbModalConfig,
    private modalService: NgbModal,
    private snackBar: SnackBarService,
    private mapService: MapService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.trucksData.trucksToView.subscribe(res => {
      this.trucksToView = res;
    });
  }

  setCurrentAsset(event, asset) {
    this.currentTruck = asset;
    this.mapService.moveTo(asset.lat, asset.lon);
  }

  openModal(content) {
    this.modalService.open(content);
  }

  removeItem(event, item) {
    this.trucksData.removeItem(item.id);
    this.snackBar.show('Truck successfully removed', 'success');
  }

}
