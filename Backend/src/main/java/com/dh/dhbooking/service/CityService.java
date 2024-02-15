package com.dh.dhbooking.service;


import com.dh.dhbooking.dto.CityDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.model.City;
import com.dh.dhbooking.repository.ICityRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class CityService implements ICityService{

    private final ICityRepository cityRepository;
    private final ObjectMapper mapper;

    public CityService(ICityRepository cityRepository, ObjectMapper mapper) {
        this.cityRepository = cityRepository;
        this.mapper = mapper;
    }

    @Override
    public void createCity(CityDTO cityDTO) {

        cityRepository.save(mapper.convertValue(cityDTO, City.class));
    }

    @Override
    public void updateCity(CityDTO cityDTO) throws ResourceNotFoundException {
        City city=cityRepository.findById(cityDTO.getId()).orElseThrow(()->{return new ResourceNotFoundException("No tiene id");});
        city.setName(cityDTO.getName());
        cityRepository.save(city);
    }

    @Override
    public void deleteCity(Integer id) throws ResourceNotFoundException {
        City city=cityRepository.findById(id).orElseThrow(()->{return new ResourceNotFoundException("No encontrado");});
        city.setStatus(false);
        cityRepository.save(city);
    }

    @Override
    public CityDTO getCity(Integer id) throws ResourceNotFoundException {
        City city=cityRepository.findById(id).orElseThrow(()->{return new ResourceNotFoundException("No encontrado "+id+".");});
        CityDTO cityDTO=mapper.convertValue(city, CityDTO.class);
        if(city.getStatus()==null)
           return cityDTO;
        else
            throw new ResourceNotFoundException("No existe en nuestros registros.");

    }

    @Override
    public List<CityDTO> getAllCities() {
        List<CityDTO > cityDTOList=new ArrayList<>();

        for (City city:cityRepository.findByStatusIsNull())
            cityDTOList.add(mapper.convertValue(city, CityDTO.class));

        return cityDTOList;
    }

    @Override
    public List<CityDTO> getAllCitiesByName(String name) {
        List<CityDTO> cityDTOList=new ArrayList<>();

        for (City city:cityRepository.findByName(name))
            cityDTOList.add(mapper.convertValue(city,CityDTO.class));

        return cityDTOList;
    }
}
