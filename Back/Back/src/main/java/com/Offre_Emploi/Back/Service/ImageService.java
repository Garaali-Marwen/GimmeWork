package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.Image;
import com.Offre_Emploi.Back.Repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public Image addImage(Image image){
        return imageRepository.save(image);
    }
}
