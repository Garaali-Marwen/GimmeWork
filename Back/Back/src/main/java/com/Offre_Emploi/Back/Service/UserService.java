package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.Admin;
import com.Offre_Emploi.Back.Entity.User;
import com.Offre_Emploi.Back.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User login(String mail, String mdp){
        User user = userRepository.findByMail(mail);
        if (user != null){
            if (user.getMdp().equals(mdp)){
                return user;
            }
        }
        System.out.println("invalide login ou mdp");
        return null;
    }

    public void addAdmin(Admin admin){
        userRepository.save(admin);
    }

    public User getUser(Long idUser){
        return userRepository.findById(idUser).orElse(null);
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }
}
