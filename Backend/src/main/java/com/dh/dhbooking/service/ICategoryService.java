package com.dh.dhbooking.service;

import com.dh.dhbooking.dto.CategoryDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import java.util.List;


public interface ICategoryService {
        void createCategory(CategoryDTO categoryDTO);
        void updateCategory(CategoryDTO categoryDTO) throws ResourceNotFoundException;
        void deleteCategory(Integer id) throws ResourceNotFoundException;
        CategoryDTO getCategory(Integer id) throws ResourceNotFoundException;
        List<CategoryDTO> getAllCategories();
}
