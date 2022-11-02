import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Candidat} from "../Entity/Candidat";
import {Recruteur} from "../Entity/Recruteur";

@Injectable({
  providedIn: 'root'
})
export class RecruteurService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addRecruteur(recruteur: FormData): Observable<Recruteur>{
    return this.http.post<Recruteur>(`${this.apiServerUrl}/recruteur/add`, recruteur);
  }
}
