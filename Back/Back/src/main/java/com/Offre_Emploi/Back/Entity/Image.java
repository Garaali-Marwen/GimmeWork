package com.Offre_Emploi.Back.Entity;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nom;
    private String type;
    @Column(length = 50000000)
    private byte[] imageBytes;

    public Image(String nom, String type, byte[] imageBytes) {
        this.nom = nom;
        this.type = type;
        this.imageBytes = imageBytes;
    }

    public Image() {

    }
}
