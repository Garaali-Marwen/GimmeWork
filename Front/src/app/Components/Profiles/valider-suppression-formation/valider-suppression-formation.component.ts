import {Component, Inject, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {FormationService} from "../../../Services/formation.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-valider-suppression-formation',
  templateUrl: './valider-suppression-formation.component.html',
  styleUrls: ['./valider-suppression-formation.component.css']
})
export class ValiderSuppressionFormationComponent implements OnInit {

  constructor(private formationService: FormationService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  id = 0;
  ngOnInit(): void {
    this.id = this.data.id;
  }

    deleteFormation() {
      this.formationService.deleteFormation(this.id).subscribe(
          (response: void) => {
            window.location.reload();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
      );
    }
}
