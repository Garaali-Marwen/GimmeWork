package com.Offre_Emploi.Back.Repository;

import com.Offre_Emploi.Back.Entity.Offres;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OffreRepository extends JpaRepository<Offres,Long> {
}
