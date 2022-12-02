package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.*;
import com.Offre_Emploi.Back.Repository.OffrePriveRepository;
import com.Offre_Emploi.Back.Repository.RecruteurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class OffresPriveService {

    int year = Year.now().getValue();
    private int e1;
    private int e2;
    @Autowired
    private CandidatService candidatService;
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


    public List<Offres> getlist_offre_recommande(long id_candidat) {
        List<Offres> l = getOffres();
        List<Offres> offre_recommandations = new ArrayList<>();
        Candidat candidat = candidatService.findCandidatById(id_candidat);
        Neurone n = new Neurone(0.6, 0.3, 0.8);
        Set<Competance> list_competence_candidat = candidat.getCompetances();

        for (Competance c : list_competence_candidat) {
            for (Offres o : l) {
                if (o.getDescription().toLowerCase().contains(c.getNom().toLowerCase()))
                    e1 = 1;
                if (o.getDescription().toLowerCase().contains(c.getNom().toLowerCase()) & (c.getNiveau() > 40))
                    e2 = 1;
                if (n.evaluer(e1, e2)) {
                    boolean isExisteOffre = offre_recommandations.contains(o);
                    if(!isExisteOffre) offre_recommandations.add(o);
                }

                e1 = 0;
                e2 = 0;
            }
        }
        return offre_recommandations;
    }

    public List<Candidat> mail(Long id ) {
        Offres offre = findById(id);
        List<Candidat> candidat_mail = new ArrayList<>();
        List<Candidat> candidat = candidatService.getCondidats();
        Neurone n = new Neurone(0.6, 0.3, 0.8);
        for (Candidat candidat1:candidat){
            for (Competance c :candidat1.getCompetances() ) {
                if (offre.getDescription().toLowerCase().contains(c.getNom().toLowerCase()))
                    e1 = 1;
                if (offre.getDescription().toLowerCase().contains(c.getNom().toLowerCase()) & (c.getNiveau() > 40))
                    e2 = 1;
                if (n.evaluer(e1, e2)) {
                    boolean isExisteOffre = candidat_mail.contains(candidat1);
                    if(!isExisteOffre) candidat_mail.add(candidat1);
                }

                e1 = 0;
                e2 = 0;
            }
        }

        return candidat_mail;
    }




}
