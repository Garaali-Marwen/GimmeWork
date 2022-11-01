import { Component, OnInit } from '@angular/core';
import {Candidat} from "../../../Entity/Candidat";
import {Recruteur} from "../../../Entity/Recruteur";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-inscription-recruteur',
  templateUrl: './inscription-recruteur.component.html',
  styleUrls: ['./inscription-recruteur.component.css']
})
export class InscriptionRecruteurComponent implements OnInit {

  recruteur: Recruteur= {
    nom: "",
    prenom: "",
    mdp: "",
    mail: "",
    adresse: "",
    date_naissance: "",
    num_tel: 0,
    image: {
      file : new File([],""),
      url : ""
    },
    role: "",
    id: 0,
  }
  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected($event: Event) {

  }

  addRecruteur(addForm: NgForm) {

  }
}
