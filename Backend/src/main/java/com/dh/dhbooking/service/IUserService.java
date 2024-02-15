package com.dh.dhbooking.service;


import com.dh.dhbooking.dto.UserDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.model.UserEntity;

import java.util.List;

public interface IUserService {
    UserDTO createUser(UserDTO userDTO) throws ResourceNotFoundException;
    void deleteUser(Integer id) throws ResourceNotFoundException;
    void updateUser(UserDTO userDTO) throws ResourceNotFoundException;
    UserDTO getUserById(Integer id) throws ResourceNotFoundException;
    List<UserDTO> getAllUsers();

    UserEntity findOneByEmail(String email);

    Integer generatedNumberRandom();

    void resetPassword(String email,String password);


}
