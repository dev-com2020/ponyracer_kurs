import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PonyWithPositionModel } from './models/pony.model';

import { RaceModel } from './models/race.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

constructor(private http: HttpClient) {}

  list(): Observable<Array<RaceModel>> {
    
    const params = { status: 'PENDING'};
    return this.http.get<Array<RaceModel>>(`${environment.baseUrl}/api/races`, { params });
  }

    get(raceId: number): Observable<RaceModel>{
      return this.http.get<RaceModel>(`${environment.baseUrl}/api/races/${raceId}`);
    }

    bet(raceId: number, ponyId: number): Observable<RaceModel> {
      return this.http.post<RaceModel>(`${environment.baseUrl}/api/races/${raceId}/bets`,{ ponyId });
    }

    cancelBet(raceId: number): Observable<void>{
      return this.http.delete<void>(`${environment.baseUrl}/api/races/${raceId}/bets`);
    }

    live(raceId:number): Observable<Array<PonyWithPositionModel>>{
      return interval(1000).pipe(
        take(101),
        map(position => [
          {id: 1,
            name: 'Superb Runner',
            color: 'BLUE',
            position
          },
          {
            id: 2,
            name: 'Awesome Fridge',
            color: 'GREEN',
            position
          },
          {
            id: 3,
            name: 'Great Bottle',
            color: 'ORANGE',
            position
          },
          {
            id: 4,
            name: 'Little Flower',
            color: 'YELLOW',
            position
          },
          {
            id: 5,
            name: 'Nice Rock',
            color: 'PURPLE',
            position
          }
        ])
      );
    }
  }
    // return of([
    //   {
    //     id: 12,
    //     name: 'Paris',
    //     ponies: [
    //       { id: 1, name: 'Gentle Pie', color: 'YELLOW' },
    //       { id: 2, name: 'Big Soda', color: 'ORANGE' },
    //       { id: 3, name: 'Gentle Bottle', color: 'PURPLE' },
    //       { id: 4, name: 'Superb Whiskey', color: 'GREEN' },
    //       { id: 5, name: 'Fast Rainbow', color: 'BLUE' }
    //     ],
    //     startInstant: '2020-02-18T08:02:00Z'
    //   },
    //   {
    //     id: 13,
    //     name: 'Tokyo',
    //     ponies: [
    //       { id: 6, name: 'Fast Rainbow', color: 'BLUE' },
    //       { id: 7, name: 'Gentle Castle', color: 'GREEN' },
    //       { id: 8, name: 'Awesome Rock', color: 'PURPLE' },
    //       { id: 9, name: 'Little Rainbow', color: 'YELLOW' },
    //       { id: 10, name: 'Great Soda', color: 'ORANGE' }
    //     ],
    //     startInstant: '2020-02-18T08:03:00Z'
    //   }
    // ]).pipe(delay(500));
 