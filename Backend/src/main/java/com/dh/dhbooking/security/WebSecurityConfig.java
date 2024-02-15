package com.dh.dhbooking.security;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration

@AllArgsConstructor
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {

    private final  UserDetailsService userDetailsService;
    private final  JWTAuthorizationFilter jwtAuthorizationFilter;



    @Bean
    SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authManager) throws Exception {
         JWTAuthenticationFilter jwtAuthenticationFilter=new JWTAuthenticationFilter();
         jwtAuthenticationFilter.setAuthenticationManager(authManager);
         jwtAuthenticationFilter.setFilterProcessesUrl("/login");
        return http
                .csrf().disable()
                .authorizeRequests()
                //.antMatchers(HttpMethod.GET, "/bookings").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/products/products-enabled/**/**/**").permitAll()
                .antMatchers("/auth/**",
                        "/",
                        "/products/**",
                        "/categories",
                        "/bookings/**",
                        "/bookings/bookingsuserid/**",
                        "/categories",
                        "/images/imagesproduct/**",
                        "/featuresproduct/**",
                        "/products/**",
                        "/products/category/**",
                        "/cities",
                        "/images/**",
                        "/productfeature/**/**",
                        "/productfeature/**",
                        "/email/**",
                        "/images",
                        "/rols",
                        "/features",
                        "/users",
                        "/users/recovery/**",
                        "/email/**",
                        "/swagger-ui/**",
                        "/swagger-resources/**").permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(jwtAuthenticationFilter)
                .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }



        @Bean("authenticationManager")
        public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
                throws Exception {
            return authenticationConfiguration.getAuthenticationManager();
        }


}
