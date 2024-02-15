package com.dh.dhbooking.repository;

import com.dh.dhbooking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IBookingRepository extends JpaRepository<Booking,Integer> {
   List<Booking>  findByDeletedAtIsNull();
   @Query("select b from Booking b where b.product.id=:id")
   List<Booking> findByProductId(Integer id);
   @Query("SELECT b FROM Booking b WHERE ((checkOut>:startDate and checkOut<:endDate)or(checkIn > :startDate and checkIn < :endDate)or(checkIn <= :startDate and checkOut > :endDate)or(checkIn >= :startDate and checkIn < :endDate) or (checkOut > :startDate and checkOut <= :endDate) and (b.product.city.id=:id) and(b.product.id=:idproduct))")
   List<Booking> findByCheckInAndCheckOut(LocalDate startDate,LocalDate endDate,Integer id,Integer idproduct);
    @Query("SELECT b FROM Booking b WHERE (((checkOut>:startDate and checkOut<:endDate)or(checkIn > :startDate and checkIn < :endDate)or(checkIn <= :startDate and checkOut > :endDate)or(checkIn >= :startDate and checkIn < :endDate) or (checkOut > :startDate and checkOut <= :endDate))  and(b.product.id=:idproduct))")
    List<Booking> findByDatesAndProductId(LocalDate startDate,LocalDate endDate,Integer idproduct);

    @Query("select b from Booking b where b.userEntity.id=:id")
    List<Booking> findByUserEntityId(Integer id);

}
