import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Offres} from "../Entity/Offres";

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addOffre(offre: FormData): Observable<Offres>{
    return this.http.post<Offres>(`${this.apiServerUrl}/offres/add`, offre);
  }
}
