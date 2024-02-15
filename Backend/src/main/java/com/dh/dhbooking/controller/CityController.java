package com.dh.dhbooking.controller;

import com.dh.dhbooking.dto.CityDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.service.ICityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cities")
public class CityController {

    private final ICityService cityService;

    public CityController(ICityService cityService) {
        this.cityService = cityService;
    }

    @PostMapping
    public ResponseEntity<HttpStatus> createCity(@RequestBody CityDTO cityDTO){
        cityService.createCity(cityDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public CityDTO  getCity(@PathVariable Integer id) throws ResourceNotFoundException {
        return cityService.getCity(id);
    }

    @GetMapping
    public List<CityDTO> getAllCities(){
        return cityService.getAllCities();
    }

    @PutMapping
    public ResponseEntity<HttpStatus> updateCity(@RequestBody CityDTO cityDTO) throws ResourceNotFoundException {
        cityService.updateCity(cityDTO);
         return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCity(@PathVariable Integer id) throws ResourceNotFoundException {
        cityService.deleteCity(id);
        return ResponseEntity.status(204).build();
    }

    @GetMapping("/filtrar/{name}")
    public List<CityDTO> getAllCitiesByName(@PathVariable String name){
        List<CityDTO> cityDTOList=cityService.getAllCitiesByName(name);
        return cityDTOList ;
    }
}
