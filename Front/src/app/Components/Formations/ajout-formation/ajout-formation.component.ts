import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {FormationService} from "../../../Services/formation.service";
import {Formation} from "../../../Entity/Formation";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-ajout-formation',
  templateUrl: './ajout-formation.component.html',
  styleUrls: ['./ajout-formation.component.css']
})
export class AjoutFormationComponent implements OnInit {

    constructor(private formationService: FormationService) { }


    public addFormations(addForm: NgForm): void{
        this.formationService.addFormation(addForm.value).subscribe(
            (response: Formation) => {
                window.location.reload()
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    ngOnInit(): void {
    }

}
