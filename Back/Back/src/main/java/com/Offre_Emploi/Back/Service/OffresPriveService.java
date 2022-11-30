package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.Candidat;
import com.Offre_Emploi.Back.Entity.Offres;
import com.Offre_Emploi.Back.Entity.Recruteur;
import com.Offre_Emploi.Back.Repository.OffrePriveRepository;
import com.Offre_Emploi.Back.Repository.RecruteurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.ArrayList;
import java.util.List;

@Service
public class OffresPriveService {

    int year = Year.now().getValue();
    @Autowired
    private OffrePriveRepository offrePriveRepository;
    @Autowired
    private RecruteurRepository recruteurRepository;

    public List<Offres> getOffres(){
        return offrePriveRepository.findAll();
    }

    public Offres addOffre(Offres offres){
        return offrePriveRepository.save(offres);
    }

    public void deleteOffre(Long offreId){
        offrePriveRepository.deleteById(offreId);
    }

    public Offres findById(Long id){
        return offrePriveRepository.findById(id).orElse(null);
    }

    public void addOffreToRecruteur(Long idRecruteur, Long idOffre){
        Recruteur recruteur = recruteurRepository.findById(idRecruteur).orElse(null);
        Offres offres = offrePriveRepository.findById(idOffre).orElse(null);

        if (recruteur!=null && offres !=null){
            recruteur.getOffres().add(offres);
            recruteurRepository.save(recruteur);
        }
    }

    @Transactional
    public Offres updateOffre(Offres offres) {
        Offres offreUpdate = offrePriveRepository.findById(offres.getId()).orElse(null);
        offreUpdate.setEtude(offres.getEtude());
        offreUpdate.setDomaine(offres.getDomaine());
        offreUpdate.setDescription(offres.getDescription());
        offreUpdate.setDisponibilite(offres.getDisponibilite());
        offreUpdate.setExperience(offres.getExperience());
        offreUpdate.setLieu(offres.getLieu());
        offreUpdate.setSalaire(offres.getSalaire());
        offreUpdate.setDate_expiration(offres.getDate_expiration());
        offreUpdate.setType_poste(offres.getType_poste());
        offreUpdate.setTitre(offres.getTitre());
        return offreUpdate;
    }


    public Offres findOffresByIdPostulation(Long id){
        return offrePriveRepository.getOffresByPostulationsId(id);
    }


    public List<Offres> getOffresAnneeCourante(){
        List<Offres> offres = offrePriveRepository.findAll();
        List<Offres> o = new ArrayList<>();
        for (Offres offre : offres){
            if (offre.getDate_ajout().getYear() == year){
                o.add(offre);
            }
        }
        return o;
    }


}
