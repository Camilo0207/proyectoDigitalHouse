package com.dh.dhbooking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
public class UserEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String lastname;
    private String email;
    private String password;
    private String salt;

    private Long createdUserId;

    private LocalDateTime createdAt;

    private Long updatedUserId;

    private LocalDateTime updatedAt;

    private Long deletedUserId;

    private LocalDateTime deletedAt;

    private Integer numberRecoveryPassword;

    @OneToMany(mappedBy = "userEntity")
    @JsonIgnore
    private List<Booking> bookings;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Rol role;

    @ManyToOne
    @JoinColumn(name = "city_id",nullable = false)
    private City city;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private List<UserFavorite> userFavorites;


    public UserEntity() {
    }

    public UserEntity(String name, String lastname, String email, String password, Rol rol, City city) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = rol;
        this.city=city;
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

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public Rol getRol() {
        return role;
    }

    public void setRol(Rol rol) {
        this.role = rol;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
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

    public Integer getNumberRecoveryPassword() {
        return numberRecoveryPassword;
    }

    public void setNumberRecoveryPassword(Integer numberRecoveryPassword) {
        this.numberRecoveryPassword = numberRecoveryPassword;
    }

    @Override
    public String toString() {
        return "UserEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", salt='" + salt + '\'' +
                ", role=" + role +
                ", city=" + city +
                '}';
    }
}
