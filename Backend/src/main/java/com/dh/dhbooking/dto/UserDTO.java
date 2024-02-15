package com.dh.dhbooking.dto;



import java.time.LocalDateTime;


public class UserDTO  {

    private Integer id;
    private String name;
    private String lastname;
    private String email;
    private String password;
    private String salt;

    private Integer numberRecoveryPassword;

    private Long createdUserId;

    private LocalDateTime createdAt;

    private Long updatedUserId;

    private LocalDateTime updatedAt;

    private Long deletedUserId;

    private LocalDateTime deletedAt;
    private RolDTO role;

    private CityDTO city;

    public UserDTO() {
    }

    public UserDTO(String name, String lastname, String email, String password, RolDTO rol,CityDTO city) {
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

    public RolDTO getRol() {
        return role;
    }

    public void setRol(RolDTO rol) {
        this.role = rol;
    }

    public CityDTO getCity() {
        return city;
    }

    public void setCity(CityDTO city) {
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
        return "UserDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", salt='" + salt + '\'' +
                ", numberRecoveryPassword=" + numberRecoveryPassword +
                ", createdUserId=" + createdUserId +
                ", createdAt=" + createdAt +
                ", updatedUserId=" + updatedUserId +
                ", updatedAt=" + updatedAt +
                ", deletedUserId=" + deletedUserId +
                ", deletedAt=" + deletedAt +
                ", role=" + role +
                ", city=" + city +
                '}';
    }
}
