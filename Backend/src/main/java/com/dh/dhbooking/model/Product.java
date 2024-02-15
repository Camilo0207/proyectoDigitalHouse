package com.dh.dhbooking.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(length = 45)
    private String name;
    @Column(length = 45)
    private String title;
    private String description;
    private String address1;
    @Column(length = 100)
    private String address2;

    private Integer starts;

    private Time checkIn;

    private Time checkOut;

    private String rules;

    private String security;

    private String cancellation;

    private Float longitude;
    private Float latitude;
    private Float score;
    private Long createdUserId;
    private LocalDateTime createdAt;
    private Long updatedUserId;
    private LocalDateTime updatedAt;
    private Long deletedUserId;
    private LocalDateTime deletedAt;

    @OneToMany(mappedBy = "product" )
    @JsonIgnore
    private List<Booking> bookings;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<Image> images;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(name = "product_feature",
            joinColumns = {@JoinColumn(name = "product_id")}, inverseJoinColumns = {@JoinColumn(name = "feature_id")})
    @JsonIgnore
    private List<Feature> features=new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private List<UserFavorite> userFavorites;


    public Product() {
    }

    public Product(String name, String title, String description, String address1, String address2, Integer starts, Time checkIn, Time checkOut, String rules, String security, String cancellation, Float longitude, Float latitude, Category category, City city) {
        this.name = name;
        this.title = title;
        this.description = description;
        this.address1 = address1;
        this.address2 = address2;
        this.starts = starts;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.rules = rules;
        this.security = security;
        this.cancellation = cancellation;
        this.longitude = longitude;
        this.latitude = latitude;
        this.category = category;
        this.city = city;


    }

    public void addFeature(Feature feature){
        features.add(feature);
    }

    public void deleteFeature(Feature feature){
        for (Feature feature1:this.features){
            if(feature.getId()==feature1.getId()){
                this.features.remove(feature1.getId());
            }
        }
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public Float getLongitude() {
        return longitude;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public Float getLatitude() {
        return latitude;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Integer getStarts() {
        return starts;
    }

    public void setStarts(Integer starts) {
        this.starts = starts;
    }

    public Time getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(Time checkIn) {
        this.checkIn = checkIn;
    }

    public Time getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(Time checkOut) {
        this.checkOut = checkOut;
    }

    public String getRules() {
        return rules;
    }

    public void setRules(String rules) {
        this.rules = rules;
    }

    public String getSecurity() {
        return security;
    }

    public void setSecurity(String security) {
        this.security = security;
    }

    public String getCancellation() {
        return cancellation;
    }

    public void setCancellation(String cancellation) {
        this.cancellation = cancellation;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public List<Feature> getFeatures() {
        return features;
    }

    public void setFeatures(List<Feature> features) {
        this.features = features;
    }

    public List<Booking> getBookings() {

        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public List<UserFavorite> getUserFavorites() {
        return userFavorites;
    }

    public void setUserFavorites(List<UserFavorite> userFavorites) {
        this.userFavorites = userFavorites;
    }


}

