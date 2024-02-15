package com.dh.dhbooking.dto;



public class CityDTO {

    private Integer id;
    private String name;

    private Boolean status;

    public CityDTO() {
    }

    public CityDTO(String name) {
        this.name = name;
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

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
