import { Component, OnInit } from '@angular/core';
import {Candidat} from "../../../Entity/Candidat";
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {CandidatService} from "../../../Services/candidat.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-modifier-donnees',
  templateUrl: './modifier-donnees.component.html',
  styleUrls: ['./modifier-donnees.component.css']
})
export class ModifierDonneesComponent implements OnInit {

  public candidat: any;

  constructor(private userAuthentificationService: UserAuthentificationService,
              private candidatService: CandidatService) { }

  ngOnInit(): void {
    this.findCandidat(this.userAuthentificationService.getUserId());
  }

  public findCandidat(candidatId: number): void{
    this.candidatService.findCandidatById(candidatId).subscribe(
        (responce: Candidat) => {
          this.candidat = responce;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    )
  }

  public updateCandidat(candidat: Candidat): void{
    this.candidatService.updateCandidat(candidat).subscribe(
        (response: Candidat) => {
          window.location.reload()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

}
