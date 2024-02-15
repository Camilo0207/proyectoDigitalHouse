package com.dh.dhbooking.repository;

import com.dh.dhbooking.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface IProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByDeletedAtIsNull();

    @Query("select c from Product c where c.city.name LIKE %:name%")
    List<Product> findByCity(String name);

    @Query("select c from Product c where c.category.title LIKE :title%")
    List<Product> findByCategory(String title);

    @Query("SELECT p FROM Product p WHERE NOT EXISTS( SELECT 1 FROM Booking b WHERE b.product.id = p.id AND :feFin <= b.checkOut AND :feInit >= b.checkIn) AND p.city.id = :cityId")
    List<Product> findProductByCityAndDates(@Param("feFin") LocalDate feInit,@Param("feInit") LocalDate feFin,@Param("cityId") Integer cityId);
}
