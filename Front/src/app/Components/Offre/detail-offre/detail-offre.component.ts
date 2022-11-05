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
              private router: Router,) { }

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
    disponibilite: ""
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
  private idO = 0;
  private idR = 0;

  public role: string = "";
  ngOnInit(): void {
    this.role = this.userAuthentificationService.getRole();
    this.route.queryParams
        .subscribe(params => {
          this.idO = params['idO']
          this.idR = params['idR']});
    this.getOffre();
    this.getRecruteur();
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
}
