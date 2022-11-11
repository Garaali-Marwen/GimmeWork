import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Candidat} from "../Entity/Candidat";

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addCondidat(candidat: FormData): Observable<Candidat>{
    return this.http.post<Candidat>(`${this.apiServerUrl}/candidat/add`, candidat);
  }

  public findCandidatById(id: number): Observable<Candidat>{
    return this.http.get<Candidat>(`${this.apiServerUrl}/candidat/${id}`);
  }

  public updateCandidat(candidat: Candidat): Observable<Candidat>{
    return this.http.put<Candidat>(`${this.apiServerUrl}/candidat/update`, candidat);
  }

  public updateCandidatPostulation(candidat: Candidat): Observable<Candidat>{
    return this.http.put<Candidat>(`${this.apiServerUrl}/candidat/update/postulation`, candidat);
  }

  public deleteCandidat(candidatId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/candidat/delete/${candidatId}`);
  }

  public updateCandidatImage(candidat: FormData): Observable<Candidat>{
    return this.http.put<Candidat>(`${this.apiServerUrl}/candidat/update/image`, candidat);
  }

  public addPostulationToCandidat(candidatId: number, offreId: number, postulationId: number): Observable<void>{
    return this.http.get<void>(`${this.apiServerUrl}/candidat/postulation/${candidatId}/${offreId}/${postulationId}`);
  }

  public findCandidatByIdPostulation(id: number): Observable<number[]>{
    return this.http.get<number[]>(`${this.apiServerUrl}/candidat/postulation/${id}`);
  }
  public findCandidatsByIdPostulation(id: number): Observable<Candidat>{
    return this.http.get<Candidat>(`${this.apiServerUrl}/candidat/postulations/${id}`);
  }

}
