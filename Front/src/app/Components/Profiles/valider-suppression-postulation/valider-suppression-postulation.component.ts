import {Component, Inject, OnInit} from '@angular/core';
import {Candidat} from "../../../Entity/Candidat";
import {HttpErrorResponse} from "@angular/common/http";
import {CandidatService} from "../../../Services/candidat.service";
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-valider-suppression-postulation',
  templateUrl: './valider-suppression-postulation.component.html',
  styleUrls: ['./valider-suppression-postulation.component.css']
})
export class ValiderSuppressionPostulationComponent implements OnInit {

  public candidat: Candidat={
      id:0,
    nom: "",
    prenom: "",
    mdp: "",
    mail: "",
    adresse: "",
    date_naissance: "",
    fonction: "",
    image: {
      file : new File([],""),
      url : ""
    },
    cv: [],
    lettre_motivation: [],
    competances: [],
    formations: [],
    postulations: []
  }

  constructor(private candidatService: CandidatService,
              private userAuthentificationService: UserAuthentificationService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  public deletePostulation(idOffre: number): void{
    this.candidatService.findCandidatById(this.userAuthentificationService.getUserId())
        .subscribe(
            (responce:Candidat) => {
              this.candidat = responce;
              this.candidat.postulations.forEach((element,index)=>{
                if(element.id==idOffre) this.candidat.postulations.splice(index, 1);
              });
              this.updateCandidatPostulations(this.candidat)
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
        );
  }

  public updateCandidatPostulations(candidat: any): void{
    this.candidatService.updateCandidatPostulation(candidat).subscribe(
        (response: Candidat) => {
          window.location.reload()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

}
