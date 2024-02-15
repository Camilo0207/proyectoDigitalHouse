package com.dh.dhbooking.service;

import com.dh.dhbooking.dto.UserFavoriteDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;

import java.util.List;

public interface IUserFavoriteService {

    UserFavoriteDTO createUserFavorite(UserFavoriteDTO userFavoriteDTO) throws ResourceNotFoundException;
    void deleteUserFavorite(Integer id) throws ResourceNotFoundException;
    List<UserFavoriteDTO> getAllFavorites();
    UserFavoriteDTO getUserFavoriteById(Integer id) throws ResourceNotFoundException;

    UserFavoriteDTO getUserFavoriteByProductIdAndUserId(Integer productId,Integer userId) throws ResourceNotFoundException;
}
