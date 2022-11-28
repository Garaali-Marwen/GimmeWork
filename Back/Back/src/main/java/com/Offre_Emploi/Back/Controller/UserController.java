package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Admin;
import com.Offre_Emploi.Back.Entity.User;
import com.Offre_Emploi.Back.Repository.UserRepository;
import com.Offre_Emploi.Back.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JavaMailSender javaMailSender;

    @GetMapping("/login/{mail}/{mdp}")
    public ResponseEntity<User> addRoleToUser(@PathVariable("mail") String mail, @PathVariable("mdp") String mdp){
        User user =  userService.login(mail,mdp);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/add/admin")
    public void addAdmin(@RequestBody Admin admin){
        userService.addAdmin(admin);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id){
        User user = userService.getUser(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.getUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    //change password
    @PostMapping("/changePassword")
    public ResponseEntity<User> sendMail() {
        List<User> users = userService.getUsers();
        for (User user : users) {
            SimpleMailMessage sm = new SimpleMailMessage();
            sm.setFrom("gimmework3@gmail.com");
            sm.setTo(user.getMail());
            sm.setText(" Bonjour " + user.getNom() + " ," + "\n\n  Utiliser ce lien pour rénitialiser votre mot de passe," + "\n\n  Cliquer ici: " +
                    "http://localhost:4200/change-password");
            sm.setSubject("Réinitialisation du mot de passe");
            javaMailSender.send(sm);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }


    //get forget password
    @GetMapping("/forgetpassword")
    public ResponseEntity<User> forgetpassword(HttpServletRequest request,
                                               @RequestParam("email") String email) throws Exception {
        User user = userRepository.findByMail(email);
        if (user != null) {
            userRepository.save(user);
        } else {
            return new ResponseEntity("Email not found", HttpStatus.BAD_REQUEST);
        }
        return null;
    }

}
