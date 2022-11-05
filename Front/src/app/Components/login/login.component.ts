import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserAuthentificationService} from "../../Services/user-authentification.service";
import {Router} from "@angular/router";


interface log {
  mail: string;
  mdp: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  authentification: log={
    mail: "",
    mdp: ""
  }

  constructor(private userAuthentificationService:UserAuthentificationService,
              private router: Router) { }

  ngOnInit(): void {
  }


  login(loginForm: NgForm) {
    this.userAuthentificationService.login(this.authentification.mail,this.authentification.mdp).subscribe(
        (response: any) => {
          this.userAuthentificationService.setUserId(response.id);
          this.userAuthentificationService.setRoles(response.role);

          const role = response.role;
          if (role === 'Condidat') {
            window.location.reload()
          }
          else if (role == 'Recruteur'){
              window.location.reload()
          }
        },
        (error) => {
          console.log(error);
          alert("Vérifier vos coordonnées!");
        }
    );
  }

}
