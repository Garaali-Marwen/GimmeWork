import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Formation} from "../Entity/Formation";
import {Observable} from "rxjs";
import {Competance} from "../Entity/Competance";

@Injectable({
  providedIn: 'root'
})
export class CompetanceService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }


  public addCompetance(competance: Competance): Observable<Competance>{
    return this.http.post<Competance>(`${this.apiServerUrl}/competance/add`, competance);
  }

  public addCompetanceToCandidat(candidatId: number, competanceId: number): Observable<void>{
    return this.http.get<void>(`${this.apiServerUrl}/candidat/competance/${candidatId}/${competanceId}`);
  }
}
