package com.dh.dhbooking.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "users_favorites")
public class UserFavorite implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    public UserFavorite() {
    }

    public UserFavorite(Product product, UserEntity userEntity) {
        this.product = product;
        this.userEntity = userEntity;
    }

    public Integer getId() {
        return id;
    }

    public Product getProduct() {
        return product;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }
}
