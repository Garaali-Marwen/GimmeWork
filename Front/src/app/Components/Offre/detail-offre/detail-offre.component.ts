import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OffreService} from "../../../Services/offre.service";
import {map} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Offres} from "../../../Entity/Offres";
import {Recruteur} from "../../../Entity/Recruteur";
import {ImageService} from "../../../Services/image.service";
import {RecruteurService} from "../../../Services/recruteur.service";
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {CandidatService} from "../../../Services/candidat.service";
import {Candidat} from "../../../Entity/Candidat";
import {ModifierFormationComponent} from "../../Profiles/modifier-formation/modifier-formation.component";
import {MatDialog} from "@angular/material/dialog";
import {
    ValiderSuppressionPostulationComponent
} from "../../Profiles/valider-suppression-postulation/valider-suppression-postulation.component";
import {LoginComponent} from "../../login/login.component";

@Component({
  selector: 'app-detail-offre',
  templateUrl: './detail-offre.component.html',
  styleUrls: ['./detail-offre.component.css']
})
export class DetailOffreComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private offreService: OffreService,
              private imageService: ImageService,
              private recruteurService: RecruteurService,
              private userAuthentificationService: UserAuthentificationService,
              private router: Router,
              private candidatService: CandidatService,
              public dialog: MatDialog) { }

  public offre: Offres={
    id: 0,
    titre: "",
    date_ajout: "",
    date_expiration: "",
    description: "",
    domaine: "",
    type_poste: "",
    lieu: "",
    experience: "",
    etude: "",
    salaire: 0,
    disponibilite: "",
    candidats: []
  };
  public recruteur: Recruteur= {
    nom: "",
    prenom: "",
    mdp: "",
    mail: "",
    adresse: "",
    date_naissance: "",
    image: {
      file : new File([],""),
      url : ""
    },
    role: "",
    id: 0,
    offres: [],
    num_tel: 0
  }

    public candidats: Candidat[] = [];
  private idO = 0;
  private idR = 0;
  id = 0;
  idCandidat =0
  postuler = true;

  public role: string = "";
  ngOnInit(): void {
    this.role = this.userAuthentificationService.getRole();
    this.route.queryParams
        .subscribe(params => {
          this.idO = params['idO']
          this.idR = params['idR']});
    this.getOffre();
    this.getRecruteur();
    this.id = this.userAuthentificationService.getUserId();
    this.idCandidat = this.userAuthentificationService.getUserId();
    this.getIdCandidat(this.idO);
    this.getCandidatPostulees(this.idO);
  }

  public getOffre(): void{
    this.offreService.findOffreById(this.idO).subscribe(
        (responce:Offres) => {
              this.offre = responce;
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
        );
  }


  public getRecruteur(): void{
    this.recruteurService.findRecruteurtById(this.idR)
        .pipe(map(p => this.imageService.createImage(p)))
        .subscribe(
            (responce:Recruteur) => {
              this.recruteur = responce;
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
        );
  }


  public afficherProfile(idUser: number) {
    this.router.navigate(['/profile'], { queryParams: { id: idUser }});
  }

  public addoffreToCandidat(candidatId: number, offreId: number): void{
    this.candidatService.addOffreToCandidat(candidatId,offreId).subscribe(
        (response: void) => {
          window.location.reload()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  public getIdCandidat(idOffre: number): void{
    this.candidatService.findCandidatByIdPostulation(idOffre).subscribe(
        (responce:any) => {
          this.postule(responce);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  public postule(idCandidats: number[]){
    for (let i of idCandidats){
      if (i == this.idCandidat)
        this.postuler = false
    }
  }

    public deletePostulation(id: number) {
        this.dialog.open(ValiderSuppressionPostulationComponent, {
            data: {
                id: id
            },
        })
    }

    public isLogedIn(){
        return this.userAuthentificationService.isLoggedIn();
    }

    public isRecruteur(){
      if (this.userAuthentificationService.getUserId() == this.idR)
          return true;
        else return false;
    }

    openLogin() {
        this.dialog.open(LoginComponent);
    }

    public getCandidatPostulees(idOffre: number): void{
        this.candidatService.findCandidatsByIdPostulation(idOffre)
            .pipe(
                map((x: any[], i) => x.map((offre: Offres) => this.imageService.createImage(offre))))
            .subscribe(
                (responce:Candidat[]) => {
                    this.candidats = responce;
                },
                (error: HttpErrorResponse) => {
                    alert(error.message);
                }
            );
    }
}
