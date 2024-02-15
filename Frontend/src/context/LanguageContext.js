import { createContext, useEffect, useState } from "react";

const LanguageContext = createContext();

const initialLanguage = "es";
const translations = {
  es: {
    headerLogo: "Sentite como en tu hogar",
    headerLoginBtn: "Iniciar sesión",
    headerNewAccountBtn: "Crear cuenta",
    greeting: "Hola,",
    logOut: "cerrar sesión",
    doYouWant: "Deseas",
    searchHotel: "Busca ofertas en hoteles,",
    housesAndMuch: "casas y mucho más",
    whereWeGo: "¿A dónde vamos?",
    search: "Buscar",
    typeOfAccommodation: "Buscar por tipo de alojamiento",
    recommendations: "Recomendaciones",
    hotelDeals: "¿Que ofrece este lugar?",
    youShouldKnow: "Qué tenés que saber",
    housesRules: "Normas de la casa",
    healthSecurity: "Salud y seguridad",
    cancellationPolicy: "Política de cancelación",
    availableDates: "Fechas Disponibles",
    addDates: "Agrega tus fechas de viaje para obtener precios exactos",
    startReservation: "Iniciar reserva",
    seeMore: "Ver más",
    messageErrorLogin: "Para realizar una reserva necesitas estar logueado",
    login: "Iniciar sesión",
    noAccount: "¿Aún no tenes cuenta?",
    signUp: "Registrate",
    email: "Correo electrónico",
    password: "Contraseña",
    name: "Nombre",
    lastname: "Apellido",
    confirmPassword: "Confirmar contraseña",
    alreadyAccount: "¿Ya tienes una cuenta?",
    thanks: "¡Muchas gracias!",
    reservationPhrase: "Su reserva se ha realizado con éxito.",
    resultsOf: "Resultados de",
    showMap: "MOSTRAR EN EL MAPA",
    veryBad: "Muy malo",
    bad: "Malo",
    regular: "Regular",
    good: "Bueno",
    veryGood: "Muy bueno",
    kitchen: "Cocina",
    tv: "Televisión",
    airConditioning: "Aire acondicionado",
    pets: "Apto mascotas",
    freeParking: "Estacionamiento gratuito",
    wifi: "Wifi",
    share: "Compartir",
    fieldRequiered: "Este campo es obligatorio",
    invalidEmail: "Correo inválido. Ej:'ejemplo@gmail.com'",
    passWordDoesntMatch: "La contraseña no coincide",
    userDontExist: "Usuario no existe",
    incorrectCredential: "Credenciales incorrectas",
    logOutQuestion: "¿Deseas cerrar sesion?",
    favorites: "Favoritos",
    YouMustLogIn: "Debes iniciar sesión",
    selectADate: "Seleccioná tu fecha de reserva",
    completeYourData: "Completa tus datos",
    arrivalTime: "Tu horario de llegada",
    SelectYourArrivalTime: "Indica tu horario estimada de llegada",
    ReserveDetail: "Detalle de la reserva",
    CheckIn: "Check in",
    CheckOut: "Check out",
    city: "Ciudad",
    emailExist: "Correo ya está registrada",
    administration: "Administración",
    propertyName: "Nombre de la propiedad",
    createProperty: "Crear propiedad",
    categories: "Categorias",
    chooseCategory: "Escoge una categoria",
    address: "Dirección",
    chooseCity: "Escoge una ciudad",
    description: "Descripción",
    addAttributes: "Agregar atributos",
    icon: "Icono",
    isNotFound: "No se encuentra",
    alreadyChoose: "Ya escogiste este servicio",
    productPolicies: "Políticas del producto",
    uploadImages: "Cargar imagenes",
    atLeastFiveImages: "Sube mínimo 5 imágenes",
    incorrectFormat: "Formato incorrecto: 'ej:https://ejemplo.jpg'",
    create: "Crear",
    writeHere: "Escribe aquí",
    stayAt:"Alojate en",
    favoritesMsg:"No hay favoritos que mostrar",
    myReserves: "Mis Reservas",
    edit:"Guardar",
    done:"¡Bien!",
    hotelEdited:"Hotel editado con exito",
    hotelCreated:"Hotel creado con éxito",
    confirmBooking:"Confirmar reserva",
    chekInRook:"Tu habitacion va a estar lista para el check-in entre",
    selectTime:"Selecciona hora",
    registrationCheckIn:"Ingresa la fecha de registro",
    registrationCkeckOut:"Ingresa la fecha de salida",
    page:"Pagina",
    sendingReservationEmail: "Te enviamos un email con los datos de tu reserva"
  },
  en: {
    headerLogo: "Make yourself at home",
    headerLoginBtn: "Login ",
    headerNewAccountBtn: "Create Account",
    greeting: "Hello,",
    logOut: "log out",
    doYouWant: "Do you want",
    searchHotel: "Search hotel deals,",
    housesAndMuch: "houses and more",
    whereWeGo: "Where we go?",
    search: "Search",
    typeOfAccommodation: "Search by type of accommodation",
    recommendations: "Recommendations",
    hotelDeals: "What does this place offer?",
    youShouldKnow: "You should know",
    housesRules: "House's rules",
    healthSecurity: "Health and security",
    cancellationPolicy: "Cancellation policy",
    availableDates: "Available Dates",
    addDates: "Add your travel dates to get exact prices",
    startReservation: "Start reservation",
    seeMore: "See more",
    messageErrorLogin: "To make a reservation it is necessary to be logged in",
    login: "Login",
    noAccount: "You still do not have an account?",
    signUp: "Sign up",
    email: "Email",
    password: "Password",
    name: "Name",
    lastname: "Lastname",
    confirmPassword: "Confirm password",
    alreadyAccount: "Do you already have an account?",
    thanks: "Thank you very much!",
    reservationPhrase: "Your reservation has been made successfully",
    resultsOf: "Results of",
    showMap: "SHOW ON MAP",
    veryBad: "Very bad",
    bad: "Bad",
    regular: "Regular",
    good: "Good",
    veryGood: "Very good",
    kitchen: "Kitchen",
    tv: "Television",
    airConditioning: "Air-conditioning",
    pets: "Pet friendly",
    freeParking: "Free parking",
    wifi: "Wifi",
    share: "Share",
    fieldRequiered: "This field is required",
    invalidEmail: "Invalid email. Ex:'example@gmail.com'",
    passWordDoesntMatch: "The password does not match",
    userDontExist: "User does not exist",
    incorrectCredential: "Incorrect credentials",
    logOutQuestion: "Do you want to log out?",
    favorites: "Favorites",
    YouMustLogIn: "You must login",
    selectADate: "Select your reservation date",
    completeYourData: "Complete your data",
    arrivalTime: "Your arrival time",
    SelectYourArrivalTime: "Indicate your estimated arrival time",
    ReserveDetail: "Reservation details",
    CheckIn: "Check in",
    CheckOut: "Check out",
    city: "City",
    emailExist: "Email is already registered",
    administration: "Administration",
    propertyName: "Property name",
    createProperty: "Create property",
    categories: "Categories",
    chooseCategory: "Choose a category",
    address: "Address",
    chooseCity: "Choose a city",
    description: "Description",
    addAttributes: "Add attributes",
    icon: "Icon",
    isNotFound: "Is not found",
    alreadyChoose: "You already chose this service",
    productPolicies: "Product Policies",
    uploadImages: "Upload images",
    atLeastFiveImages: "Upload at least 5 images",
    incorrectFormat: "Incorrect format: 'ej:https://example.jpg'",
    create: "Create",
    writeHere: "Write here",
    stayAt:"Stay at",
    favoritesMsg:"There are no favorites to show",
    myReserves: "My reserves",
    edit:"Save",
    done:"¡Done!",
    hotelEdited:"Hotel edited successfully",
    hotelCreated:"Hotel created successfully",
    confirmBooking:"Confirm booking",
    chekInRook:"Your room will be ready for check-in between",
    selectTime:"Select time",
    registrationCheckIn:"Enter the check in date",
    registrationCkeckOut:"Enter the check out date",
    page:"Page",
    sendingReservationEmail: "We send you an email with the details of your reservation."


  }
};

const LanguageProvider = ({ children }) => {
  const local = JSON.parse(localStorage.getItem("language"));
  // const {setLocalStorage,user}=useLocalStorage("language")
  const [language, setLanguage] = useState(initialLanguage);
  const [texts, setTexts] = useState(translations[language]);

  useEffect(() => {
    if (local) {
      if (local === "es") {
        setLanguage(local);
        setTexts(translations.es);
      }
      if (local === "en") {
        setLanguage(local);
        setTexts(translations.en);
      }
    } else {
      localStorage.setItem("language", JSON.stringify(initialLanguage));
    }
  }, [local]);

  const handleLanguage = (e) => {
    if (e.target.value === "es") {
      setLanguage("es");
      localStorage.setItem("language", JSON.stringify("es"));
      setTexts(translations.es);
    } else {
      setLanguage("en");
      localStorage.setItem("language", JSON.stringify("en"));
      setTexts(translations.en);
    }
  };

  const data = { texts, handleLanguage, language };

  return (
    <LanguageContext.Provider value={data}>{children}</LanguageContext.Provider>
  );
};

export { LanguageProvider };
export default LanguageContext;
