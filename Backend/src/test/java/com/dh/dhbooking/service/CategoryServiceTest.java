package com.dh.dhbooking.service;

import com.dh.dhbooking.dto.CategoryDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class CategoryServiceTest {

    @Autowired
    private ICategoryService categoryService;

    @Test
    void createCategory() {

        CategoryDTO categoryDTO=new CategoryDTO("DTO","hotel robusto","img/1.jpg");
        List<CategoryDTO> categories1=categoryService.getAllCategories();
        categoryService.createCategory(categoryDTO);
        List<CategoryDTO> categories2= categoryService.getAllCategories();
        assertEquals(categories1.size()+1,categories2.size());
    }

    @Test
    void updateCategory() throws ResourceNotFoundException {
        CategoryDTO categoryDTO=new CategoryDTO("DTO","hotel robusto","img/1.jpg");
        categoryService.createCategory(categoryDTO);
        CategoryDTO categoryDTO1=categoryService.getCategory(1);
        categoryDTO1.setDescription("Gran Hotel Luxury");
        categoryService.updateCategory(categoryDTO1);
        assertEquals("Gran Hotel Luxury",categoryService.getCategory(1).getDescription());

    }

    @Test
    void deleteCategory() throws ResourceNotFoundException {
        CategoryDTO categoryDTO=new CategoryDTO("DTO","hotel robusto","img/1.jpg");
        categoryService.createCategory(categoryDTO);

        categoryService.deleteCategory(1);
        assertEquals(0,categoryService.getAllCategories().size());
    }

    @Test
    void getAllCategories() {
        CategoryDTO categoryDTO=new CategoryDTO("DTO","hotel robusto","img/1.jpg");
        categoryService.createCategory(categoryDTO);
        CategoryDTO categoria1=new CategoryDTO("DTO1","hotel robusto 1","img/11.jpg");
        categoryService.createCategory(categoria1);
        assertEquals(2,categoryService.getAllCategories().size());
    }
}