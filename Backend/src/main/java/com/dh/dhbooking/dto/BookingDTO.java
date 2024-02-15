package com.dh.dhbooking.dto;


import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class BookingDTO {

    private Integer id;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Time startTime;

    private UserDTO userEntity;

    private ProductDTO product;

    private Long createdUserId;

    private LocalDateTime createdAt;

    private Long updatedUserId;

    private LocalDateTime updatedAt;

    private Long deletedUserId;

    private LocalDateTime deletedAt;


    public BookingDTO() {
    }

    public BookingDTO(LocalDate checkIn, LocalDate checkOut, Time startTime, UserDTO userEntity, ProductDTO product) {
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

    public UserDTO getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserDTO userEntity) {
        this.userEntity = userEntity;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
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
