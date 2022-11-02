package com.Offre_Emploi.Back.Entity;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Recruteur extends User{

    private int num_tel;
    private String adresse;
    private String date_naissance;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    private Image image ;
    @OneToMany(mappedBy = "recruteur")
    private Set<Offres> offres = new HashSet<>();
}

