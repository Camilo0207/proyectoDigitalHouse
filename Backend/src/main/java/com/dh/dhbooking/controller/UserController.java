package com.dh.dhbooking.controller;

import com.dh.dhbooking.dto.UserDTO;
import com.dh.dhbooking.dto.UserLogin;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.model.UserEntity;
import com.dh.dhbooking.security.TokenInfo;
import com.dh.dhbooking.security.TokenUtils;
import com.dh.dhbooking.security.UserDetailsServiceImpl;
import com.dh.dhbooking.service.EmailService;
import com.dh.dhbooking.service.IUserService;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final IUserService userService;

    final TokenUtils tokenUtils;
    private final UserDetailsServiceImpl userDetailsService;
    private final EmailService emailService;

    private final static Logger logger = Logger.getLogger(UserController.class);

    public UserController(IUserService userService, TokenUtils tokenUtils, UserDetailsServiceImpl userDetailsService, EmailService emailService) {
        this.userService = userService;
        this.tokenUtils = tokenUtils;
        this.userDetailsService = userDetailsService;
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<HttpStatus> createUser(@RequestBody UserDTO userDTO) throws ResourceNotFoundException {
       UserDTO userDTO1= userService.createUser(userDTO);
       if(userDTO1.getId()!=null){
           emailService.sendMailConfirmationRegisterNewUser(userDTO1.getId());
       }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<HttpStatus> updateUser(@RequestBody UserDTO userDTO) throws ResourceNotFoundException {
        userService.updateUser(userDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable Integer id) throws ResourceNotFoundException {
        userService.deleteUser(id);
        return ResponseEntity.status(204).build();
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Integer id) throws ResourceNotFoundException {
        return userService.getUserById(id);
    }

    @GetMapping
    public List<UserDTO> getAllUsers(){
        return userService.getAllUsers();
    }


    @PostMapping("/login/{email}")
    public UserLogin loginUser(@PathVariable String email){
        UserEntity userEntity=userService.findOneByEmail(email);
        UserLogin userLogin=new UserLogin(userEntity.getId(),userEntity.getName(),userEntity.getLastname(),userEntity.getEmail());
        return userLogin;
    }

    @PostMapping("/recovery")
    public ResponseEntity<HttpStatus> recoveryPassword(@RequestBody String email) throws ResourceNotFoundException {
        emailService.sendMailRecovery(email);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/checkrecovery/{email}")
    public ResponseEntity<TokenInfo> checkNumberRandomRecovery(@PathVariable String email,@RequestBody Integer number){
        UserEntity user=userService.findOneByEmail(email);
        String emailFrom= user.getEmail();
        TokenInfo tokenInfo=null;
       Integer num= user.getNumberRecoveryPassword();
        UserDetails userDetails=userDetailsService.loadUserByUsername(emailFrom);
        if (num.equals(number)){
            String jwt=tokenUtils.createToken(userDetails);
             tokenInfo=new TokenInfo(jwt);
            return ResponseEntity.ok(tokenInfo);
        }else {
            return ResponseEntity.ok(tokenInfo);
        }

    }
    @PostMapping("/resetpassword")
    public ResponseEntity<HttpStatus> resetPassword(@RequestBody String string){

        return ResponseEntity.ok(HttpStatus.OK);
    }

}
