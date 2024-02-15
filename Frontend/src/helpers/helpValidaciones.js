
export function helpValidaciones() {

  const validateFormMenu=(form)=>{
    const errors = {};

    if(!form.destiny.trim()) errors.destiny= "Escoge un destino"
    if(!form.checkIn && !form.checkOut) errors.checkInOut="Escoge una fecha"

    return errors;
  }

  const validateFormLogin=(form,texts)=>{
    
    const errorsValidation={}
    if(!form.email.trim()) errorsValidation.email= texts.fieldRequiered
    if (!form.password)errorsValidation.password = texts.fieldRequiered;
    return errorsValidation
      
  }

  const validateNewUser=(form,db,texts)=>{

    const errors={}
    let emailFound; 
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

    if (!form.name.trim()) {
      errors.name = texts.fieldRequiered;
    } else if (!regexName.test(form.name.trim())) {
      errors.name = "Solo acepta letras y espacios en blanco";
    }
    if (!form.lastname.trim()) {
      errors.lastname = texts.fieldRequiered;
    } else if (!regexName.test(form.lastname.trim())) {
      errors.lastname =
        "Solo acepta letras y espacios en blanco";
    }
    if(form.email){emailFound=db.find((el) => el.email === form.email);}

    if (!form.email.trim()) {
      errors.email = texts.fieldRequiered;
    } else if (!regexEmail.test(form.email.trim())) {
      errors.email = texts.invalidEmail;
    } 
    else if (emailFound) {
      errors.email = texts.emailExist;
    }

    if (!form.password.trim()) {
      errors.password = texts.fieldRequiered;
    }
    /*if (!form.confirmPassword.trim()) {
      errors.confirmPassword = texts.fieldRequiered;
    }*/

    if(form.password && form.confirmPassword && form.password !== form.confirmPassword){
      errors.password= texts.passWordDoesntMatch
      errors.confirmPassword= texts.passWordDoesntMatch
    }
    return errors;
  }

  const validateNewProduct=(form,texts,imagesToProduct,servicesToProduct)=>{
    const errors={}
    if (!form.name.trim()) {
      errors.name = texts.fieldRequiered;
    }
    if (!form.category.id) {
      errors.category = texts.fieldRequiered;
    }
    if (!form.address1.trim()) {
      errors.address1 = texts.fieldRequiered;
    }
    if (!form.city.id) {
      errors.city = texts.fieldRequiered;
    }
    if (!form.description.trim()) {
      errors.description= texts.fieldRequiered;
    }
    if (!form.rules.trim()) {
      errors.rules = texts.fieldRequiered;
    }
    if (!form.security.trim()) {
      errors.security = texts.fieldRequiered;
    }
    if (!form.cancellation.trim()) {
      errors.cancellation = texts.fieldRequiered;
    }
    if(imagesToProduct.length< 5){
      errors.imagesQuantity = texts.atLeastFiveImages
    }
    if(servicesToProduct.length === 0){
      errors.services= texts.fieldRequiered
    }
    return errors
  }

  const validateImagesToAdd=(form,texts)=>{
    const errors={};
    const regexUrl=/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    if (!form.imageUrl.trim()) {
      errors.imageUrl = texts.fieldRequiered;
    } else if (!regexUrl.test(form.imageUrl.trim())) {
      errors.imageUrl = texts.incorrectFormat;
    }
    return errors
  }

  const validateNewReserve=(form,texts)=>{
    const errors={}

    if(!form.checkIn)errors.checkIn=texts.registrationCheckIn
    if(!form.checkOut)errors.checkOut=texts.registrationCkeckOut
    if(!form.startTime)errors.startTime=texts.fieldRequiered

    return errors
  }

  const validateNewReserveUser=(form,texts)=>{
    const errors={}
    if(!form.city)errors.city=texts.fieldRequiered

    return errors
  }

  return {
    validateFormMenu,
    validateFormLogin,
    validateNewUser,
    validateNewProduct,
    validateImagesToAdd,
    validateNewReserve,
    validateNewReserveUser
  };
}
