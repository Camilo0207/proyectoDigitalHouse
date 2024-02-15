package com.dh.dhbooking.model;



import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="features")
public class Feature implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String imageUrl;

    private Boolean status;

    @ManyToMany(mappedBy = "features")
    @JsonIgnore
    private List<Product> products=new ArrayList<>();



    public Feature() {
    }

    public Feature(String name, String imageUrl) {
        this.name = name;
        this.imageUrl = imageUrl;
    }

    public void addProduct(Product product){
        products.add(product);
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


    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }


    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
