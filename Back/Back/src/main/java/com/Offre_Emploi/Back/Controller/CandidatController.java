package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Candidat;
import com.Offre_Emploi.Back.Entity.Image;
import com.Offre_Emploi.Back.Service.CandidatService;
import com.Offre_Emploi.Back.Service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/candidat")
public class CandidatController {

    @Autowired
    private CandidatService candidatService;
    @Autowired
    private ImageService imageService;

    @PostMapping("/add")
    public Candidat addCandidat(@RequestBody Candidat candidat){
        return candidatService.addCondidat(candidat);
    }

    @GetMapping("/all")
    public List<Candidat> getAllCandidat(){
        return candidatService.getCondidats();
    }

    @GetMapping("/{id}")
    public Candidat findById(@PathVariable("id") Long id){
        return candidatService.findCandidatById(id);
    }

    @PutMapping("/update")
    public Candidat updateCandidat(@RequestBody Candidat candidat) {
        return candidatService.updateCandidat(candidat);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCandidat(@PathVariable("id") Long id) {
        candidatService.deleteCandidat(id);
    }




    @PostMapping(value = "/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Candidat addCandidat(@RequestPart("candidat") Candidat candidat,
                             @RequestPart("imageFile") MultipartFile file) {
        try {
            Image images = uploadImage(file);
            candidat.setImage(images);
            Candidat newCandidat = candidatService.addCondidat(candidat);
            return newCandidat;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }



    public Image uploadImage(MultipartFile multipartFiles) throws IOException {
            Image image = new Image(
                    multipartFiles.getOriginalFilename(),
                    multipartFiles.getContentType(),
                    multipartFiles.getBytes()
            );
            imageService.addImage(image);
        return image;
    }


    @GetMapping("/competance/{candidatId}/{competanceId}")
    public ResponseEntity<Candidat> addCompetanceToCandidat(@PathVariable("candidatId") long candidatId, @PathVariable("competanceId") long competanceId) {
        candidatService.addCompetanceToCandidat(candidatId, competanceId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/formation/{candidatId}/{formationId}")
    public ResponseEntity<Candidat> addFormationToCandidat(@PathVariable("candidatId") long candidatId, @PathVariable("formationId") long formationId) {
        candidatService.addFormationToCandidat(candidatId, formationId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}