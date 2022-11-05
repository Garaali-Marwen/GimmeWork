import { Component, OnInit } from '@angular/core';
import {Offres} from "../../../Entity/Offres";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {OffreService} from "../../../Services/offre.service";
import {RecruteurService} from "../../../Services/recruteur.service";
import {Recruteur} from "../../../Entity/Recruteur";
import {MatDialog} from "@angular/material/dialog";
import {ValiderSuppressionComponent} from "../valider-suppression/valider-suppression.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ModifierDonneesComponent} from "../../Profiles/modifier-donnees/modifier-donnees.component";
import {ModifierOffreComponent} from "../modifier-offre/modifier-offre.component";
@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {

    centered = false;
    disabled = false;
    unbounded = false;

    maDate = new Date();
    d = this.maDate.getFullYear().toString()+'-'+this.maDate.getMonth().toString()+'-'+this.maDate.getDate().toString();
    public offre: Offres = {
        id: 0,
        titre: "",
        date_ajout: this.d,
        date_expiration: "",
        description: "",
        domaine: "",
        type_poste: "",
        lieu: "",
        experience: "",
        etude: "",
        salaire: 0,
        disponibilite: "",
    }

    public addoffre: boolean = false;
    public recruteurOfres: Offres[] = [];
    public idUser = 0;
    private idUserConnecte = 0;
    public recruteur: any;
      constructor(private userAuthentificationService:UserAuthentificationService,
                  private offreService: OffreService,
                  private recruteurService: RecruteurService,
                  public dialog: MatDialog,
                  private route: ActivatedRoute,
                  private router: Router) {}



      ngOnInit(): void {
          this.route.queryParams
              .subscribe(params => {
                  this.idUser = params['id']});
          this.idUserConnecte = this.userAuthentificationService.getUserId();
        this.getUser();
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

      public validerSuppression(idOffre: number){
          this.dialog.open(ValiderSuppressionComponent, {
              data:{
                  id: idOffre
              },
          })
      }

      public getUser(): void{
        this.recruteurService.findRecruteurtById(this.idUser)
            .subscribe(
                (responce:Recruteur) => {
                  this.recruteurOfres = responce.offres;
                  this.recruteur = responce;
                },
                (error: HttpErrorResponse) => {
                  alert(error.message);
                }
            );
      }

      public addOffres(addForm: NgForm) {
        this.offreService.addOffre(this.offre).subscribe(
            (response: Offres) => {
              this.addOffreToRecruteur(this.userAuthentificationService.getUserId(), response.id)
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
        );
      }
      public addOffreToRecruteur(recruteurId: number, offreId: number): void{
        this.offreService.addOffreToRecruteur(recruteurId,offreId).subscribe(
            (response: void) => {
              window.location.reload()
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
        );
      }

    ajoutOffre() {
        this.addoffre = !this.addoffre;
      }

    public getDetails(idO: number, idR: number) {
        this.router.navigate(['/detailOffre'], { queryParams: { idO: idO , idR: idR} });
    }

    public modifier(idOffre: number){
        this.dialog.open(ModifierOffreComponent, {
            data:{
                id: idOffre
            },
        })
    }

}
