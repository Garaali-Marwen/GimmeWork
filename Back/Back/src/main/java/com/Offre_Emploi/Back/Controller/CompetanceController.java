package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Competance;
import com.Offre_Emploi.Back.Service.CompetanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/competance")
public class CompetanceController {

    @Autowired
    private CompetanceService competanceService;

    @PostMapping("/add")
    public Competance addCompetance(@RequestBody Competance competance){
        return competanceService.addCompetance(competance);
    }

    @GetMapping("/all")
    public List<Competance> getAllCompetance(){
        return competanceService.getAllCompetances();
    }

}
