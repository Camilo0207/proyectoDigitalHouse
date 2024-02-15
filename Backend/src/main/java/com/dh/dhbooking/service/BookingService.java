package com.dh.dhbooking.service;

import com.dh.dhbooking.dto.BookingDTO;
import com.dh.dhbooking.exception.BookingException;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.model.Booking;
import com.dh.dhbooking.repository.IBookingRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService implements IBookingService{

    private final IBookingRepository bookingRepository;
    private final ObjectMapper mapper;


   private final UserService userService;

    public BookingService(IBookingRepository bookingRepository, ObjectMapper mapper, UserService userService) {
        this.bookingRepository = bookingRepository;
        this.mapper = mapper;
       this.userService = userService;
    }

//, UserService userService

    @Override
    public BookingDTO createBooking(BookingDTO bookingDTO) throws BookingException, ResourceNotFoundException {
      // Integer userId=userService.getIdUser();
        LocalDate today=LocalDate.now();
        if(bookingDTO.getCheckIn().compareTo(today)>=0 && bookingDTO.getCheckOut().compareTo(today)>0) {
                if (this.check(bookingDTO)) {
                   // bookingDTO.setCreatedUserId(Long.valueOf(userId));
                    bookingDTO.setCreatedAt(LocalDateTime.now());
                   Booking booking= bookingRepository.save(mapper.convertValue(bookingDTO, Booking.class));
                    return mapper.convertValue(booking,BookingDTO.class);
                } else throw new BookingException("No está disponible en las fechas seleccionadas.");
        } else throw new  ResourceNotFoundException("La fecha debe ser mayor o igual a hoy.");

    }

    @Override
    public void updateBooking(BookingDTO bookingDTO) throws ResourceNotFoundException {
        Booking booking=bookingRepository.findById(bookingDTO.getId()).orElseThrow(()->{return new ResourceNotFoundException("No se encontro el recurso solicitado");});
        LocalDate today=LocalDate.now();
        if(bookingDTO.getCheckIn().compareTo(today)>=0 && bookingDTO.getCheckOut().compareTo(today)>0) {
            booking.setCheckIn(bookingDTO.getCheckIn());
            booking.setCheckOut(bookingDTO.getCheckOut());
            booking.setStartTime(bookingDTO.getStartTime());
            bookingRepository.save(booking);
        }else throw new  ResourceNotFoundException("La fecha debe ser mayor o igual a hoy.");
    }

    @Override
    public void deleteBooking(Integer id) throws ResourceNotFoundException {
        Booking booking=bookingRepository.findById(id).orElseThrow(()->{return new ResourceNotFoundException("No se encontro el recurso solicitado");});
        booking.setDeletedAt(LocalDateTime.now());
        bookingRepository.save(booking);
    }

    @Override
    public BookingDTO getBookingById(Integer id) throws ResourceNotFoundException {
        return mapper.convertValue(bookingRepository.findById(id).orElseThrow(()->{return new ResourceNotFoundException("Recurso no encontrado");}),BookingDTO.class);
    }

    @Override
    public List<BookingDTO> getAllBookings() {
        List<BookingDTO> bookingDTOList=new ArrayList<>();
        for (Booking booking:bookingRepository.findByDeletedAtIsNull())
            bookingDTOList.add(mapper.convertValue(booking,BookingDTO.class));
        return bookingDTOList;
    }

    @Override
    public List<BookingDTO> getAllBookingsByIdProduct(Integer id) {
        List<BookingDTO> bookingDTOList=new ArrayList<>();
        for (Booking booking:bookingRepository.findByProductId(id))
            bookingDTOList.add(mapper.convertValue(booking,BookingDTO.class));
        return bookingDTOList;
    }

    @Override
    public List<BookingDTO> getAllByCheckInAndCheckOut(LocalDate startDate, LocalDate endDate,Integer id,Integer idproduct) {
        List<BookingDTO> bookingDTOList=new ArrayList<>();
        for (Booking booking:bookingRepository.findByCheckInAndCheckOut(startDate,endDate,id,idproduct))
            bookingDTOList.add(mapper.convertValue(booking,BookingDTO.class));
        return bookingDTOList;
    }

    @Override
    public List<BookingDTO> getAllBookingsByDatesAndProductId(LocalDate startDate, LocalDate endDate, Integer idproduct) {
        List<BookingDTO> bookingDTOList=new ArrayList<>();
        for (Booking booking:bookingRepository.findByDatesAndProductId(startDate,endDate,idproduct))
            bookingDTOList.add(mapper.convertValue(booking,BookingDTO.class));
        return bookingDTOList;
    }

    public Boolean check(BookingDTO bookingDTO) {
        Boolean booking=true;
        List<Booking> allBookingsFiltered=bookingRepository.findByDatesAndProductId(bookingDTO.getCheckIn(),bookingDTO.getCheckOut(),bookingDTO.getProduct().getId());
        if (allBookingsFiltered.size()>0)
            booking=false;
        return booking;
    }

    @Override
    public List<BookingDTO> getAllBookingsByUserEntityId(Integer id) {
        List<BookingDTO> allBookings=new ArrayList<>();
        for (Booking booking:bookingRepository.findByUserEntityId(id))
             allBookings.add(mapper.convertValue(booking,BookingDTO.class));
        return allBookings;
    }
}
