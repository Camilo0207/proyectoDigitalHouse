package com.dh.dhbooking.service;

import com.dh.dhbooking.dto.ProductDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.model.Category;
import com.dh.dhbooking.model.Feature;
import com.dh.dhbooking.model.Product;
import com.dh.dhbooking.repository.IProductRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class ProductService implements IProductService {

    private final static Logger logger = Logger.getLogger(ProductService.class);
    private IProductRepository productRepository;
    private ObjectMapper mapper;

    private IFeatureService featureService;

    public ProductService(IProductRepository productRepository, ObjectMapper mapper, IFeatureService featureService) {
        this.productRepository = productRepository;
        this.mapper = mapper;
        this.featureService = featureService;
    }

    @Override
    public ProductDTO createProduct(ProductDTO productDTO) {
        logger.info("entro a createService");
        productDTO.setCreatedAt(LocalDateTime.now());
       Product product= productRepository.save(mapper.convertValue(productDTO, Product.class));
       return mapper.convertValue(product,ProductDTO.class);
    }

    @Override
    public void updateProduct(ProductDTO productDTO) throws ResourceNotFoundException {
        Product product = productRepository.findById(productDTO.getId()).orElseThrow(() -> {
            return new ResourceNotFoundException("No encontrado");
        });
        product.setName(productDTO.getName());
        product.setTitle(productDTO.getTitle());
        product.setDescription(productDTO.getDescription());
        product.setAddress1(productDTO.getAddress1());
        product.setAddress2(productDTO.getAddress2());
        product.setCancellation(productDTO.getCancellation());
        product.setRules(productDTO.getRules());
        product.setSecurity(productDTO.getSecurity());
        product.setLongitude(productDTO.getLongitude());
        product.setLatitude(productDTO.getLatitude());
        product.setUpdatedAt(LocalDateTime.now());
        product.setCategory(mapper.convertValue(productDTO.getCategory(), Category.class));
        productRepository.save(product);
    }

    @Override
    public void deleteProduct(Integer id) throws ResourceNotFoundException {
        Product product = productRepository.findById(id).orElseThrow(() -> {
            return new ResourceNotFoundException("No encontrado");
        });
        product.setDeletedAt(LocalDateTime.now());
        productRepository.save(product);
    }

    @Override
    public ProductDTO getProduct(Integer id) throws ResourceNotFoundException {
        return mapper.convertValue(productRepository.findById(id).orElseThrow(() -> {
            return new ResourceNotFoundException("No encontrado");
        }), ProductDTO.class);
    }

    @Override
    public Set<ProductDTO> getAllProducts() {
        List<Product> productList = productRepository.findByDeletedAtIsNull();
        // list.stream().map(number -> number * 3).forEach(System.out::println);
        //    }
        Set<ProductDTO> productDTOS = new HashSet<>();
        for (Product product : productList) {
            productDTOS.add(mapper.convertValue(product, ProductDTO.class));
        }
        return productDTOS;
    }

    @Override
    public List<ProductDTO> getAllProductsByCity(String name) {
        List<ProductDTO> productList = new ArrayList<>();
        for (Product product : productRepository.findByCity(name))
            productList.add(mapper.convertValue(product, ProductDTO.class));

        return productList;
    }

    @Override
    public List<ProductDTO> getAllProductsByCategory(String title) {
        List<ProductDTO> productDTOList = new ArrayList<>();
        for (Product product : productRepository.findByCategory(title))
            productDTOList.add(mapper.convertValue(product, ProductDTO.class));

        return productDTOList;
    }

    @Override
    public List<ProductDTO> getAllProductSortinWithField(String field) {
        List<ProductDTO> productList = new ArrayList<>();
        for (Product product : productRepository.findAll(Sort.by(Sort.Direction.ASC, field)))
            productList.add(mapper.convertValue(product, ProductDTO.class));

        return productList;

    }

    @Override
    public Set<Product> getAllProductsWithPagination(int offset, int pageSize) {
        Page<Product> products = productRepository.findAll(PageRequest.of(offset, pageSize));
        Set<Product> pages = new HashSet<>();
        for (Product product : products)
            pages.add(product);
        return pages;
    }

    @Override
    public List<ProductDTO> getAllProductsById(Integer id, LocalDate start, LocalDate end) {
        List<ProductDTO> productDTOList = new ArrayList<>();

        for (Product product:productRepository.findProductByCityAndDates(start, end, id)){
            productDTOList.add(mapper.convertValue(product,ProductDTO.class));
        }
        return productDTOList;
    }

    @Override
    public void addFeature(Integer idProduct,Integer idFeature) throws ResourceNotFoundException {
        Product product=productRepository.findById(idProduct).orElseThrow(()->{return new ResourceNotFoundException("Recurso NO encontraso");});
        Feature feature=mapper.convertValue(featureService.getFeature(idFeature),Feature.class);
        product.addFeature(feature);
        productRepository.save(product);
    }

    @Override
    public List<Feature> getAllFeaturesByIdProduct(Integer id) {
        return productRepository.findById(id).get().getFeatures();
    }

    @Override
    public void addFeatures(Integer idProduct,List<Integer> ids) throws ResourceNotFoundException {
        Product product=productRepository.findById(idProduct).orElseThrow(()->{return new ResourceNotFoundException("Recurso NO encontraso");});
       for (Integer id:ids){
            Feature feature=mapper.convertValue(featureService.getFeature(id),Feature.class);
            product.addFeature(feature);
            productRepository.save(product);
        }
        
    }

    @Override
    public void setFeaturesProduct(Integer productId, List<Integer> ids) throws ResourceNotFoundException {
        Product product=productRepository.findById(productId).orElseThrow(()->{return new ResourceNotFoundException("Recurso NO encontraso");});
        List<Feature>featureList=new ArrayList<>();
        for (Integer id:ids) {
            Feature feature = mapper.convertValue(featureService.getFeature(id), Feature.class);
            featureList.add(feature);
        }
        product.setFeatures(featureList);
        productRepository.save(product);
    }

    @Override
    public void deleteFeature(Integer productId,Feature feature) throws ResourceNotFoundException {
        Product product=productRepository.findById(productId).orElseThrow(()->{return new ResourceNotFoundException("Recurso No encontrado");});
        logger.info(Arrays.stream(product.getFeatures().toArray()).toList());
        product.deleteFeature(feature);
        logger.warn(product.toString());
        productRepository.save(product);

    }
}
