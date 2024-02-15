package com.dh.dhbooking.repository;


import com.dh.dhbooking.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface ICityRepository extends JpaRepository<City,Integer> {

    List<City> findByStatusIsNull();

    @Query("select c from City c where c.name LIKE %:name%")
    List<City> findByName(String name);
}
