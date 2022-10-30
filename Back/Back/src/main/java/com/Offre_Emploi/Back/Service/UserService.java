package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.User;
import com.Offre_Emploi.Back.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
