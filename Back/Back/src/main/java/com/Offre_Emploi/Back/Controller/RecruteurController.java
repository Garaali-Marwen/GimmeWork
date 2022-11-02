package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Candidat;
import com.Offre_Emploi.Back.Entity.Image;
import com.Offre_Emploi.Back.Entity.Recruteur;
import com.Offre_Emploi.Back.Service.ImageService;
import com.Offre_Emploi.Back.Service.RecruteurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/recruteur")
public class RecruteurController {

    @Autowired
    private RecruteurService recruteurService;
    @Autowired
    private ImageService imageService;


    @PostMapping(value = "/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Recruteur addRecruteur(@RequestPart("recruteur") Recruteur recruteur,
                                @RequestPart("imageFile") MultipartFile file) {
        try {
            Image images = uploadImage(file);
            recruteur.setImage(images);
            Recruteur newRecruteur = recruteurService.addRecruteur(recruteur);
            return newRecruteur;
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
