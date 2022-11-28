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
import {ModifierOffreComponent} from "../modifier-offre/modifier-offre.component";
import {DatePipe} from "@angular/common";
@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css'],
    providers: [DatePipe]
})
export class OffresComponent implements OnInit {

    centered = false;
    disabled = false;

    public offre: Offres = {
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
        postulations: []
    }

    public addoffre: boolean = false;
    public recruteurOfres: Offres[] = [];
    public idUser = 0;
    private idUserConnecte = 0;
    public recruteur: any;
    myDate = new Date();
    date: any;
      constructor(private userAuthentificationService:UserAuthentificationService,
                  private offreService: OffreService,
                  private recruteurService: RecruteurService,
                  public dialog: MatDialog,
                  private route: ActivatedRoute,
                  private router: Router,
                  private datePipe: DatePipe){
          this.date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
      }



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
          this.offre.date_ajout = this.date;
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
            width: "800px",
            height: "90vh",
            data:{
                id: idOffre
            },
        })
    }

}
