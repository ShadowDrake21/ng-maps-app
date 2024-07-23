import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  GoogleMap,
  GoogleMapsModule,
  MapAdvancedMarker,
  MapInfoWindow,
} from '@angular/google-maps';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit, OnDestroy {
  // App: 'Miejsca które chcę zobaczyć'

  @ViewChild(GoogleMap) googleMap!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  options: google.maps.MapOptions = {
    mapId: 'b2d26fb27242f142',
    center: { lat: 52.2469807, lng: 21.0428754 },
    zoom: 4,
    minZoom: 2,
    fullscreenControl: false,
    restriction: {
      latLngBounds: {
        north: 85,
        south: -85,
        west: -180,
        east: 180,
      },
      strictBounds: false,
    },
  };

  mapInitialized = false;
  private subscriptions: Subscription[] = [];

  // nzLocations: any[] = [
  //   { lat: -36.817685, lng: 175.699196 },
  //   { lat: -36.828611, lng: 175.790222 },
  //   { lat: -39.927193, lng: 175.053218 },
  //   { lat: -41.330162, lng: 174.865694 },
  //   { lat: -43.999792, lng: 170.463352 },
  // ];
  // auLocations: any[] = [
  //   { lat: -31.56391, lng: 147.154312 },
  //   { lat: -33.718234, lng: 150.363181 },
  //   { lat: -33.727111, lng: 150.371124 },
  //   { lat: -33.848588, lng: 151.209834 },
  //   { lat: -33.851702, lng: 151.216968 },
  //   { lat: -34.671264, lng: 150.863657 },
  //   { lat: -35.304724, lng: 148.662905 },
  //   { lat: -37.75, lng: 145.116667 },
  //   { lat: -37.759859, lng: 145.128708 },
  //   { lat: -37.765015, lng: 145.133858 },
  //   { lat: -37.770104, lng: 145.143299 },
  //   { lat: -37.7737, lng: 145.145187 },
  //   { lat: -37.774785, lng: 145.137978 },
  //   { lat: -37.819616, lng: 144.968119 },
  //   { lat: -38.330766, lng: 144.695692 },
  //   { lat: -42.734358, lng: 147.439506 },
  //   { lat: -42.734358, lng: 147.501315 },
  //   { lat: -42.735258, lng: 147.438 },
  // ];

  ngOnInit(): void {
    // const parser = new DOMParser();
    // const svgString = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF5733" stroke="#FFFFFF" viewBox="0 0 24 24">
    // <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
    // </svg>`;
    // const beachFlag =
    //   'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    // this.nzLocations.forEach((location) => {
    //   location.content = parser.parseFromString(
    //     svgString,
    //     'image/svg+xml'
    //   ).documentElement;
    // });
    // this.auLocations.forEach((location) => {
    //   let imgTag = document.createElement('img');
    //   imgTag.src = beachFlag;
    //   location.content = imgTag;
    // });
  }

  // onMarkerClick(marker: MapAdvancedMarker) {
  //   this.infoWindow.openAdvancedMarkerElement(
  //     marker.advancedMarker,
  //     marker.advancedMarker.title
  //   );
  // }

  zoomChanged() {
    if (this.mapInitialized) {
      const zoomLevel = this.googleMap.getZoom();
      if (zoomLevel !== undefined && zoomLevel < 2) {
        console.log('zoomChanged', this.googleMap.getZoom());
        this.googleMap.googleMap?.setZoom(2);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
