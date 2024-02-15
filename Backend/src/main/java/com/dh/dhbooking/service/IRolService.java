package com.dh.dhbooking.service;

import com.dh.dhbooking.dto.RolDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;

import java.util.List;

public interface IRolService {

    void createRol(RolDTO rolDTO);
    void deleteRol(Integer id) throws ResourceNotFoundException;
    void updateRol(RolDTO rolDTO) throws ResourceNotFoundException;
    RolDTO getRol(Integer id) throws ResourceNotFoundException;
    List<RolDTO> getAllRols();
}
