import { Component, OnInit } from '@angular/core';
import {UserAuthentificationService} from "../../Services/user-authentification.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {map} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ImageService} from "../../Services/image.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private userAuthentificationService:UserAuthentificationService,
              private router: Router,
              public dialog: MatDialog,
              private imageService:ImageService) { }

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
  private idUser: number = 0;

  ngOnInit(): void {
    if (this.isLogedIn()){
      this.getUser();
    }
  }

  openDialog() {
    this.dialog.open(LoginComponent);
  }


  public isLogedIn(){
    return this.userAuthentificationService.isLoggedIn();
  }

  public afficherOffre(){
    this.router.navigate(['/offres']);
    setTimeout(function(){
      window.location.reload();
    }, 1);
  }

  public logout(){
    this.userAuthentificationService.clear();
    this.router.navigate(['/']);
  }

  public isRecruteur(){
    const role = this.userAuthentificationService.getRole();
    if (role == 'Recruteur')
      return true;
    else return false;
  }

  public isCandidat(){
    const role = this.userAuthentificationService.getRole();
    if (role == 'Condidat')
      return true;
    else return false;
  }

  public afficherProfile() {
    this.idUser = this.userAuthentificationService.getUserId();
    this.router.navigate(['/profile'], { queryParams: { id: this.idUser }});
    setTimeout(function(){
      window.location.reload();
    }, 1);
  }

  public getUser(): void{
    this.userAuthentificationService.findUserById(this.userAuthentificationService.getUserId())
        .pipe(map(p => this.imageService.createImage(p)))
        .subscribe(
            (responce:any) => {
              this.user = responce;
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
        );
  }

}
