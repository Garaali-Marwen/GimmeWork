import { Component, OnInit } from '@angular/core';
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {CandidatService} from "../../../Services/candidat.service";
import {Candidat} from "../../../Entity/Candidat";
import {HttpErrorResponse} from "@angular/common/http";
import {ImageService} from "../../../Services/image.service";
import {map} from "rxjs";
import {Competance} from "../../../Entity/Competance";
import {CompetanceService} from "../../../Services/competance.service";
import {NgForm} from "@angular/forms";
import {Formation} from "../../../Entity/Formation";
import {FormationService} from "../../../Services/formation.service";
import {MatDialog} from "@angular/material/dialog";
import {ModifierDonneesComponent} from "../modifier-donnees/modifier-donnees.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    public addcompetances : boolean = false;
    public addformations: boolean = false;

  public candidat: any;
  public competance: Competance = {
    id: 0,
    nom: "",
    niveau: 0,
  }

  public formation: Formation = {
      date: "",
      centre_formation: "",
      titre: "",
      id: 0
  }

  constructor(private userAuthentificationService:UserAuthentificationService,
              private candidatService: CandidatService,
              private imageService: ImageService,
              private competanceService: CompetanceService,
              private formationService:FormationService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUser();
  }

    openDialog() {
        this.dialog.open(ModifierDonneesComponent);
    }

  public getUser(): void{
    const id = this.userAuthentificationService.getUserId();
    this.candidatService.findCandidatById(id)
        .pipe(map(p => this.imageService.createImage(p)))
        .subscribe(
        (responce:Candidat) => {
          this.candidat = responce;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  public addCompetance(addForm: NgForm) {
    this.competanceService.addCompetance(this.competance).subscribe(
        (response: Competance) => {
          this.addCompetanceToCandidat(this.userAuthentificationService.getUserId(), response.id)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  public addCompetanceToCandidat(candidatId: number, competanceId: number): void{
    this.competanceService.addCompetanceToCandidat(candidatId,competanceId).subscribe(
        (response: void) => {
          window.location.reload()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

    public addFormations(addFormation: NgForm) {
        this.formationService.addFormation(this.formation).subscribe(
            (response: Formation) => {
                this.addFormationToCandidat(this.userAuthentificationService.getUserId(), response.id)
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public addFormationToCandidat(candidatId: number, formationId: number): void{
        this.formationService.addFormationToCandidat(candidatId,formationId).subscribe(
            (response: void) => {
                window.location.reload()
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public addComp(): void{
      this.addcompetances = !this.addcompetances;
    }

    public addFormat(): void{
          this.addformations = !this.addformations;
    }
}
