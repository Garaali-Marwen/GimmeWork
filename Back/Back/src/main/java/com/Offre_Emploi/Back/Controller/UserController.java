package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Admin;
import com.Offre_Emploi.Back.Entity.Formations;
import com.Offre_Emploi.Back.Entity.User;
import com.Offre_Emploi.Back.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/login/{mail}/{mdp}")
    public ResponseEntity<User> addRoleToUser(@PathVariable("mail") String mail, @PathVariable("mdp") String mdp){
        User user =  userService.login(mail,mdp);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/add/admin")
    public void addAdmin(@RequestBody Admin admin){
        userService.addAdmin(admin);
    }

}
