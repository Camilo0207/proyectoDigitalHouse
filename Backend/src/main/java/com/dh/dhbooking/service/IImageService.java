package com.dh.dhbooking.service;

import com.dh.dhbooking.dto.ImageDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;

import java.util.List;


public interface IImageService {

    public void createImage(ImageDTO imageDTO);

    public void updateImage(ImageDTO imageDTO) throws ResourceNotFoundException;

    public void deleteImage(Integer id) throws ResourceNotFoundException;

    public ImageDTO getImage(Integer id) throws ResourceNotFoundException;

    public List<ImageDTO> getAllImages();

    public List<ImageDTO> getAllImagesByIdProduct(Integer id) throws ResourceNotFoundException;
}
