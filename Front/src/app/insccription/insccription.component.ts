import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Formation} from "../Entity/Formation";
import {HttpErrorResponse} from "@angular/common/http";
import {CandidatService} from "../Services/candidat.service";
import {Candidat} from "../Entity/Candidat";
import {Image} from "../Entity/Image";

@Component({
  selector: 'app-insccription',
  templateUrl: './insccription.component.html',
  styleUrls: ['./insccription.component.css']
})
export class InsccriptionComponent implements OnInit {

    candidat: Candidat= {
        nom: "",
        prenom: "",
        mdp: "",
        mail: "",
        adresse: "",
        date_naissance: "",
        fonction: "",
        images: [],
        cv: [],
        lettre_motivation: [],
        competances: [],
    }

  constructor(private condidatService: CandidatService) { }

    public inscrit: string = "";

  ngOnInit(): void {}

    public incritCandidat(){
      this.inscrit = 'Candidat';
    }
    public inscritRecruteur(){
      this.inscrit = 'Recruteur';
    }


  public addCondidat(addForm: NgForm): void{
      const candidatFormData = this.prepareFormData(this.candidat)
    this.condidatService.addCondidat(candidatFormData).subscribe(
        (response: Candidat) => {
          window.location.reload()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

    prepareFormData(candidat: Candidat): FormData{
        const formData = new FormData();
        formData.append(
            'candidat',
            new Blob([JSON.stringify(candidat)], {type: 'application/json'})
        );
        formData.append(
            'imageFile',
            candidat.images[0].file,
            candidat.images[0].file.name
        );
        return formData;
    }

    onFileSelected(event: any){
        if (event.target.files){
            const file = event.target.files[0];

            const image: Image = {
                file: file,
                // @ts-ignore
                url: null
            }
            this.candidat.images.push(image);
        }
    }
}
