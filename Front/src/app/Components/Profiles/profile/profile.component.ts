import { Component, OnInit } from '@angular/core';
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {CandidatService} from "../../../Services/candidat.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ImageService} from "../../../Services/image.service";
import {map} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ModifierDonneesComponent} from "../modifier-donnees/modifier-donnees.component";
import {RecruteurService} from "../../../Services/recruteur.service";
import {ActivatedRoute} from "@angular/router";
import {ValiderSuppressionProfilComponent} from "../valider-suppression-profil/valider-suppression-profil.component";
import {Offres} from "../../../Entity/Offres";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  public user: any;
  public role: string = "";
  public idUser = 0;
  public idUserConnecte = 0;

  constructor(private userAuthentificationService:UserAuthentificationService,
              private candidatService: CandidatService,
              private recruteurService: RecruteurService,
              private imageService: ImageService,
              public dialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.route.queryParams
          .subscribe(params => {
              this.idUser = params['id']});
      this.getUser();
      this.idUserConnecte = this.userAuthentificationService.getUserId();
  }

    public isLogedIn(){
        return this.userAuthentificationService.isLoggedIn();
    }
    public proprietaireCompte(){
      if (this.idUser == this.idUserConnecte)
          return true;
      else
          return false;
    }

    openDialog() {
        this.dialog.open(ModifierDonneesComponent);
    }

    public getUser(): void{
        this.userAuthentificationService.findUserById(this.idUser)
            .pipe(map(p => this.imageService.createImage(p)))
            .subscribe(
            (responce:any) => {
                this.user = responce;
                this.role = responce.role;

            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }



    public validerSuppressionProfil() {
        this.dialog.open(ValiderSuppressionProfilComponent)
    }
}
