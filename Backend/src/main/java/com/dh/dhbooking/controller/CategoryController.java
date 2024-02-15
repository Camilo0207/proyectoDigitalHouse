package com.dh.dhbooking.controller;

import com.dh.dhbooking.dto.CategoryDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.service.ICategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;





@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "", allowedHeaders = "")
public class CategoryController {

    private ICategoryService categoryService;

    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }


    @PostMapping
    public ResponseEntity<HttpStatus> createCategory(@RequestBody CategoryDTO categoryDTO){
        categoryService.createCategory(categoryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories(){
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getCategory(@PathVariable Integer id) throws ResourceNotFoundException {
        return ResponseEntity.ok(categoryService.getCategory(id));
    }
    @PutMapping
    public ResponseEntity<HttpStatus> updateCategory(@RequestBody CategoryDTO categoryDTO) throws ResourceNotFoundException {
        categoryService.updateCategory(categoryDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public  ResponseEntity<HttpStatus> deleteCategory(@PathVariable Integer id) throws ResourceNotFoundException {

        categoryService.deleteCategory(id);
        return ResponseEntity.status(204).build();
    }
}
