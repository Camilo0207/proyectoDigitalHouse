package com.dh.dhbooking.security;



import com.dh.dhbooking.model.UserEntity;
import com.dh.dhbooking.service.UserService;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class TokenUtils {

    @Value("${jwt.secret}")
    private String secret;

   @Value("${jwt.expiration}")
   private int expiration;

   private UserService userService;

    public TokenUtils(UserService userService) {
        this.userService = userService;
    }

    public  String createToken(UserDetails userDetails){

        Map<String,Object>claims = new HashMap<>();
        claims.put("rol",userDetails.getAuthorities().stream().collect(Collectors.toList()).get(0));

       return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .addClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + expiration * 1000))
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }

    public  UsernamePasswordAuthenticationToken getAuthentication(String token){

       try {
          String email= Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
           return new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());
       }catch (JwtException e){
           return null;
       }
    }
    public String getUserNameFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
    }

    public  String recoveryToken(String email){
        UserEntity userEntity=userService.findOneByEmail(email);
        return Jwts.builder()
                .setSubject(userEntity.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + expiration * 50))
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }
}
