package com.Offre_Emploi.Back.Repository;

import com.Offre_Emploi.Back.Entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository  extends JpaRepository<Image,Long> {
}
