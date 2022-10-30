package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.Candidat;
import com.Offre_Emploi.Back.Repository.CandidatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CandidatService {

    @Autowired
    private CandidatRepository candidatRepository;

    public Candidat addCondidat(Candidat candidat){
        candidat.setRole("Condidat");
        return candidatRepository.save(candidat);
    }

    public List<Candidat> getCondidats(){
        return candidatRepository.findAll();
    }

    public void deleteCandidat(Long id){
        candidatRepository.deleteById(id);
    }

    public Candidat findCandidatById(Long id){
        return candidatRepository.findById(id).orElse(null);
    }

    @Transactional
    public Candidat updateCandidat(Candidat candidat) {
        Candidat candidatUpdate = candidatRepository.findById(candidat.getId()).orElse(null);
        candidatUpdate.setNom(candidat.getNom());
        candidatUpdate.setPrenom(candidat.getPrenom());
        candidatUpdate.setMdp(candidat.getMdp());
        candidatUpdate.setDate_naissance(candidat.getDate_naissance());
        candidatUpdate.setCompetances(candidat.getCompetances());
        candidatUpdate.setFormations(candidat.getFormations());
        candidatUpdate.setMail(candidat.getMail());
        candidatUpdate.setCv(candidat.getCv());
        candidatUpdate.setLettre_motivation(candidat.getLettre_motivation());
        candidatUpdate.setFonction(candidat.getFonction());
        return candidatUpdate;
    }

}