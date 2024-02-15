package com.dh.dhbooking.controller;

import com.dh.dhbooking.dto.FeatureDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.service.IFeatureService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/features")
public class FeatureController {

    private final IFeatureService featureService;

    public FeatureController(IFeatureService featureService) {
        this.featureService = featureService;
    }

     @PostMapping
    public ResponseEntity<HttpStatus> createService(@RequestBody FeatureDTO featureDTO){
        featureService.createFeature(featureDTO);
         return ResponseEntity.status(HttpStatus.CREATED).build();
     }

     @PutMapping
    public ResponseEntity<HttpStatus> updateService(@RequestBody FeatureDTO featureDTO) throws ResourceNotFoundException {
        featureService.updateFeature(featureDTO);
        return ResponseEntity.ok(HttpStatus.OK);
     }

     @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteService(@PathVariable Integer id) throws ResourceNotFoundException {
        featureService.deleteFeature(id);
         return ResponseEntity.status(204).build();
     }

     @GetMapping("/{id}")
    public FeatureDTO getService(@PathVariable Integer id) throws ResourceNotFoundException {
        return featureService.getFeature(id);
     }

     @GetMapping
    public List<FeatureDTO> getAllServices(){
        return featureService.getAllFeatures();
     }
}
