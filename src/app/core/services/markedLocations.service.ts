import { inject, Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';
import { ICoords, IMarkedLocation } from '../../shared/models/helper.model';
import { catchError, from, map, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MarkedLocationsService {
  private firestore = inject(Firestore);

  writeMarkedLocation(
    uuid: string,
    location: ICoords
  ): Observable<{
    isSuccessfull: boolean;
  }> {
    return from(setDoc(doc(this.firestore, uuid), location)).pipe(
      map(() => ({ isSuccessfull: true })),
      catchError(() =>
        throwError(() => ({
          isSuccessful: false,
        }))
      )
    );
  }

  readMarkedLocations(uuid: string): Observable<IMarkedLocation[]> {
    return from(getDocs(collection(this.firestore, uuid))).pipe(
      map((querySnapshot) => {
        let markedLocations: IMarkedLocation[] = [];
        querySnapshot.forEach((doc) => {
          markedLocations.push({ id: doc.id, location: doc.data() as ICoords });
        });

        return markedLocations;
      })
    );
  }

  removeMarkedLocation(
    uuid: string,
    id: string
  ): Observable<{
    isSuccessfull: boolean;
  }> {
    return from(deleteDoc(doc(this.firestore, uuid, id))).pipe(
      map(() => ({ isSuccessfull: true })),
      catchError(() =>
        throwError(() => ({
          isSuccessful: false,
        }))
      )
    );
  }
}
