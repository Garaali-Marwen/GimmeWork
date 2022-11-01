import { Component, OnInit } from '@angular/core';
import {UserAuthentificationService} from "../../Services/user-authentification.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {InsccriptionComponent} from "../Inscription/insccription/insccription.component";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private userAuthentificationService:UserAuthentificationService,
              private router: Router,
              public dialog: MatDialog) { }


  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(LoginComponent);
  }

  openDialogSignin() {
    this.dialog.open(InsccriptionComponent);
  }

  public isLogedIn(){
    return this.userAuthentificationService.isLoggedIn();
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

}
