import {Marker} from 'leaflet';

export interface ITruck {
  id: number;
  name: string;
  lat: number;
  lon: number;
  marker?: Marker;
}
