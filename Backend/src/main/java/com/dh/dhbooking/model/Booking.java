package com.dh.dhbooking.model;



import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDate checkIn;
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDate checkOut;
    private Time startTime;

    private Long createdUserId;

    private LocalDateTime createdAt;

    private Long updatedUserId;

    private LocalDateTime updatedAt;

    private Long deletedUserId;

    private LocalDateTime deletedAt;
    @ManyToOne
    @JoinColumn(name = "user_entity_id", nullable = false)
    private UserEntity userEntity;
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public Booking() {
    }

    public Booking(LocalDate checkIn, LocalDate checkOut, Time startTime, UserEntity userEntity, Product product) {
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.startTime = startTime;
        this.userEntity = userEntity;
        this.product = product;
    }

    public Integer getId() {
        return id;
    }

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(LocalDate checkIn) {
        this.checkIn = checkIn;
    }

    public LocalDate getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(LocalDate checkOut) {
        this.checkOut = checkOut;
    }

    public Time getStartTime() {
        return startTime;
    }

    public void setStartTime(Time startTime) {
        this.startTime = startTime;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Long getCreatedUserId() {
        return createdUserId;
    }

    public void setCreatedUserId(Long createdUserId) {
        this.createdUserId = createdUserId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getUpdatedUserId() {
        return updatedUserId;
    }

    public void setUpdatedUserId(Long updatedUserId) {
        this.updatedUserId = updatedUserId;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getDeletedUserId() {
        return deletedUserId;
    }

    public void setDeletedUserId(Long deletedUserId) {
        this.deletedUserId = deletedUserId;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(LocalDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }
}
