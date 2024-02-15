package com.dh.dhbooking.service;

import com.dh.dhbooking.dto.BookingDTO;
import com.dh.dhbooking.exception.BookingException;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import java.time.LocalDate;
import java.util.List;


public interface IBookingService {

    BookingDTO createBooking(BookingDTO bookingDTO) throws BookingException, ResourceNotFoundException;
    void updateBooking(BookingDTO bookingDTO) throws ResourceNotFoundException;
    void deleteBooking(Integer id) throws ResourceNotFoundException;
    BookingDTO getBookingById(Integer id) throws ResourceNotFoundException;
    List<BookingDTO> getAllBookings();

    List<BookingDTO> getAllBookingsByIdProduct(Integer id);

    List<BookingDTO> getAllByCheckInAndCheckOut(LocalDate startDate,LocalDate endDate,Integer id,Integer idproduct);

    List<BookingDTO> getAllBookingsByDatesAndProductId(LocalDate startDate,LocalDate endDate,Integer idproduct);

    List<BookingDTO> getAllBookingsByUserEntityId(Integer id);
}
