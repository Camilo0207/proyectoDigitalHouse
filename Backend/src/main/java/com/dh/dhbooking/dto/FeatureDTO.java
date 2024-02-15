package com.dh.dhbooking.dto;




public class FeatureDTO {

    private Integer id;
    private String name;
    private String imageUrl;

    private Boolean status;


    public FeatureDTO() {
    }


    public FeatureDTO(String name, String imageUrl) {
        this.name = name;
        this.imageUrl = imageUrl;

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



    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
