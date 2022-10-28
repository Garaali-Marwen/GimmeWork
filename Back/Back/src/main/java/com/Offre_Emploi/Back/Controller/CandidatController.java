package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Candidat;
import com.Offre_Emploi.Back.Service.CandidatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/candidat")
public class CandidatController {

    @Autowired
    private CandidatService candidatService;

    @PostMapping("/add")
    public Candidat addCandidat(@RequestBody Candidat candidat){
        return candidatService.addCondidat(candidat);
    }

    @GetMapping("/all")
    public List<Candidat> getAllCandidat(){
        return candidatService.getCondidats();
    }

    @PutMapping("/update")
    public Candidat updateCandidat(@RequestBody Candidat candidat) {
        return candidatService.updateCandidat(candidat);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCandidat(@PathVariable("id") Long id) {
        candidatService.deleteCandidat(id);
    }
}