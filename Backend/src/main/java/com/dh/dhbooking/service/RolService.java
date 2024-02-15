package com.dh.dhbooking.service;


import com.dh.dhbooking.dto.RolDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.model.Rol;
import com.dh.dhbooking.repository.IRolRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RolService implements IRolService {

    private final IRolRepository rolRepository;
    private final ObjectMapper mapper;

    public RolService(IRolRepository rolRepository, ObjectMapper mapper) {
        this.rolRepository = rolRepository;
        this.mapper = mapper;
    }

    @Override
    public void createRol(RolDTO rolDTO) {

        rolRepository.save(mapper.convertValue(rolDTO, Rol.class));
    }

    @Override
    public void deleteRol(Integer id) throws ResourceNotFoundException {
        Rol rol=rolRepository.findById(id).orElseThrow(()->{return new ResourceNotFoundException("No encontrado");});
        rol.setStatus(false);
        rolRepository.save(rol);
    }

    @Override
    public void updateRol(RolDTO rolDTO) throws ResourceNotFoundException {
        Rol rol=rolRepository.findById(rolDTO.getId()).orElseThrow(()->{return new ResourceNotFoundException("No tiene id");});
        rol.setName(rolDTO.getName());
        rolRepository.save(rol);
    }

    @Override
    public RolDTO getRol(Integer id) throws ResourceNotFoundException {
        return mapper.convertValue(rolRepository.findById(id).orElseThrow(()->{return new ResourceNotFoundException("No encontrado "+id+".");}), RolDTO.class);
    }

    @Override
    public List<RolDTO> getAllRols() {

        List<RolDTO> rolDTOList=new ArrayList<>();
        for (Rol rol:rolRepository.findByStatusIsNull())
                rolDTOList.add(mapper.convertValue(rol,RolDTO.class));

        return rolDTOList;
    }
}
