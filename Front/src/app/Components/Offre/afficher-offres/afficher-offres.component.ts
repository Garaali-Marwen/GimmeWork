import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {RecruteurService} from "../../../Services/recruteur.service";
import {Recruteur} from "../../../Entity/Recruteur";
import {Offres} from "../../../Entity/Offres";
import {map} from "rxjs";
import {ImageService} from "../../../Services/image.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-afficher-offres',
  templateUrl: './afficher-offres.component.html',
  styleUrls: ['./afficher-offres.component.css']
})
export class AfficherOffresComponent implements OnInit {

    centered = false;
    disabled = false;
    unbounded = false;

  public Offres = new Map<Offres,Recruteur>;
  constructor(private recruteurService: RecruteurService,
              private imageService: ImageService,
              private router: Router) { }

  ngOnInit(): void {
    this.getRecruteurs();
  }

  public getRecruteurs(): void{
    this.recruteurService.getRecruteurs()
        .pipe(
            map((x: any[], i) => x.map((offre: Offres) => this.imageService.createImage(offre)))
    )
        .subscribe(
        (responce:Recruteur[]) => {
            for (let rec of responce){
                for (let ofr of rec.offres){
                    this.Offres.set(ofr,rec);
                }
            }
        },
        (error: HttpErrorResponse) => {
            alert(error.message);
        });
  }

  public getDetails(idO: number, idR: number) {
      this.router.navigate(['/detailOffre'], { queryParams: { idO: idO , idR: idR} });
  }
}
