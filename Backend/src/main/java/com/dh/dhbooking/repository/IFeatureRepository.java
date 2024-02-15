package com.dh.dhbooking.repository;

import com.dh.dhbooking.model.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IFeatureRepository extends JpaRepository<Feature,Integer> {
    List<Feature> findByStatusIsNull();
}
