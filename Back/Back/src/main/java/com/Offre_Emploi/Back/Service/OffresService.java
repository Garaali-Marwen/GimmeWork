package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.Offres;
import com.Offre_Emploi.Back.Repository.OffreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OffresService {

    @Autowired
    private OffreRepository offreRepository;

    public List<Offres> getOffres(){
        return offreRepository.findAll();
    }

    public Offres addOffre(Offres offres){
        return offreRepository.save(offres);
    }

    public void deleteOffre(Long offreId){
        offreRepository.deleteById(offreId);
    }


}
