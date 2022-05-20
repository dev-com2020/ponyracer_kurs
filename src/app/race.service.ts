import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PonyWithPositionModel } from './models/pony.model';

import { RaceModel,LiveRaceModel } from './models/race.model';
import { WsService } from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

constructor(private http: HttpClient, private wsService: WsService) {}

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
      return this.wsService.connect<LiveRaceModel>(`/race/${raceId}`).pipe(map(liveRace => liveRace.ponies));
    }
  }
 