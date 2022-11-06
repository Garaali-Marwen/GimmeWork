package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.Candidat;
import com.Offre_Emploi.Back.Entity.Competance;
import com.Offre_Emploi.Back.Repository.CompetanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CompetanceService {

    @Autowired
    private CompetanceRepository competanceRepository;


    public Competance addCompetance(Competance competance){
        return competanceRepository.save(competance);
    }

    public List<Competance> getAllCompetances(){
        return competanceRepository.findAll();
    }

    public Competance findCompetanceById(Long id){
        return competanceRepository.findById(id).orElse(null);
    }

    @Transactional
    public Competance updateCompetance(Competance competance) {
        Competance competanceUpdate = competanceRepository.findById(competance.getId()).orElse(null);
        competanceUpdate.setNom(competance.getNom());
        competanceUpdate.setNiveau(competance.getNiveau());
        return competanceUpdate;
    }

    public void deleteCompetance(Long id){
        competanceRepository.deleteById(id);
    }
}
