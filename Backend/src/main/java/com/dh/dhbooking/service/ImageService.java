package com.dh.dhbooking.service;


import com.dh.dhbooking.dto.ImageDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.model.Image;
import com.dh.dhbooking.repository.IImageRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ImageService implements IImageService {

    private final IImageRepository iImageRepository;
    private final ObjectMapper mapper;



    public ImageService(IImageRepository iImageRepository, ObjectMapper mapper) {
        this.iImageRepository = iImageRepository;
        this.mapper = mapper;

    }

    @Override
    public void createImage(ImageDTO imageDTO) {
        imageDTO.setCreatedAt(LocalDateTime.now());
        iImageRepository.save(mapper.convertValue(imageDTO, Image.class));
    }

    @Override
    public void updateImage(ImageDTO imageDTO) throws ResourceNotFoundException {
        Image image=iImageRepository.findById(imageDTO.getId()).orElseThrow(()->{return new ResourceNotFoundException("No tiene id");});
        image.setImageUrl(imageDTO.getImageUrl());
        image.setName(imageDTO.getName());
        image.setUpdatedAt(LocalDateTime.now());
        iImageRepository.save(image);
    }

    @Override
    public void deleteImage(Integer id) throws ResourceNotFoundException {
        Image image=iImageRepository.findById(id).orElseThrow(()->{return new ResourceNotFoundException("No encontrado");});
        image.setDeletedAt(LocalDateTime.now());
        iImageRepository.save(image);

    }

    @Override
    public ImageDTO getImage(Integer id) throws ResourceNotFoundException {
        return mapper.convertValue(iImageRepository.findById(id).orElseThrow(()->{return new ResourceNotFoundException("No encontrado "+id+".");}), ImageDTO.class);
    }

    @Override
    public List<ImageDTO> getAllImages() {
        List<ImageDTO > imageDTOS=new ArrayList<>();
        for (Image image:iImageRepository.findByDeletedAtIsNull())
                imageDTOS.add(mapper.convertValue(image, ImageDTO.class));

        return imageDTOS;
    }

    @Override
    public List<ImageDTO> getAllImagesByIdProduct(Integer id) throws ResourceNotFoundException {
        List<ImageDTO> imageDTOList=new ArrayList<>();
        for (Image image:iImageRepository.findByIdProduct(id)){
            if(image.getDeletedAt()==null)
               imageDTOList.add(mapper.convertValue(image,ImageDTO.class));
        }
        return imageDTOList;
    }

}
