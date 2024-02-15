package com.dh.dhbooking.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CategoryDTOTest {

    @Test
    void getId() {
        CategoryDTO categoria=new CategoryDTO("DTO","hotel robusto","img/1.jpg");
    }

    @Test
    void getTitulo() {
        CategoryDTO categoria=new CategoryDTO("DTO","hotel robusto","img/1.jpg");
        assertEquals("DTO",categoria.getTitle());
    }

    @Test
    void setTitulo() {
        CategoryDTO categoria=new CategoryDTO("DTO","hotel robusto","img/1.jpg");
        categoria.setTitle("titulo modificado");
        assertEquals("titulo modificado",categoria.getTitle());
    }

    @Test
    void getDescripcion() {
        CategoryDTO categoria=new CategoryDTO("DTO","hotel robusto","img/1.jpg");
        assertEquals("hotel robusto",categoria.getDescription());
    }

    @Test
    void setDescripcion() {
        CategoryDTO categoria=new CategoryDTO("DTO","hotel robusto","img/1.jpg");
        categoria.setDescription("descripcion modificada");
        assertEquals("descripcion modificada",categoria.getDescription());
    }








}