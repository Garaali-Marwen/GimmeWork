import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {FormationService} from "./Services/formation.service";
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { ProfileComponent } from './Components/Profiles/profile/profile.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { InsccriptionComponent } from './Components/Inscription/insccription/insccription.component';
import { LoginComponent } from './Components/login/login.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatRippleModule} from "@angular/material/core";
import {MatSliderModule} from "@angular/material/slider";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModifierDonneesComponent } from './Components/Profiles/modifier-donnees/modifier-donnees.component';
import { InscriptionRecruteurComponent } from './Components/Inscription/inscription-recruteur/inscription-recruteur.component';
import { InscriptionCandidatComponent } from './Components/Inscription/inscription-candidat/inscription-candidat.component';
import { OffresComponent } from './Components/Offre/offres/offres.component';
import { CompetancesComponent } from './Components/Profiles/competances/competances.component';
import { FormationsComponent } from './Components/Profiles/formations/formations.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDividerModule} from "@angular/material/divider";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import { AfficherOffresComponent } from './Components/Offre/afficher-offres/afficher-offres.component';
import { DetailOffreComponent } from './Components/Offre/detail-offre/detail-offre.component';
import {MatTableModule} from "@angular/material/table";
import { ValiderSuppressionComponent } from './Components/Offre/valider-suppression/valider-suppression.component';
import { ValiderSuppressionProfilComponent } from './Components/Profiles/valider-suppression-profil/valider-suppression-profil.component';
import { ModifierOffreComponent } from './Components/Offre/modifier-offre/modifier-offre.component';
import { ModifierCompetanceComponent } from './Components/Profiles/modifier-competance/modifier-competance.component';
import { ValiderSuppressionCompetanceComponent } from './Components/Profiles/valider-suppression-competance/valider-suppression-competance.component';
import { ModifierFormationComponent } from './Components/Profiles/modifier-formation/modifier-formation.component';
import { ValiderSuppressionFormationComponent } from './Components/Profiles/valider-suppression-formation/valider-suppression-formation.component';
import { PostulationCandidatComponent } from './Components/Profiles/postulation-candidat/postulation-candidat.component';
import { ValiderSuppressionPostulationComponent } from './Components/Profiles/valider-suppression-postulation/valider-suppression-postulation.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { AfficherOffresPublicComponent } from './Components/OffrePublic/afficher-offres-public/afficher-offres-public.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTabsModule} from "@angular/material/tabs";
import {NgxPaginationModule} from "ngx-pagination";
import {PdfViewerModule} from "ng2-pdf-viewer";
import { AddPostulationComponent } from './Components/Offre/add-postulation/add-postulation.component';
import { FooterComponent } from './Components/footer/footer.component';
import { UtilisateursComponent } from './Components/Admin/utilisateurs/utilisateurs.component';
import { ValiderSuppressionUserComponent } from './Components/Admin/valider-suppression-user/valider-suppression-user.component';
import { StatistiquesComponent } from './Components/Admin/Statis/statistiques/statistiques.component';
import { TestComponent } from './test/test.component';
import { AreaChartsBasicComponent } from './Components/Admin/Statis/area-charts-basic/area-charts-basic.component';
import {NgApexchartsModule} from "ng-apexcharts";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProfileComponent,
    InsccriptionComponent,
    LoginComponent,
    ModifierDonneesComponent,
    InscriptionRecruteurComponent,
    InscriptionCandidatComponent,
    OffresComponent,
    CompetancesComponent,
    FormationsComponent,
    AfficherOffresComponent,
    DetailOffreComponent,
    ValiderSuppressionComponent,
    ValiderSuppressionProfilComponent,
    ModifierOffreComponent,
    ModifierCompetanceComponent,
    ValiderSuppressionCompetanceComponent,
    ModifierFormationComponent,
    ValiderSuppressionFormationComponent,
    PostulationCandidatComponent,
    ValiderSuppressionPostulationComponent,
    AfficherOffresPublicComponent,
    AddPostulationComponent,
    FooterComponent,
    UtilisateursComponent,
    ValiderSuppressionUserComponent,
    StatistiquesComponent,
    TestComponent,
    AreaChartsBasicComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        FormsModule,
        HttpClientModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatDialogModule,
        MatRippleModule,
        MatSliderModule,
        NgbModule,
        MatDatepickerModule,
        MatDividerModule,
        MatRadioModule,
        MatSelectModule,
        MatTableModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatTabsModule,
        NgxPaginationModule,
        PdfViewerModule,
        NgApexchartsModule,
    ],
  providers: [
      FormationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
