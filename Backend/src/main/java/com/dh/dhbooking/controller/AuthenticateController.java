package com.dh.dhbooking.controller;


import com.dh.dhbooking.security.AuthCredentials;
import com.dh.dhbooking.security.TokenInfo;
import com.dh.dhbooking.security.TokenUtils;
import com.dh.dhbooking.security.UserDetailsServiceImpl;
import com.dh.dhbooking.service.EmailService;
import com.dh.dhbooking.service.IUserService;
import org.apache.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auth")
public class AuthenticateController {
    private final static org.apache.log4j.Logger logger = Logger.getLogger(AuthenticateController.class);
    private AuthenticationManager authenticationManager;

    private UserDetailsServiceImpl userDetailsService;

    private final IUserService userService;

    private final EmailService emailService;


    final TokenUtils tokenUtils;


    public AuthenticateController(AuthenticationManager authenticationManager, UserDetailsServiceImpl userDetailsService, IUserService userService, EmailService emailService, TokenUtils tokenUtils) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.userService = userService;
        this.emailService = emailService;
        this.tokenUtils = tokenUtils;
    }

    @PostMapping
    public ResponseEntity<TokenInfo> authenticate(@RequestBody AuthCredentials authCredentials){
        logger.info("REALIZANDO AUTENTICACION");
        Authentication manager= authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authCredentials.getEmail(),authCredentials.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(manager);
        UserDetails userDetails=userDetailsService.loadUserByUsername(authCredentials.getEmail());
        String jwt=tokenUtils.createToken(userDetails);
        TokenInfo tokenInfo=new TokenInfo(jwt);

         return ResponseEntity.ok(tokenInfo);

    }



}
