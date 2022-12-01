import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./Components/Profiles/profile/profile.component";
import {AfficherOffresComponent} from "./Components/Offre/afficher-offres/afficher-offres.component";
import {DetailOffreComponent} from "./Components/Offre/detail-offre/detail-offre.component";
import {UtilisateursComponent} from "./Components/Admin/utilisateurs/utilisateurs.component";
import {StatistiquesComponent} from "./Components/Admin/Statis/statistiques/statistiques.component";
import {CvComponent} from "./Components/CV/cv/cv.component";
import {AideComponent} from "./Components/aide/aide.component";

const routes: Routes = [
  {path: 'profile', component:ProfileComponent},
  {path: 'offres', component:AfficherOffresComponent},
  {path: 'detailOffre', component:DetailOffreComponent},
  {path: 'users', component:UtilisateursComponent},
  {path: 'statistiques', component:StatistiquesComponent},
  {path: 'cv', component:CvComponent},
  {path: 'help', component:AideComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
