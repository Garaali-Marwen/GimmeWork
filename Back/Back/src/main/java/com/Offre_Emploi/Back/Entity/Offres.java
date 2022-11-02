package com.Offre_Emploi.Back.Entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
public class Offres {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String titre;
    private LocalDate date_ajout;
    private LocalDate date_expiration;
    private String description;
    private String domaine;
    @ManyToOne
    private Recruteur recruteur;

}
