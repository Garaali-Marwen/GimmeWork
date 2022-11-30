import { Component, OnInit } from '@angular/core';
import {OffrePublicService} from "../../../Services/offre-public.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {OffresPublic} from "../../../Entity/OffresPublic";


@Component({
  selector: 'app-afficher-offres-linkedin',
  templateUrl: './afficher-offres-linkedin.component.html',
  styleUrls: ['./afficher-offres-linkedin.component.css']
})
export class AfficherOffresLinkedinComponent implements OnInit {

  centered = false;
  unbounded = false;
  checked = false;
  disabled = false;
  public OffresPublic: OffresPublic[] = [];
  constructor(private offrePublicService: OffrePublicService,
              private router: Router) { }


  p: number = 1;


  ngOnInit(): void {
    this.getOffresPublic();
  }

  public getOffresPublic(): void{
    this.offrePublicService.getOffresPublic()
        .subscribe(
            (responce:OffresPublic[]) => {
              for (let o of responce){
                if (o.source == 'Linkedin')
                  this.OffresPublic.push(o);
              }

            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            });
  }

  public visiter(url: string){
    window.open(url);
  }
}
