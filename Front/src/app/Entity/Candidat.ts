import {Image} from "./Image";
import {Formation} from "./Formation";
import {Competance} from "./Competance";

export interface Candidat {
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
    formations: []


}