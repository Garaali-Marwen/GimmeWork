import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import {RecruteurService} from "../../../Services/recruteur.service";
import {Recruteur} from "../../../Entity/Recruteur";

@Component({
  selector: 'app-postulation-candidat',
  templateUrl: './postulation-candidat.component.html',
  styleUrls: ['./postulation-candidat.component.css']
})
export class PostulationCandidatComponent implements OnInit {

  constructor(private userAuthentificationService: UserAuthentificationService,
              private route: ActivatedRoute,
              config: NgbCarouselConfig,
              private recruteurService: RecruteurService,
              private router: Router) {
      config.showNavigationArrows = true;
      config.showNavigationIndicators = true;
  }

  idUser = 0;
  postulations: any[] = [];
  ngOnInit(): void {
    this.route.queryParams
        .subscribe(params => {
          this.idUser = params['id']});
    this.getUser();
  }

  public getUser(): void{
    this.userAuthentificationService.findUserById(this.idUser)
        .subscribe(
            (responce:any) => {
              this.postulations = responce.postulations;
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
        );
  }

    public getDetails(idOffre: number): void{
        this.recruteurService.findRecruteurByIdOffre(idOffre).subscribe(
            (responce:Recruteur) => {
                this.router.navigate(['/detailOffre'], { queryParams: { idO: idOffre , idR: responce.id} });
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }
}
