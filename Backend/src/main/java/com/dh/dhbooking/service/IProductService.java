package com.dh.dhbooking.service;

import com.dh.dhbooking.dto.ProductDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.model.Feature;
import com.dh.dhbooking.model.Product;
import com.fasterxml.jackson.databind.JsonMappingException;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface IProductService {

    ProductDTO createProduct(ProductDTO productDTO);
    void updateProduct(ProductDTO productDTO) throws ResourceNotFoundException, JsonMappingException;
    void deleteProduct(Integer id) throws ResourceNotFoundException, JsonMappingException;
    ProductDTO getProduct(Integer id) throws ResourceNotFoundException;
    Set<ProductDTO> getAllProducts();
    List<ProductDTO> getAllProductsByCity(String name);
    List<ProductDTO> getAllProductsByCategory(String title);
    List<ProductDTO> getAllProductSortinWithField(String field);

    Set<Product> getAllProductsWithPagination(int offset,int pageSize);

    List<ProductDTO> getAllProductsById(Integer id, LocalDate start,LocalDate end);

    void addFeature(Integer idProduct,Integer idFeature) throws ResourceNotFoundException;

    List<Feature> getAllFeaturesByIdProduct(Integer id);

    void addFeatures(Integer idProduct,List<Integer> ids) throws ResourceNotFoundException;

    void deleteFeature(Integer productId,Feature feature) throws ResourceNotFoundException;

    void setFeaturesProduct(Integer productId,List<Integer> ids) throws ResourceNotFoundException;
}
