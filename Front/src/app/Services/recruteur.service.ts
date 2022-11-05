import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Candidat} from "../Entity/Candidat";
import {Recruteur} from "../Entity/Recruteur";
import {Offres} from "../Entity/Offres";

@Injectable({
  providedIn: 'root'
})
export class RecruteurService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addRecruteur(recruteur: FormData): Observable<Recruteur>{
    return this.http.post<Recruteur>(`${this.apiServerUrl}/recruteur/add`, recruteur);
  }
  public findRecruteurtById(id: number): Observable<Recruteur>{
    return this.http.get<Recruteur>(`${this.apiServerUrl}/recruteur/${id}`);
  }
  public getRecruteurs(): Observable<Recruteur[]>{
    return this.http.get<Recruteur[]>(`${this.apiServerUrl}/recruteur/all`);
  }

  public deleteRecruteur(recruteurId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/recruteur/delete/${recruteurId}`);
  }

  public updateRecruteur(recruteur: Recruteur): Observable<Recruteur>{
    return this.http.put<Recruteur>(`${this.apiServerUrl}/recruteur/update`, recruteur);
  }
}
