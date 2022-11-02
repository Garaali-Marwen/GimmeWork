package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Offres;
import com.Offre_Emploi.Back.Service.OffresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/offres")
public class OffreController {



    @Autowired
    private OffresService offresService;


    @PostMapping("/add")
    public Offres addOffre(@RequestBody Offres offres){
        return offresService.addOffre(offres);
    }

    @GetMapping("/all")
    public List<Offres> getAllOffres(){
        return offresService.getOffres();
    }
}
