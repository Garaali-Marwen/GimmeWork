package com.Offre_Emploi.Back.Entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@Data
public class Recruteur extends User{

    private String mail;
    private int num_tel;
    private String adresse;
    private String date_naissance;
    @Column(length = 50000000)
    private byte[] image;
}

