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
import {Image} from "../../../Entity/Image";
import {Recruteur} from "../../../Entity/Recruteur";
import {Candidat} from "../../../Entity/Candidat";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  public user: any={
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
      num_tel: 0,
      fonction: "",
      cv: [],
      lettre_motivation: [],
      competances: [],
      formations: []
  }
  public role: string = "";
  public idUser = 0;
  public idUserConnecte = 0;
  public imageId: number = 0;

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
      this.getUserImageId();
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


    public updateUserImage(user: any): void{
        const userFormData = this.prepareFormData(this.user)
        if (this.role == 'Recruteur')
            this.recruteurService.updateRecruteurImage(userFormData).subscribe(
                (response: Recruteur) => {
                    this.deleteImage(this.imageId);
                },
                (error: HttpErrorResponse) => {
                    alert(error.message);
                }
            );
        else
            this.candidatService.updateCandidatImage(userFormData).subscribe(
                (response: Candidat) => {
                    this.deleteImage(this.imageId);
                },
                (error: HttpErrorResponse) => {
                    alert(error.message);
                }
            );
    }

    prepareFormData(recruteur: Recruteur): FormData{
        const formData = new FormData();
        formData.append(
            'user',
            new Blob([JSON.stringify(recruteur)], {type: 'application/json'})
        );
        formData.append(
            'imageFile',
            recruteur.image.file,
            recruteur.image.file.name
        );
        return formData;
    }

    onFileSelected(event: any){
        if (event.target.files){
            const file = event.target.files[0];
            console.log(event.target.files[0])

            const image: Image = {
                file: file,
                // @ts-ignore
                url: null
            }
            this.user.image=image;
        }
        this.updateUserImage(this.user);
    }


    public getUserImageId(): void{
        this.userAuthentificationService.findUserById(this.idUser)
            .subscribe(
                (responce:any) => {
                    this.imageId = responce.image.id
                },
                (error: HttpErrorResponse) => {
                    alert(error.message);
                }
            );
    }
    public deleteImage(imageId: number): void{
        this.imageService.deleteImage(imageId).subscribe(
            (response: void) => {
                window.location.reload();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

}
