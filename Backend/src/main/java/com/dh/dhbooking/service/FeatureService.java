package com.dh.dhbooking.service;

import com.dh.dhbooking.model.Feature;
import org.springframework.stereotype.Service;
import com.dh.dhbooking.dto.FeatureDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.repository.IFeatureRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;

@Service

public class FeatureService implements IFeatureService {

    private final IFeatureRepository featureRepository;
    private final ObjectMapper mapper;

    public FeatureService(IFeatureRepository serviceRepository, ObjectMapper mapper) {
        this.featureRepository = serviceRepository;
        this.mapper = mapper;
    }

    @Override
    public void createFeature(FeatureDTO featureDTO) {
        featureRepository.save(mapper.convertValue(featureDTO, Feature.class));
    }

    @Override
    public void updateFeature(FeatureDTO featureDTO) throws ResourceNotFoundException {
        Feature feature=featureRepository.findById(featureDTO.getId()).orElseThrow(()->{return new ResourceNotFoundException("No tiene id");});
        feature.setName(featureDTO.getName());
        feature.setImageUrl(featureDTO.getImageUrl());
        featureRepository.save(feature);
    }

    @Override
    public void deleteFeature(Integer id) throws ResourceNotFoundException {
        Feature feature=featureRepository.findById(id).orElseThrow(()->{return new ResourceNotFoundException("Recurso no encontrado.");});
        feature.setStatus(false);
        featureRepository.save(feature);
    }

    @Override
    public FeatureDTO getFeature(Integer id) throws ResourceNotFoundException {
        Feature  feature=featureRepository.findById(id).orElseThrow(()->{return new ResourceNotFoundException("No encontrado "+id+".");});
        if(feature.getStatus()==null)
            return mapper.convertValue(feature, FeatureDTO.class);
        else
            throw new ResourceNotFoundException("Recurso no encontrado.");
    }

    @Override
    public List<FeatureDTO> getAllFeatures() {
        List<FeatureDTO> featureDTOList =new ArrayList<>();
        for (Feature feature:featureRepository.findByStatusIsNull())
            featureDTOList.add(mapper.convertValue(feature, FeatureDTO.class));

        return featureDTOList;
    }
}
