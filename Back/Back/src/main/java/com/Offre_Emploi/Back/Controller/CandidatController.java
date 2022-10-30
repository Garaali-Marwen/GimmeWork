package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Candidat;
import com.Offre_Emploi.Back.Entity.Image;
import com.Offre_Emploi.Back.Service.CandidatService;
import com.Offre_Emploi.Back.Service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Candidat addLivre(@RequestPart("candidat") Candidat candidat,
                             @RequestPart("imageFile") MultipartFile[] file) {
        try {
            Set<Image> images = uploadImage(file);
            candidat.setImages(images);
            Candidat newCandidat = candidatService.addCondidat(candidat);
            return newCandidat;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }



    public Set<Image> uploadImage(MultipartFile[] multipartFiles) throws IOException {
        Set<Image> images = new HashSet<>();

        for (MultipartFile file: multipartFiles){
            Image image = new Image(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            );
            images.add(image);
            imageService.addImage(image);
        }
        return images;
    }
}