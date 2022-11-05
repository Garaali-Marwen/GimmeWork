import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./Components/Profiles/profile/profile.component";
import {AfficherOffresComponent} from "./Components/Offre/afficher-offres/afficher-offres.component";
import {DetailOffreComponent} from "./Components/Offre/detail-offre/detail-offre.component";

const routes: Routes = [
  {path: 'profile', component:ProfileComponent},
  {path: 'offres', component:AfficherOffresComponent},
  {path: 'detailOffre', component:DetailOffreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
