import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Formation} from "../Entity/Formation";

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  /*public getFormations(): Observable<Formation[]>{
    return this.http.get<Formation[]>(`${this.apiServerUrl}/formation/all`);
  }*/

  public addFormation(formation: Formation): Observable<Formation>{
    return this.http.post<Formation>(`${this.apiServerUrl}/formation/add`, formation);
  }

}
