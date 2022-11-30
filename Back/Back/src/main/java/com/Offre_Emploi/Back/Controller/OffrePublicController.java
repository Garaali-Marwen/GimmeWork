package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.OffresPublic;
import com.Offre_Emploi.Back.Service.OffrePublicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/offres/public")
public class OffrePublicController {

    @Autowired
    private OffrePublicService offrePublicService;


    @GetMapping("/all")
    public List<OffresPublic> getAllCandidat() throws IOException {
        List<OffresPublic> offresPublics = new ArrayList<>();
        //List<OffresPublic> oc = new ArrayList<>();
        offresPublics.addAll(offrePublicService.getPrivateOffre());
        //offresPublics.addAll(offrePublicService.getPrivateOffreFromLinkedin());
        offresPublics.addAll(offrePublicService.getPrivateOffreFromOtionCarriere());
        offresPublics.addAll(offrePublicService.getPrivateOffreFromLinkedin());
        /*for (OffresPublic o : offresPublics){
            offrePublicService.setDetails_kj(o);
        }
        oc.addAll(offrePublicService.getPrivateOffreFromOtionCarriere());
        for (OffresPublic of : oc){
            offrePublicService.setDetails_oc(of);
        }
        offresPublics.addAll(oc);*/
        //offresPublics.addAll(offrePublicService.getPrivateOffreFromLinkedin());
        return offresPublics;
    }


}
