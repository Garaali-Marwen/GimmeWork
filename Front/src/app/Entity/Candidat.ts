import {Image} from "./Image";
import {Offres} from "./Offres";

export interface Candidat {
    id: number;
    nom: string;
    prenom: string;
    mdp: string;
    mail: string;
    adresse: string,
    date_naissance: string;
    fonction: string;
    image: Image;
    cv: [];
    lettre_motivation: [];
    competances: [];
    formations: [];
    postulations: Offres[];


}