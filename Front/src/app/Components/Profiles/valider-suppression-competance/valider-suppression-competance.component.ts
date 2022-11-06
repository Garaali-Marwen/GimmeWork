import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {CompetanceService} from "../../../Services/competance.service";

@Component({
  selector: 'app-valider-suppression-competance',
  templateUrl: './valider-suppression-competance.component.html',
  styleUrls: ['./valider-suppression-competance.component.css']
})
export class ValiderSuppressionCompetanceComponent implements OnInit {

  id = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private competanceService: CompetanceService) { }

  ngOnInit(): void {
    this.id = this.data.id
  }

  deleteCompetance() {
    this.competanceService.deleteCompetance(this.id).subscribe(
        (response: void) => {
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }


}
