package com.dh.dhbooking.repository;


import com.dh.dhbooking.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IImageRepository extends JpaRepository<Image,Integer> {

    List<Image> findByDeletedAtIsNull();

    @Query("select c from Image c where c.product.id =:id")
    List<Image>findByIdProduct(Integer id);
}
