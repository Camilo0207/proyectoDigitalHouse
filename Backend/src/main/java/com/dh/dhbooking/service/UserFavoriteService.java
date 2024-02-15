package com.dh.dhbooking.service;


import com.dh.dhbooking.dto.UserFavoriteDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.model.UserFavorite;
import com.dh.dhbooking.repository.IUserFavoriteRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
@Service
public class UserFavoriteService implements IUserFavoriteService, Serializable {

    private final IUserFavoriteRepository userFavoriteRepository;
    private final IUserService userService;

    private final IProductService productService;
    private final ObjectMapper mapper;

    public UserFavoriteService(IUserFavoriteRepository userFavoriteRepository, ObjectMapper mapper,IUserService userService,IProductService productService) {
        this.userFavoriteRepository = userFavoriteRepository;
        this.mapper = mapper;
        this.userService=userService;
        this.productService=productService;
    }

    @Override
    public UserFavoriteDTO createUserFavorite(UserFavoriteDTO userFavoriteDTO) throws ResourceNotFoundException {
//        UserFavoriteDTO userFavoriteDTO1=this.getUserFavoriteByProductIdAndUserId(userFavoriteDTO.getProduct().getId(),userFavoriteDTO.getUserEntity().getId());
//       if (userFavoriteDTO1.getId()!=null){
//          // this.deleteUserFavorite(userFavoriteDTO1.getId());
//           return;
//       }
       UserFavorite userFavorite= userFavoriteRepository.save(mapper.convertValue(userFavoriteDTO, UserFavorite.class));
       return mapper.convertValue(userFavorite,UserFavoriteDTO.class);
    }

    @Override
    public void deleteUserFavorite(Integer id) throws ResourceNotFoundException {
        UserFavorite userFavorite=userFavoriteRepository.findById(id).orElseThrow(()->{return new ResourceNotFoundException("Recurso no encontrado.");});
        userFavoriteRepository.deleteById(id);
    }

    @Override
    public List<UserFavoriteDTO> getAllFavorites() {
        List<UserFavoriteDTO> userFavoriteDTOList=new ArrayList<>();
        for (UserFavorite userFavorite:userFavoriteRepository.findAll())
            userFavoriteDTOList.add(mapper.convertValue(userFavorite,UserFavoriteDTO.class));
        return userFavoriteDTOList;
    }

    @Override
    public UserFavoriteDTO getUserFavoriteById(Integer id) throws ResourceNotFoundException {
        UserFavorite userFavorite=userFavoriteRepository.findById(id).orElseThrow(()->{return new ResourceNotFoundException("Recurso no encontrado");});
        return mapper.convertValue(userFavorite,UserFavoriteDTO.class);
    }

    @Override
    public UserFavoriteDTO getUserFavoriteByProductIdAndUserId(Integer productId, Integer userId) throws ResourceNotFoundException {
       return mapper.convertValue(userFavoriteRepository.findByProductIdAndUserId(productId,userId).orElseThrow(()->{return new ResourceNotFoundException("Recurso no encontrado");}),UserFavoriteDTO.class);

    }
}
