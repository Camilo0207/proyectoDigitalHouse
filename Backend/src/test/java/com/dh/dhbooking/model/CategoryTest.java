package com.dh.dhbooking.model;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest

class CategoryTest {

    @Test
    void getId() {
        Category category=new Category("NUEVO","hotel robusto","img/1.jpg");

    }

    @Test
    void getTitle() {
        Category category=new Category("NUEVO","hotel robusto","img/1.jpg");
        assertEquals("NUEVO",category.getTitle());
        assertNotEquals("mal",category.getTitle());
    }

    @Test
    void setTitle() {
        Category category=new Category("NUEVO","hotel robusto","img/1.jpg");
        category.setTitle("otro titulo");
        assertEquals("otro titulo",category.getTitle());
    }

    @Test
    void getDescription() {
        Category category=new Category("NUEVO","hotel robusto","img/1.jpg");
        assertEquals("hotel robusto",category.getDescription());
    }

    @Test
    void setDescription() {
        Category category=new Category("NUEVO","hotel robusto","img/1.jpg");
        category.setDescription("descripcion modificada");
        assertEquals("descripcion modificada",category.getDescription());
    }

   /** @Test
    void getUrlImagen() {
        Category category=new Category("NUEVO","hotel robusto","img/1.jpg");
        assertEquals("img/1.jpg",category.getUrlImage());
    }*/

   /** @Test
    void setUrlImagen() {
        Category category=new Category("NUEVO","hotel robusto","img/1.jpg");
        category.setUrlImage("url modificada");
        assertEquals("url modificada",category.getUrlImage());
    }*/





}