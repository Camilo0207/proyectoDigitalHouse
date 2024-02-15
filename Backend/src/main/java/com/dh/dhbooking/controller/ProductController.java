package com.dh.dhbooking.controller;

import com.dh.dhbooking.dto.ProductDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.model.Feature;
import com.dh.dhbooking.model.Product;
import com.dh.dhbooking.service.IProductService;
import com.fasterxml.jackson.databind.JsonMappingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/")
public class ProductController {

    private IProductService productService;

    public ProductController(IProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/products")
    public ResponseEntity<Integer>createProduct(@RequestBody ProductDTO productDTO){
        ProductDTO productDTO1= productService.createProduct(productDTO);
        return ResponseEntity.created(URI.create("/products")).body(productDTO1.getId());
    }

    @PutMapping("/products")
    public ResponseEntity<HttpStatus> updateProduct(@RequestBody ProductDTO productDTO) throws ResourceNotFoundException, JsonMappingException {
        productService.updateProduct(productDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/products /{id}")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable Integer id) throws ResourceNotFoundException, JsonMappingException {
        productService.deleteProduct(id);
        return ResponseEntity.status(204).build();
    }

    @GetMapping()
    public Set<ProductDTO> getAllProducts(){
        return productService.getAllProducts();
    }

    @GetMapping("/products/{id}")
    public ProductDTO getProduct(@PathVariable Integer id) throws ResourceNotFoundException {
        return productService.getProduct(id);
    }

    @GetMapping("/products/city/{name}")
    public  List<ProductDTO> getAllProductsByCity(@PathVariable String name){
        return  productService.getAllProductsByCity(name);
    }

    @GetMapping("/products/category/{title}")
    public List<ProductDTO> getAllProductsByCategory(@PathVariable String title){
        return productService.getAllProductsByCategory(title);
    }

    @GetMapping("/products/sort/{field}")
    public List<ProductDTO> getAllProductsSortWithField(@PathVariable String field){
        return productService.getAllProductSortinWithField(field);
    }

    @GetMapping("/products/pagination/{offset}/{pageSize}")
    public Set<Product> getAllProductsWithPagination(@PathVariable int offset,@PathVariable int pageSize){
        return productService.getAllProductsWithPagination(offset,pageSize);
    }

    @GetMapping("/products/products-enabled/{city}/{start}/{end}")
    public List<ProductDTO> getProductsEnabled(@PathVariable Integer city, @PathVariable  String start,@PathVariable String end ){
        LocalDate startLocal=LocalDate.parse(start);
        LocalDate endLocal=LocalDate.parse(end);
        return productService.getAllProductsById(city,startLocal,endLocal);
    }

    @PostMapping("/productfeature/{idProduct}/{idFeature}")
    public ResponseEntity<HttpStatus> addFeature(@PathVariable Integer idProduct, @PathVariable Integer idFeature) throws ResourceNotFoundException {
        productService.addFeature(idProduct,idFeature);
        return ResponseEntity.status(201).build();
    }
    @GetMapping("/featuresproduct/{id}")
    public List<Feature> getAllFeaturesByIdProduct(@PathVariable Integer id){
        return productService.getAllFeaturesByIdProduct(id);
    }

    @PostMapping("/productfeature/{idProduct}")
    public ResponseEntity<HttpStatus> addFeaturesCollections(@PathVariable Integer idProduct,@RequestBody List<Integer> features) throws ResourceNotFoundException {
        productService.addFeatures(idProduct,features);
        return ResponseEntity.status(201).build();
    }

    @PostMapping("/productfeature/disabled/{id}")
    public ResponseEntity<HttpStatus> disabledFeature(@PathVariable Integer id,@RequestBody List<Integer> features) throws ResourceNotFoundException {
        productService.setFeaturesProduct(id,features);
        return ResponseEntity.status(204).build();
    }
}
