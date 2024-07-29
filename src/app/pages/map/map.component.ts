import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  GoogleMap,
  GoogleMapsModule,
  MapAdvancedMarker,
  MapInfoWindow,
} from '@angular/google-maps';
import {
  combineLatest,
  debounceTime,
  delay,
  distinctUntilChanged,
  find,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { OpenStreetMap } from '../../core/services/openStreetMap.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IPlace } from '../../shared/models/featureCollection.interface';
import {
  AsyncPipe,
  JsonPipe,
  NgFor,
  NgIf,
  NgTemplateOutlet,
  UpperCasePipe,
} from '@angular/common';
import { IPlaceDetails } from '../../shared/models/placeDetails.interface';
import { NoAvailableInfoComponent } from './components/no-available-info/no-available-info.component';
import { ExtraInfoComponent } from './components/extra-info/extra-info.component';
import { ICoords } from '../../shared/models/helper.interface';
import { OpenWeatherMap } from '../../core/services/openWeatherMap.service';

type Coords = { lat: number; lng: number };

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    GoogleMapsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    NgFor,
    JsonPipe,
    UpperCasePipe,
    NoAvailableInfoComponent,
    NgTemplateOutlet,
    ExtraInfoComponent,
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit, OnDestroy {
  // App: 'Miejsca które chcę zobaczyć'
  private openStreetMapService = inject(OpenStreetMap);
  private openWeatherMapService = inject(OpenWeatherMap);

  @ViewChild(GoogleMap) googleMap!: GoogleMap;

  options: google.maps.MapOptions = {
    mapId: 'b2d26fb27242f142',
    center: { lat: 51.5073219, lng: -0.1276474 },
    zoom: 6,
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

  searchControl = new FormControl('', [Validators.required]);

  foundPlaces$!: Observable<IPlace[]>;
  foundPlacesDetails$!: Observable<IPlaceDetails[]>;

  markedLocations: Array<Coords> = [];

  loadingSig = signal(false);

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.searchOnMap();
  }

  searchOnMap() {
    const valueChangesSubscription = this.searchControl.valueChanges
      .pipe(
        tap(() => this.loadingSig.set(true)),
        debounceTime(700),
        distinctUntilChanged(),
        switchMap((value) => {
          if (value) {
            return this.openStreetMapService.searchPlace(value).pipe(
              tap((places) => {
                if (places.length > 0) {
                  const newCenter = {
                    lat: places[0].geometry.coordinates[1],
                    lng: places[0].geometry.coordinates[0],
                  };
                  this.googleMap.panTo(newCenter);
                  this.googleMap.googleMap?.setZoom(10);
                }
              }),
              switchMap((places) => {
                console.log('places', places);
                const detailsObservables = places.map((place) =>
                  this.openStreetMapService.getPlaceDetails(
                    this.getCorrectOsmType(
                      place.properties.osm_type as 'node' | 'way' | 'relation'
                    ),
                    place.properties.osm_id
                  )
                );

                return combineLatest(detailsObservables);
              }),
              tap(() => this.loadingSig.set(false))
            );
          } else {
            this.loadingSig.set(false);
            return [];
          }
        })
      )
      .subscribe((details) => {
        this.foundPlacesDetails$ = of(details);
      });

    // this.foundPlacesDetails$.subscribe();

    this.subscriptions.push(valueChangesSubscription);
  }

  getCorrectOsmType(value: 'node' | 'way' | 'relation') {
    if (value === 'node') {
      return 'N';
    } else if (value === 'way') {
      return 'W';
    } else {
      return 'R';
    }
  }

  onMapDblClick(event: google.maps.MapMouseEvent) {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();

    if (lat !== undefined && lng !== undefined) {
      this.markedLocations.push({ lat, lng });
      this.getReversePlace({ latitude: lat, longitude: lng });
    }
  }

  getReversePlace(coords: ICoords) {
    this.loadingSig.set(true);
    const reversePlaceSubscription = this.openWeatherMapService
      .findPlaceByCoords(coords)
      .pipe(tap(() => this.loadingSig.set(false)))
      .subscribe((place) => {
        this.searchControl.setValue(place[0].name);
      });

    this.subscriptions.push(reversePlaceSubscription);
  }

  trackById(index: number, placeDetail: IPlaceDetails) {
    return placeDetail.place_id;
  }

  trackByIndex(index: number, coordinates: Coords) {
    return index;
  }

  useMarkedLocation(index: number) {
    this.googleMap.panTo(this.markedLocations[index]);
    this.googleMap.googleMap?.setZoom(8);
    this.getReversePlace({
      latitude: this.markedLocations[index].lat,
      longitude: this.markedLocations[index].lng,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
