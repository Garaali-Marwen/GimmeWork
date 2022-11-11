package com.Offre_Emploi.Back.Entity;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Offres {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String titre;
    private String date_ajout;
    private String date_expiration;
    @Column(length = 5000)
    private String description;
    private String domaine;
    private String type_poste;
    private String lieu;
    private String experience;
    private String etude;
    private Double salaire;
    private String disponibilite;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "offre_id", referencedColumnName = "id")
    private Set<Postulation> postulations = new HashSet<>();

}
