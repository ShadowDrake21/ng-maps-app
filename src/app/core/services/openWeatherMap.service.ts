import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICoords } from '../../shared/models/helper.interface';
import { IReversePlace } from '../../shared/models/reversePlace.interface';
import { BASE_OWP_URL } from '../constants/openWeatherMap.constants';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class OpenWeatherMap {
  private http = inject(HttpClient);

  public findPlaceByCoords(coords: ICoords, limit: number = 1) {
    const params = new HttpParams().appendAll({
      lat: coords.latitude,
      lon: coords.longitude,
      limit,
      appid: environment.OWM_MAP_KEY,
    });
    return this.http.get<IReversePlace[]>(BASE_OWP_URL + 'reverse', { params });
  }
}
