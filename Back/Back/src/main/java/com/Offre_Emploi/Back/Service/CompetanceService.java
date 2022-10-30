package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.Competance;
import com.Offre_Emploi.Back.Repository.CompetanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
