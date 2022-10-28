package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Formations;
import com.Offre_Emploi.Back.Service.FormationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/formation")
public class FormationController {

    @Autowired
    private FormationService formationService;


    @PostMapping("/add")
    public Formations addFormation(@RequestBody Formations formations){
        return formationService.addFormation(formations);
    }


}
