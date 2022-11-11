package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Postulation;
import com.Offre_Emploi.Back.Service.PostulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/postulation")
public class PostulationController {

    @Autowired
    private PostulationService postulationService;

    @PostMapping("/add")
    public Postulation addPostulation(@RequestBody Postulation postulation){
        return postulationService.addPostulation(postulation);
    }

    @GetMapping("/{id}")
    public Postulation findPostulationById(@PathVariable("id") Long id){
        return postulationService.findPostulationById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deletePostulation(@PathVariable("id") Long id) {
        postulationService.deletePostulation(id);
    }

    @PutMapping("/update")
    public Postulation updatePostulation(@RequestBody Postulation postulation) {
        return postulationService.updatePostulation(postulation);
    }
}
