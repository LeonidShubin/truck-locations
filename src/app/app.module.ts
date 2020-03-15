import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TruckListComponent } from './truck-list/truck-list.component';
import { TruckSearchComponent } from './truck-search/truck-search.component';
import { AddTruckComponent } from './add-truck/add-truck.component';
import {ReactiveFormsModule} from '@angular/forms';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { MapComponent } from './map/map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    AppComponent,
    TruckListComponent,
    TruckSearchComponent,
    AddTruckComponent,
    SnackBarComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    LeafletModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
