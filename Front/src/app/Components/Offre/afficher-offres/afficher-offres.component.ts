import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {RecruteurService} from "../../../Services/recruteur.service";
import {Recruteur} from "../../../Entity/Recruteur";
import {Offres} from "../../../Entity/Offres";
import {debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject} from "rxjs";
import {ImageService} from "../../../Services/image.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {OffrePublicService} from "../../../Services/offre-public.service";
import {OffresPublic} from "../../../Entity/OffresPublic";


@Component({
  selector: 'app-afficher-offres',
  templateUrl: './afficher-offres.component.html',
  styleUrls: ['./afficher-offres.component.css']
})
export class AfficherOffresComponent implements OnInit {


    public offresTitres: string[] = [];
    public offresLieu: string[] = [];
    public titre: any;
    public lieu: any;
    public domaine :any;

    formatter = (result: string) => result.toUpperCase();

    searchbytitre: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map((term) =>
                term === '' ? [] : this.offresTitres.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
            ),
        );

    searchbylieu: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map((term) =>
                term === '' ? [] : this.offresLieu.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
            ),
        );
    centered = false;
    unbounded = false;
    checked = false;
    disabled = false;
    public filtrer = false;
    public recherche = false;
    public rechercheParTitre = false;
    public rechercheParLieu = false;
    public rechercheParDomaine = false;
    public aucuneOffre = false;
    public OffresPublic: OffresPublic[] = [];


  public Offres = new Map<Offres,Recruteur>;
  constructor(private recruteurService: RecruteurService,
              private imageService: ImageService,
              private router: Router,
              private offrePublicService:OffrePublicService) { }

  ngOnInit(): void {
    this.getRecruteurs();
  }


  public rechercheByDomaine(){
      this.rechercheParDomaine = !this.rechercheParDomaine;
  }
  public rechercheByTitre(){
      this.rechercheParTitre = ! this.rechercheParTitre;
  }
    public rechercheByLieu(){
        this.rechercheParLieu = ! this.rechercheParLieu;
    }
  public activerRecherche(){
      this.recherche = !this.recherche;
  }

    public desactiverRecherche(){
        this.recherche = !this.recherche;
        window.location.reload();
    }

  public getRecruteurs(): void{
    this.recruteurService.getRecruteurs()
        .pipe(
            map((x: any[], i) => x.map((offre: Offres) => this.imageService.createImage(offre)))
    )
        .subscribe(
        (responce:Recruteur[]) => {
            for (let rec of responce){
                for (let ofr of rec.offres){
                    this.Offres.set(ofr,rec);
                    this.offresTitres.push(ofr.titre);
                    this.offresLieu.push(ofr.lieu)
                }
            }
            this.offrePublicService.getOffresPublic()
                .subscribe(
                    (responce:OffresPublic[]) => {
                        for (let ofr of responce){
                            this.offresTitres.push(ofr.title);
                        }
                    },
                    (error: HttpErrorResponse) => {
                        alert(error.message);
                    });

        },
        (error: HttpErrorResponse) => {
            alert(error.message);
        });
  }

  public getDetails(idO: number, idR: number) {
      this.router.navigate(['/detailOffre'], { queryParams: { idO: idO , idR: idR} });
  }

    public chercher(addForm: NgForm) {
        this.recruteurService.getRecruteurs()
            .pipe(
                map((x: any[], i) => x.map((offre: Offres) => this.imageService.createImage(offre)))
            )
            .subscribe(
                (responce:Recruteur[]) => {
                    this.Offres.clear();
                    if (this.rechercheParTitre && !this.rechercheParLieu && !this.rechercheParDomaine)
                    {
                        for (let rec of responce){
                            for (let ofr of rec.offres) {
                                if (ofr.titre == this.titre)
                                    this.Offres.set(ofr,rec);
                            }
                        }
                    }
                    else if (!this.rechercheParTitre && this.rechercheParLieu && !this.rechercheParDomaine)
                    {
                        for (let rec of responce){
                            for (let ofr of rec.offres) {
                                if (ofr.lieu == this.lieu)
                                    this.Offres.set(ofr,rec);
                            }
                        }
                    }
                    else if (!this.rechercheParTitre && !this.rechercheParLieu && this.rechercheParDomaine)
                    {
                        for (let rec of responce){
                            for (let ofr of rec.offres) {
                                if (ofr.domaine == this.domaine)
                                    this.Offres.set(ofr,rec);
                            }
                        }
                    }
                    else if(this.rechercheParTitre && this.rechercheParLieu && !this.rechercheParDomaine)
                    {
                        for (let rec of responce) {
                            for (let ofr of rec.offres) {
                                if (ofr.lieu == this.lieu && ofr.titre == this.titre)
                                    this.Offres.set(ofr, rec);
                            }
                        }
                    }
                    else if(!this.rechercheParTitre && this.rechercheParLieu && this.rechercheParDomaine)
                    {
                        for (let rec of responce) {
                            for (let ofr of rec.offres) {
                                if (ofr.lieu == this.lieu && ofr.domaine == this.domaine)
                                    this.Offres.set(ofr, rec);
                            }
                        }
                    }
                    else if(this.rechercheParTitre && !this.rechercheParLieu && this.rechercheParDomaine)
                    {
                        for (let rec of responce) {
                            for (let ofr of rec.offres) {
                                if (ofr.domaine == this.domaine && ofr.titre == this.titre)
                                    this.Offres.set(ofr, rec);
                            }
                        }
                    }
                    else if(this.rechercheParTitre && this.rechercheParLieu && this.rechercheParDomaine)
                    {
                        for (let rec of responce) {
                            for (let ofr of rec.offres) {
                                if (ofr.lieu == this.lieu && ofr.titre == this.titre && ofr.domaine == this.domaine)
                                    this.Offres.set(ofr, rec);
                            }
                        }
                    }
                    this.filtrer = true;
                    if (this.Offres.size == 0){
                        this.aucuneOffre = true
                    }
                },
                (error: HttpErrorResponse) => {
                    alert(error.message);
                });
    }
}
