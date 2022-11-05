package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.Candidat;
import com.Offre_Emploi.Back.Entity.Formations;
import com.Offre_Emploi.Back.Entity.Offres;
import com.Offre_Emploi.Back.Entity.Recruteur;
import com.Offre_Emploi.Back.Repository.OffreRepository;
import com.Offre_Emploi.Back.Repository.RecruteurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OffresService {

    @Autowired
    private OffreRepository offreRepository;
    @Autowired
    private RecruteurRepository recruteurRepository;

    public List<Offres> getOffres(){
        return offreRepository.findAll();
    }

    public Offres addOffre(Offres offres){
        return offreRepository.save(offres);
    }

    public void deleteOffre(Long offreId){
        offreRepository.deleteById(offreId);
    }

    public Offres findById(Long id){
        return offreRepository.findById(id).orElse(null);
    }

    public void addOffreToRecruteur(Long idRecruteur, Long idOffre){
        Recruteur recruteur = recruteurRepository.findById(idRecruteur).orElse(null);
        Offres offres = offreRepository.findById(idOffre).orElse(null);

        if (recruteur!=null && offres!=null){
            recruteur.getOffres().add(offres);
            recruteurRepository.save(recruteur);
        }
    }

    @Transactional
    public Offres updateOffre(Offres offres) {
        Offres offreUpdate = offreRepository.findById(offres.getId()).orElse(null);
        offreUpdate.setEtude(offres.getEtude());
        offreUpdate.setDomaine(offres.getDomaine());
        offreUpdate.setDescription(offres.getDescription());
        offreUpdate.setDisponibilite(offres.getDisponibilite());
        offreUpdate.setExperience(offres.getExperience());
        offreUpdate.setLieu(offres.getLieu());
        offreUpdate.setSalaire(offres.getSalaire());
        offreUpdate.setDate_ajout(offres.getDate_ajout());
        offreUpdate.setDate_expiration(offres.getDate_expiration());
        offreUpdate.setType_poste(offres.getType_poste());
        offreUpdate.setTitre(offres.getTitre());
        return offreUpdate;
    }

}
