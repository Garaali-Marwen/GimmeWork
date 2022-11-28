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
    cv: {
      file : new File([],""),
      url : ""
    },
    lettre_motivation: {
      file : new File([],""),
      url : ""
    },
    competances: [],
    formations: []
  }
  private idUser: number = 0;
  public role: string = "";
  ngOnInit(): void {
    if (this.isLogedIn() && this.userAuthentificationService.getRole() != 'Admin'){
      this.getUser();
    }
    this.role= this.userAuthentificationService.getRole();

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
    setTimeout(function(){
      window.location.reload();
    }, 1);
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
