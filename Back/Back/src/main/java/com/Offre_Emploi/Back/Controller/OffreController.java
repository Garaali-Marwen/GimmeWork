package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Offres;
import com.Offre_Emploi.Back.Entity.Recruteur;
import com.Offre_Emploi.Back.Service.OffresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/offres")
public class OffreController {



    @Autowired
    private OffresService offresService;


    @PostMapping("/add")
    public Offres  addOffre(@RequestBody Offres offres){
         return offresService.addOffre(offres);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Offres>> getAllOffres(){
        List<Offres> offres1 = offresService.getOffres();
        return new ResponseEntity<>(offres1, HttpStatus.OK);
    }

    @GetMapping("/{recruteurId}/{offreId}")
    public ResponseEntity<Recruteur> addOffreToRecruteur(@PathVariable("recruteurId") long recruteurId, @PathVariable("offreId") long offreId) {
        offresService.addOffreToRecruteur(recruteurId,offreId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteOffre(@PathVariable("id") Long id) {
        offresService.deleteOffre(id);
    }

    @GetMapping("/{id}")
    public Offres findById(@PathVariable("id") Long id){
        return offresService.findById(id);
    }

    @PutMapping("/update")
    public Offres updateOffre(@RequestBody Offres offres) {
        return offresService.updateOffre(offres);
    }
}
