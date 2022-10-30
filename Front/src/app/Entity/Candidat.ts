import {Image} from "./Image";

export interface Candidat {
    nom: string;
    prenom: string;
    mdp: string;
    mail: string;
    adresse: string,
    date_naissance: string;
    fonction: string;
    images: Image[];
    cv: [];
    lettre_motivation: [];
    competances: [];


}