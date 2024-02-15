package com.dh.dhbooking.service;

import com.dh.dhbooking.dto.FeatureDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;

import java.util.List;

public interface IFeatureService {

    void createFeature(FeatureDTO featureDTO);
    void updateFeature(FeatureDTO featureDTO) throws ResourceNotFoundException;
    void deleteFeature(Integer id) throws ResourceNotFoundException;
    FeatureDTO getFeature(Integer id) throws ResourceNotFoundException;
    List<FeatureDTO> getAllFeatures();
}
