package com.dh.dhbooking.controller;

import com.dh.dhbooking.dto.RolDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.service.IRolService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rols")
public class RolController {

    private final IRolService rolService;

    public RolController(IRolService rolService) {
        this.rolService = rolService;
    }

    @PostMapping
    public ResponseEntity<HttpStatus> createRol(@RequestBody RolDTO rolDTO){
        rolService.createRol(rolDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<HttpStatus> updateRol(@RequestBody RolDTO rolDTO) throws ResourceNotFoundException {
        rolService.updateRol(rolDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteRol(@PathVariable Integer id) throws ResourceNotFoundException {
        rolService.deleteRol(id);
        return ResponseEntity.status(204).build();
    }

    @GetMapping("/{id}")
    public RolDTO getRol(@PathVariable Integer id) throws ResourceNotFoundException {
        return rolService.getRol(id);
    }

    @GetMapping
    public List<RolDTO> getAllRols(){
        return rolService.getAllRols();
    }
}
