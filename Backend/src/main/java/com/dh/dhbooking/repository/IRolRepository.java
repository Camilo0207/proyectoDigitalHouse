package com.dh.dhbooking.repository;

import com.dh.dhbooking.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRolRepository  extends JpaRepository<Rol,Integer> {
    List<Rol> findByStatusIsNull();
}
