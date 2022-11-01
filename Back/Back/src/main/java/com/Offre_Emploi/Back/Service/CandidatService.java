package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.Candidat;
import com.Offre_Emploi.Back.Entity.Competance;
import com.Offre_Emploi.Back.Entity.Formations;
import com.Offre_Emploi.Back.Repository.CandidatRepository;
import com.Offre_Emploi.Back.Repository.CompetanceRepository;
import com.Offre_Emploi.Back.Repository.FormationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CandidatService {

    @Autowired
    private CandidatRepository candidatRepository;
    @Autowired
    private CompetanceRepository competanceRepository;
    @Autowired
    private FormationRepository formationRepository;

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
        candidatUpdate.setMail(candidat.getMail());
        candidatUpdate.setFonction(candidat.getFonction());
        candidatUpdate.setAdresse(candidat.getAdresse());
        return candidatUpdate;
    }


    public void addCompetanceToCandidat(Long idCandidat, Long idCompetance){
        Candidat candidat = candidatRepository.findById(idCandidat).orElse(null);
        Competance competance = competanceRepository.findById(idCompetance).orElse(null);

        if (candidat!=null && competance!=null){
            candidat.getCompetances().add(competance);
            candidatRepository.save(candidat);
        }
    }

    public void addFormationToCandidat(Long idCandidat, Long idFormation){
        Candidat candidat = candidatRepository.findById(idCandidat).orElse(null);
        Formations formations = formationRepository.findById(idFormation).orElse(null);

        if (candidat!=null && formations!=null){
            candidat.getFormations().add(formations);
            candidatRepository.save(candidat);
        }
    }
}