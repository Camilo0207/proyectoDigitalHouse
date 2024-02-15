package com.dh.dhbooking.service;

import com.dh.dhbooking.dto.CityDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ICityService {

    public void createCity(CityDTO cityDTO);

    public void updateCity(CityDTO cityDTO) throws ResourceNotFoundException;

    public void deleteCity(Integer id) throws ResourceNotFoundException;

    public CityDTO getCity(Integer id) throws ResourceNotFoundException;

    public List<CityDTO> getAllCities();

    public List<CityDTO>getAllCitiesByName(String name);
}
