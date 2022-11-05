import {Component, Inject, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Candidat} from "../../../Entity/Candidat";
import {OffreService} from "../../../Services/offre.service";
import {Offres} from "../../../Entity/Offres";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-modifier-offre',
  templateUrl: './modifier-offre.component.html',
  styleUrls: ['./modifier-offre.component.css']
})
export class ModifierOffreComponent implements OnInit {

  constructor(private offreService: OffreService,
              @Inject(MAT_DIALOG_DATA) public data: any,) { }

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
  ngOnInit(): void {
      this.findOffre(this.data.id)
  }

  public findOffre(offreId: number): void{
    this.offreService.findOffreById(offreId).subscribe(
        (responce: any) => {
          this.offre = responce;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    )
  }

  public updateOffre(offres: Offres): void{
    this.offreService.updateOffre(offres).subscribe(
        (response: Offres) => {
          window.location.reload()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

}
