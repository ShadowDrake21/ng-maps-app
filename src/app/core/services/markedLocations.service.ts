import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';
import { ICoords, IMarkedLocation } from '../../shared/models/helper.model';
import {
  BehaviorSubject,
  catchError,
  from,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MarkedLocationsService {
  private firestore = inject(Firestore);

  private markedLocations$$ = new BehaviorSubject<IMarkedLocation[]>([]);
  public markedLocations$ = this.markedLocations$$.asObservable();

  writeMarkedLocation(uuid: string, location: ICoords): Observable<boolean> {
    return from(addDoc(collection(this.firestore, uuid), location)).pipe(
      map((docRef) => {
        const currentLocations = this.markedLocations$$.value;
        this.markedLocations$$.next([
          ...currentLocations,
          { id: docRef.id, location },
        ]);

        return true;
      }),
      catchError(() => throwError(() => false))
    );
  }

  readMarkedLocations(uuid: string): Observable<boolean> {
    return from(getDocs(collection(this.firestore, uuid))).pipe(
      map((querySnapshot) => {
        let markedLocations: IMarkedLocation[] = [];
        querySnapshot.forEach((doc) => {
          markedLocations.push({ id: doc.id, location: doc.data() as ICoords });
        });

        this.markedLocations$$.next([...markedLocations]);
        return true;
      }),
      catchError(() => throwError(() => false))
    );
  }

  removeMarkedLocation(uuid: string, id: string): Observable<boolean> {
    return from(deleteDoc(doc(this.firestore, uuid, id))).pipe(
      map(() => {
        const currentLocations = this.markedLocations$$.value;
        this.markedLocations$$.next([
          ...currentLocations.filter((location) => location.id !== id),
        ]);

        return true;
      }),
      catchError(() => throwError(() => false))
    );
  }
}
