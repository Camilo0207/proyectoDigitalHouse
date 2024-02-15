package com.dh.dhbooking.controller;

import com.dh.dhbooking.dto.BookingDTO;
import com.dh.dhbooking.dto.BookingHelp;
import com.dh.dhbooking.exception.BookingException;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.service.IBookingService;
import com.dh.dhbooking.service.IProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.net.URI;
import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BookingController {

    private final IBookingService bookingService;
    private final IProductService productService;

    private final ObjectMapper mapper;

    public BookingController(IBookingService bookingService, IProductService productService, ObjectMapper mapper) {
        this.bookingService = bookingService;
        this.productService = productService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity<Integer> createBooking(@RequestBody BookingHelp bookingHelp) throws BookingException, ResourceNotFoundException {

        LocalDate checkin=LocalDate.parse(bookingHelp.getCheckIn());
        LocalDate checkout=LocalDate.parse(bookingHelp.getCheckOut());
        BookingDTO bookingDTO=new BookingDTO(checkin,checkout,bookingHelp.getStartTime(),bookingHelp.getUserEntity(),bookingHelp.getProduct());
        BookingDTO bookingDTO1=bookingService.createBooking(bookingDTO);

        return ResponseEntity.created(URI.create("/bookings")).body(bookingDTO1.getId());
    }


    @GetMapping
    public List<BookingDTO> getAllBookings(){
        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    public  BookingDTO getBookingById(@PathVariable Integer id) throws ResourceNotFoundException {
            return bookingService.getBookingById(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteBooking(@PathVariable Integer id) throws ResourceNotFoundException {
        bookingService.deleteBooking(id);
        return ResponseEntity.status(204).build();
    }

    @PutMapping
    public ResponseEntity<HttpStatus> updateBooking(@RequestBody BookingDTO bookingDTO) throws ResourceNotFoundException {
        bookingService.updateBooking(bookingDTO);
        return ResponseEntity.status(200).build();
    }
    @GetMapping("/bookingsByProductId/{id}")
    public List<BookingDTO> getAllBookingsByIdProduct(@PathVariable Integer id){
        return bookingService.getAllBookingsByIdProduct(id);
    }

    @GetMapping("/{id}/{start}/{end}")
    public Boolean check(@PathVariable  Integer id,@PathVariable String start,@PathVariable String end) {
        Boolean booking=true;
        LocalDate startLocal=LocalDate.parse(start);
        LocalDate endLocal=LocalDate.parse(end);
        List<BookingDTO> allBookingsFiltered=bookingService.getAllBookingsByDatesAndProductId(startLocal,endLocal,id);
        if (allBookingsFiltered.size()>0)
            booking=false;

        return booking;
    }

    @GetMapping("/bookingsuserid/{id}")
    public List<BookingDTO> getAllBookingsByUserId(@PathVariable Integer id){
        return bookingService.getAllBookingsByUserEntityId(id);
    }

}
