package com.dh.dhbooking.dto;


import java.time.LocalDateTime;

public class ImageDTO {

    private Integer id;
    private String name;
    private String imageUrl;
    private Long createdUserId;
    private LocalDateTime createdAt;
    private Long updatedUserId;
    private LocalDateTime updatedAt;
    private Long  deletedUserId;
    private LocalDateTime deletedAt;

    private ProductDTO product;


    public ImageDTO() {
    }

    public ImageDTO(String name, String imageUrl,ProductDTO product) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.product=product;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
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

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }
}
