package com.dh.dhbooking.repository;


import com.dh.dhbooking.model.UserFavorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface IUserFavoriteRepository extends JpaRepository<UserFavorite,Integer> {

    @Query("select u from UserFavorite u where u.product.id= :productId and u.userEntity.id= :userId")
   Optional<UserFavorite> findByProductIdAndUserId(Integer productId, Integer userId);
}
