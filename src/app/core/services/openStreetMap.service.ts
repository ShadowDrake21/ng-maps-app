import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BASE_OSM_URL } from '../constants/openStreetMap.constants';
import {
  IPlace,
  IPlaceCollection,
} from '../../shared/models/featureCollection.model';
import { IPlaceDetails } from '../../shared/models/placeDetails.model';
import { ILookup } from '../../shared/models/lookup.model';

@Injectable({
  providedIn: 'root',
})
export class OpenStreetMap {
  private http = inject(HttpClient);

  public searchPlace(query: string): Observable<IPlace[]> {
    const params = new HttpParams()
      .append('q', query)
      .append('format', 'geojson');

    return this.http
      .get<IPlaceCollection>(BASE_OSM_URL + 'search', {
        params,
      })
      .pipe(map((result) => result.features));
  }

  public getPlaceDetails(
    osmType: string,
    osmId: string
  ): Observable<IPlaceDetails> {
    const params = new HttpParams().appendAll({
      osmtype: osmType,
      osmid: osmId,
      format: 'json',
    });

    return this.http.get<IPlaceDetails>(BASE_OSM_URL + 'details.php', {
      params,
    });
  }

  public reversePlace(osmIds: string): Observable<ILookup[]> {
    const params = new HttpParams().appendAll({
      osm_ids: osmIds,
      format: 'json',
      extratags: 1,
    });

    return this.http.get<ILookup[]>(BASE_OSM_URL + 'lookup', {
      params,
    });
  }
}
