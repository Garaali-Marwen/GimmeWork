package com.Offre_Emploi.Back.Entity;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Candidat extends User{

    private String adresse;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    private Image image ;
    private String fonction;
    private String date_naissance;
    @Column(length = 50000000)
    private byte[] cv;
    @Column(length = 50000000)
    private byte[] lettre_motivation;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "condidat_Competance",
            joinColumns =  @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns =  @JoinColumn(name = "competance_id", referencedColumnName = "id"))
    private Set<Competance> competances = new HashSet<>();
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "condidat_formation",
            joinColumns =  @JoinColumn(name = "user_id"),
            inverseJoinColumns =  @JoinColumn(name = "formation_id"))
    private Set<Formations> formations = new HashSet<>();
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "candidat_offre",
            joinColumns =  @JoinColumn(name = "candidat_id"),
            inverseJoinColumns =  @JoinColumn(name = "offre_id"))
    private Set<Offres> postulations = new HashSet<>();
}
