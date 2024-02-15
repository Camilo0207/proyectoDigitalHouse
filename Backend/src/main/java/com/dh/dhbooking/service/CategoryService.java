package com.dh.dhbooking.service;

import com.dh.dhbooking.dto.CategoryDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.model.Category;
import com.dh.dhbooking.repository.ICategoryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.*;

@Service

public class CategoryService implements ICategoryService {

    private ICategoryRepository categoryRepository;
    private ObjectMapper mapper;

    public CategoryService(ICategoryRepository categoryRepository, ObjectMapper mapper) {
        this.categoryRepository = categoryRepository;
        this.mapper = mapper;
    }

    @Override
    public void createCategory(CategoryDTO categoryDTO) {
        categoryRepository.save(mapper.convertValue(categoryDTO, Category.class));
    }

    @Override
    public void updateCategory(CategoryDTO categoryDTO) throws ResourceNotFoundException {
        Category category=categoryRepository.findById(categoryDTO.getId()).orElseThrow(()->{return new  ResourceNotFoundException("No tiene id");});
             category.setTitle(categoryDTO.getTitle());
             category.setDescription(categoryDTO.getDescription());
             category.setImageUrl(categoryDTO.getImageUrl());
              categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Integer id) throws ResourceNotFoundException {
        Category category=categoryRepository.findById(id).orElseThrow(()->{return new ResourceNotFoundException("No encontrado");});
            category.setStatus(false);
            categoryRepository.save(category);
    }

    public CategoryDTO getCategory(Integer id) throws ResourceNotFoundException {
         return mapper.convertValue(categoryRepository.findById(id).orElseThrow(()->{return new ResourceNotFoundException("No encontrado "+id+".");}), CategoryDTO.class);

    }
    @Override
    public List<CategoryDTO> getAllCategories() {
        List<CategoryDTO> categoryList=new ArrayList<>();
        for (Category category:categoryRepository.findByStatusIsNull()) {
            categoryList.add(mapper.convertValue(category, CategoryDTO.class));
        }
          return categoryList;
    }
}
