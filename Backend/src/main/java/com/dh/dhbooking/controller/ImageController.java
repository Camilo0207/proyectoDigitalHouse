package com.dh.dhbooking.controller;

import com.dh.dhbooking.dto.ImageDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.service.IImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/images")
public class ImageController {

    private final IImageService iImageService;

    public ImageController(IImageService iImageService) {
        this.iImageService = iImageService;
    }

    @PostMapping
    public ResponseEntity<HttpStatus> createImage(@RequestBody ImageDTO imageDTO){
        iImageService.createImage(imageDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ImageDTO getImage(@PathVariable Integer id) throws ResourceNotFoundException {
        return iImageService.getImage(id);
    }

    @GetMapping
    public List<ImageDTO> getAllImages(){
        return iImageService.getAllImages();
    }

    @PutMapping()
    public ResponseEntity<HttpStatus> updateImage(@RequestBody ImageDTO imageDTO) throws ResourceNotFoundException {
        iImageService.updateImage(imageDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteImage(@PathVariable Integer id) throws ResourceNotFoundException {
        iImageService.deleteImage(id);
        return ResponseEntity.status(204).build();
    }

    @GetMapping("/imagesproduct/{id}")
    public List<ImageDTO> getAllImagesByIdProduct(@PathVariable Integer id) throws ResourceNotFoundException {
        return iImageService.getAllImagesByIdProduct(id);
    }
}
