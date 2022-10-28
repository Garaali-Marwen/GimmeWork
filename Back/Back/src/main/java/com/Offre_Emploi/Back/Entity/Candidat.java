package com.Offre_Emploi.Back.Entity;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Candidat extends User{

    private String adresse;
    @Column(length = 50000000)
    private byte[] image;
    private String mail;
    private String date_naissance;
    @Column(length = 50000000)
    private byte[] cv;
    @Column(length = 50000000)
    private byte[] lettre_motivation;
    @ElementCollection
    private Set<String> competances = new HashSet<>();
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "condidat_formation",
            joinColumns =  @JoinColumn(name = "user_id"),
            inverseJoinColumns =  @JoinColumn(name = "formation_id"))
    private Set<Formations> formations = new HashSet<>();
}
