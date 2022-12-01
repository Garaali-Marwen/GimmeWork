import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {CandidatService} from "../../../Services/candidat.service";
import {Offres} from "../../../Entity/Offres";
import {UserAuthentificationService} from "../../../Services/user-authentification.service";

@Component({
  selector: 'app-offres-recommander',
  templateUrl: './offres-recommander.component.html',
  styleUrls: ['./offres-recommander.component.css']
})
export class OffresRecommanderComponent implements OnInit {

  constructor(private candidatService: CandidatService,
              private userAuthentificationService: UserAuthentificationService) { }


  public p: number = 1;
  public centered = false;
  public unbounded = false;
  public checked = false;
  public disabled = false;
  public offres: Offres[] = [];


  ngOnInit(): void {
    this.getRecruteurs();
  }

  public getRecruteurs(): void{
    this.candidatService.findOffresForCandidat(this.userAuthentificationService.getUserId())
        .subscribe(
            (responce:Offres[]) => {
              this.offres = responce
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            });
  }

}
