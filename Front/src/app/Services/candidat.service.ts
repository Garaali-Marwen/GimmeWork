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


}
