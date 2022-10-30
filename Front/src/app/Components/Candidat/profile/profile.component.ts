import { Component, OnInit } from '@angular/core';
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {CandidatService} from "../../../Services/candidat.service";
import {Candidat} from "../../../Entity/Candidat";
import {HttpErrorResponse} from "@angular/common/http";
import {ImageService} from "../../../Services/image.service";
import {map} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public candidat: any;

  constructor(private userAuthentificationService:UserAuthentificationService, private candidatService: CandidatService,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.getUser();
  }

  public getUser(): void{
    const id = this.userAuthentificationService.getUserId();
    this.candidatService.findCandidatById(id)
        .pipe(map(p => this.imageService.createImage(p)))
        .subscribe(
        (responce:Candidat) => {
          this.candidat = responce;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

}
