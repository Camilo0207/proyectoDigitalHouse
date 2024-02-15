package com.dh.dhbooking.service;

import com.dh.dhbooking.dto.BookingDTO;
import com.dh.dhbooking.dto.UserDTO;
import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.model.UserEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;



import javax.mail.internet.MimeMessage;
import java.time.format.DateTimeFormatter;


@Service
public class EmailService {

   final JavaMailSender javaMailSender;
   final IUserService userService;

   final ObjectMapper mapper;

    private final static Logger logger = Logger.getLogger(EmailService.class);

    @Value("${spring.mail.username}")
    private String emailFrom;

   final IBookingService bookingService;


    public EmailService(JavaMailSender javaMailSender, IUserService userService, ObjectMapper mapper, IBookingService bookingService) {
        this.javaMailSender = javaMailSender;
        this.userService = userService;
        this.mapper = mapper;
        this.bookingService = bookingService;
    }

    public  void sendMailRecovery(String email) throws ResourceNotFoundException {
        SimpleMailMessage mailMessage=new SimpleMailMessage();
        UserEntity userService1=userService.findOneByEmail(email);
        String emailTo=userService1.getEmail();
        logger.warn(email);
        logger.info(emailTo);
        Integer number=userService.generatedNumberRandom();
        userService1.setNumberRecoveryPassword(number);
        userService.updateUser(mapper.convertValue(userService1,UserDTO.class));
        Integer m=userService1.getNumberRecoveryPassword();
        logger.warn(m);
            MimeMessagePreparator messagePreparator = new MimeMessagePreparator() {
                public void prepare(MimeMessage mimeMessage) throws Exception {
                    MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                    message.setFrom(emailFrom);
                    logger.info(emailFrom);
                    message.setTo(emailTo);
                    logger.warn(emailTo);
                    message.setSubject("Recuperación de contraseña. Db .");
                    message.setText("<img src='cid:logo'><br><h3>Para crear su nueva contraseña, vaya al siguiente link :<link>http://prueba-grupo1.s3-website.us-east-2.amazonaws.com/ </link> </h3> <br> <h1>Ingrese estos números : "+ number+"</h1> <br>Siga los pasos que se indican en la página.", true);
                    message.addInline("logo", new ClassPathResource("img/logo1.png"));

                }
            };
        javaMailSender.send(messagePreparator);
    }

    public  void sendInfoBooking(Integer id) throws ResourceNotFoundException {
        SimpleMailMessage mailMessage=new SimpleMailMessage();
        BookingDTO bookingDTO=bookingService.getBookingById(id);
        String name=bookingDTO.getProduct().getName();
        String checkIn= bookingDTO.getCheckIn().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        String checkOut=bookingDTO.getCheckOut().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        String email=bookingDTO.getUserEntity().getEmail();
        String startTime=bookingDTO.getStartTime().toString();
        mailMessage.setFrom(emailFrom);
        mailMessage.setTo(email);
        mailMessage.setSubject("Datos de su reserva confirmada.Db");
        mailMessage.setText("Fecha de ingreso : "+checkIn+" Fecha de salida : "+checkOut+". Nombre del establecimiento : "+name+" .");
        javaMailSender.send(mailMessage);
    }

    public void sendMail(Integer id) throws ResourceNotFoundException {

        BookingDTO bookingDTO=bookingService.getBookingById(id);
        String name=bookingDTO.getProduct().getName();
        String checkIn= bookingDTO.getCheckIn().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        String checkOut=bookingDTO.getCheckOut().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        String emailTo=bookingDTO.getUserEntity().getEmail();
        String startTime=bookingDTO.getStartTime().toString();

        MimeMessagePreparator messagePreparator = new MimeMessagePreparator() {
            public void prepare(MimeMessage mimeMessage) throws Exception {
                MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                message.setFrom(emailFrom);
                message.setTo(emailTo);
                message.setSubject("Datos de su reserva confirmada.Db");
                message.setText("<img src='cid:logo'><br><h3>Gracias por confiar en Db.</h3> <br> <h1>Datos de su Reserva</h1><br><b>Fecha de ingreso : </b>" +checkIn+"<br> <b>Fecha de salida : </b>"+checkOut+"<br><b> Nombre del establecimiento :<b>" +name+".", true);
                message.addInline("logo", new ClassPathResource("img/logo1.png"));

            }
        };

        javaMailSender.send(messagePreparator);
    }

    public void sendMailConfirmationRegisterNewUser(Integer id) throws ResourceNotFoundException {
         UserDTO userService1=userService.getUserById(id);
         String emailTo=userService1.getEmail();
         String name=userService1.getName();
         String lastname = userService1.getLastname();
        MimeMessagePreparator messagePreparator = new MimeMessagePreparator() {
            public void prepare(MimeMessage mimeMessage) throws Exception {
                MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                message.setFrom(emailFrom);
                message.setTo(emailTo);
                message.setSubject("Gracias por registrarse en Db Bookings");
                message.setText("<img src='cid:logo'><br><h3>Gracias por confiar en Db.</h3> <br> <h1>Hola "+name+" "+lastname +"</h1><br><b>Ahora puede efectuar reservas y guardar sus favoritos !</b><br> <b>Visite nuestra página : <link>http://prueba-grupo1.s3-website.us-east-2.amazonaws.com/ </link> y a disfrutar! </b><br><b>Conocer el mundo ahora es más fácil.<b>" , true);
                message.addInline("logo", new ClassPathResource("img/logo1.png"));

            }
        };

        javaMailSender.send(messagePreparator);
    }
}
