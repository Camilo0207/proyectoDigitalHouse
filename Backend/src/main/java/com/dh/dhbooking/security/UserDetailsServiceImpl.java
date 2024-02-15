package com.dh.dhbooking.security;

import com.dh.dhbooking.model.UserEntity;
import com.dh.dhbooking.service.IUserService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final static Logger logger = Logger.getLogger(String.valueOf(UserDetailsServiceImpl.class));
    private  final IUserService userService;



    public UserDetailsServiceImpl(IUserService userService) {
        this.userService = userService;

    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserEntity userEntity;
        userEntity = userService.findOneByEmail(email);
        logger.info("contraseña: "+userEntity.getPassword());
        logger.info("Email: "+userEntity.getEmail());

        var  rol=userEntity.getRol();
             if(rol != null){
               User.UserBuilder userBuilder = User.withUsername(email);
               userBuilder.password(userEntity.getPassword()).roles(rol.getName());
                return userBuilder.build();
             }else
                throw new UsernameNotFoundException(email);

    }

}
