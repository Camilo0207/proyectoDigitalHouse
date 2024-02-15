package com.dh.dhbooking.repository;


import com.dh.dhbooking.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface IUserRepository extends JpaRepository<UserEntity,Integer> {

    UserEntity findOneByEmail(String email);

}
