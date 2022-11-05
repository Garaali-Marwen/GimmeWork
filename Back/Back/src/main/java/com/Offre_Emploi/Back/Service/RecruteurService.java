package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.Recruteur;
import com.Offre_Emploi.Back.Repository.RecruteurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RecruteurService {

    @Autowired
    private RecruteurRepository recruteurRepository;

    public Recruteur addRecruteur(Recruteur recruteur){
        recruteur.setRole("Recruteur");
        return recruteurRepository.save(recruteur);
    }

    public List<Recruteur> getRecruteurs(){
        return recruteurRepository.findAll();
    }

    public void deleteRecruteur(Long id){
        recruteurRepository.deleteById(id);
    }

    @Transactional
    public Recruteur updateRecruteur(Recruteur recruteur) {
        Recruteur recruteurUpdate = recruteurRepository.findById(recruteur.getId()).orElse(null);
        recruteurUpdate.setNom(recruteur.getNom());
        recruteurUpdate.setPrenom(recruteur.getPrenom());
        recruteurUpdate.setMdp(recruteur.getMdp());
        recruteurUpdate.setDate_naissance(recruteur.getDate_naissance());
        recruteurUpdate.setMail(recruteur.getMail());
        recruteurUpdate.setNum_tel(recruteur.getNum_tel());
        recruteurUpdate.setAdresse(recruteur.getAdresse());
        return recruteurUpdate;
    }

    public Recruteur findRecruteurById(Long id){
        return recruteurRepository.findById(id).orElse(null);
    }
}