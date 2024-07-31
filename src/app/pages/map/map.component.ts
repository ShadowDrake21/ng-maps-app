import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { OpenStreetMap } from '../../core/services/openStreetMap.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPlace } from '../../shared/models/featureCollection.model';
import {
  AsyncPipe,
  JsonPipe,
  NgFor,
  NgIf,
  NgTemplateOutlet,
  UpperCasePipe,
} from '@angular/common';
import { IPlaceDetails } from '../../shared/models/placeDetails.model';
import { NoAvailableInfoComponent } from './components/no-available-info/no-available-info.component';
import { ExtraInfoComponent } from './components/extra-info/extra-info.component';
import { ICoords, IMarkedLocation } from '../../shared/models/helper.model';
import { OpenWeatherMap } from '../../core/services/openWeatherMap.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { MarkedLocationsService } from '../../core/services/markedLocations.service';
import { User } from '@angular/fire/auth';
import { getUserFromLS } from '../../shared/utils/localStorage.utils';

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
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit, OnDestroy {
  private openStreetMapService = inject(OpenStreetMap);
  private openWeatherMapService = inject(OpenWeatherMap);
  private markedLocationsService = inject(MarkedLocationsService);

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

  user: User | null = null;

  searchControl = new FormControl('', [Validators.required]);

  foundPlaces$!: Observable<IPlace[]>;
  foundPlacesDetails$!: Observable<IPlaceDetails[]>;

  markedLocations$: Observable<IMarkedLocation[]> =
    this.markedLocationsService.markedLocations$;

  loadingSig = signal(false);
  markedLocationsLoadingSig = signal(false);

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.user = getUserFromLS();
    if (this.user) {
      this.markedLocationsLoadingSig.set(true);
      const readMarkedLocationsSubscription = this.markedLocationsService
        .readMarkedLocations(this.user.uid)
        .subscribe(() => {
          this.markedLocationsLoadingSig.set(false);
        });

      this.subscriptions.push(readMarkedLocationsSubscription);
    }

    this.searchOnMap();
  }

  searchOnMap() {
    const valueChangesSubscription = this.searchControl.valueChanges
      .pipe(
        tap(() => {
          this.loadingSig.set(true);
        }),
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
              tap(() => {
                this.loadingSig.set(false);
              })
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
    if (this.user) {
      const lat = event.latLng?.lat();
      const lng = event.latLng?.lng();

      if (lat !== undefined && lng !== undefined) {
        this.markedLocationsService.writeMarkedLocation(this.user?.uid, {
          latitude: lat,
          longitude: lng,
        });

        const readMarkedLocationsSubscription = this.markedLocationsService
          .readMarkedLocations(this.user.uid)
          .subscribe();
        this.getReversePlace({ latitude: lat, longitude: lng });

        this.subscriptions.push(readMarkedLocationsSubscription);
      }
    }
  }

  getReversePlace(coords: ICoords) {
    this.loadingSig.set(true);
    const reversePlaceSubscription = this.openWeatherMapService
      .findPlaceByCoords(coords)
      .pipe(
        tap(() => {
          this.loadingSig.set(false);
        })
      )
      .subscribe((place) => {
        if (this.searchControl.value !== place[0].name) {
          this.searchControl.setValue(place[0].name);
        }
      });

    this.subscriptions.push(reversePlaceSubscription);
  }

  trackById(index: number, placeDetail: IPlaceDetails) {
    return placeDetail.place_id;
  }

  useMarkedLocation(coords: ICoords) {
    this.googleMap.panTo({ lat: coords.latitude, lng: coords.longitude });
    this.googleMap.googleMap?.setZoom(8);
    this.getReversePlace(coords);
  }

  onRemoveMarkedLocation(id: string) {
    if (this.user) {
      const removeMarkedLocation = this.markedLocationsService
        .removeMarkedLocation(this.user.uid, id)
        .subscribe();

      this.subscriptions.push(removeMarkedLocation);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
