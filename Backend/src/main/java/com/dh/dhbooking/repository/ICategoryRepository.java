package com.dh.dhbooking.repository;

import com.dh.dhbooking.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICategoryRepository extends JpaRepository<Category,Integer> {
    List<Category> findByStatusIsNull();

}
