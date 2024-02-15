package com.dh.dhbooking.controller;

import com.dh.dhbooking.dto.UserFavoriteDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.service.IUserFavoriteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/userfavorites")
public class UserFavoriteController {

    private final IUserFavoriteService userFavoriteService;

    public UserFavoriteController(IUserFavoriteService userFavoriteService) {
        this.userFavoriteService = userFavoriteService;
    }

    @PostMapping
    public ResponseEntity<Integer> createUserFavorite(@RequestBody UserFavoriteDTO userFavoriteDTO) throws ResourceNotFoundException {
        Integer response=0;
        if (userFavoriteDTO.getId()!=null){
            userFavoriteService.deleteUserFavorite(userFavoriteDTO.getId());
            return ResponseEntity.ok(response);
        }
        UserFavoriteDTO userFavorite=userFavoriteService.createUserFavorite(userFavoriteDTO);
        return ResponseEntity.ok(userFavorite.getId());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteFavorite(@PathVariable Integer id) throws ResourceNotFoundException {
        userFavoriteService.deleteUserFavorite(id);
        return ResponseEntity.status(204).build();
    }
}
