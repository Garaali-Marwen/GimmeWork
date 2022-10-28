package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Recruteur;
import com.Offre_Emploi.Back.Service.RecruteurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recruteur")
public class RecruteurController {

    @Autowired
    private RecruteurService recruteurService;

    @PostMapping("/add")
    public Recruteur addRecruteur(@RequestBody Recruteur recruteur){
        return recruteurService.addRecruteur(recruteur);
    }

    @GetMapping("/all")
    public List<Recruteur> addRecruteur(){
        return recruteurService.getRecruteurs();
    }

    @PutMapping("/update")
    public Recruteur updateRecruteur(@RequestBody Recruteur recruteur) {
        return recruteurService.updateRecruteur(recruteur);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteRecruteur(@PathVariable("id") Long id) {
        recruteurService.deleteRecruteur(id);
    }

}
