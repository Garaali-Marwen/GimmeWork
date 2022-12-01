package com.Offre_Emploi.Back.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Neurone {
    private double w1;
    private double w2;
    private double seuil;
    public double somme(int e1, int e2) {
        return w1 * e1 + w2 * e2;
    }

    public boolean evaluer(int e1, int e2) {
        return somme(e1, e2) >= seuil;
    }
}
