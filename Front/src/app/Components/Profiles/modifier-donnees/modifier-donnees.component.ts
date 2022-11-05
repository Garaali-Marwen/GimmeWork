import { Component, OnInit } from '@angular/core';
import {Candidat} from "../../../Entity/Candidat";
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {CandidatService} from "../../../Services/candidat.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Recruteur} from "../../../Entity/Recruteur";
import {RecruteurService} from "../../../Services/recruteur.service";

@Component({
  selector: 'app-modifier-donnees',
  templateUrl: './modifier-donnees.component.html',
  styleUrls: ['./modifier-donnees.component.css']
})
export class ModifierDonneesComponent implements OnInit {

  public user: any;
  public role= "";

  constructor(private userAuthentificationService: UserAuthentificationService,
              private candidatService: CandidatService,
              private recruteurService: RecruteurService) { }

  ngOnInit(): void {
      this.role = this.userAuthentificationService.getRole();
      this.findCandidat(this.userAuthentificationService.getUserId());
  }

  public findCandidat(userId: number): void{
    this.userAuthentificationService.findUserById(userId).subscribe(
        (responce: any) => {
          this.user = responce;
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

    public updateRecruteur(recruteur: Recruteur): void{
        this.recruteurService.updateRecruteur(recruteur).subscribe(
            (response: Recruteur) => {
                window.location.reload()
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

}
