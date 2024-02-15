package com.dh.dhbooking.dto;




public class UserFavoriteDTO {

    private Integer id;

    private UserDTO userEntity;

    private ProductDTO product;

    public UserFavoriteDTO() {
    }

    public UserFavoriteDTO(UserDTO userEntity, ProductDTO product) {
        this.userEntity = userEntity;
        this.product = product;
    }

    public Integer getId() {
        return id;
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
}
