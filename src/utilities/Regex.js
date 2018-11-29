'use strict';
var Regex = {

   validateEmail:function(val){
       return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
   },

   validateEmoji:function(text){
      var reg=/[\uD83C-\uDBFF\uDC00-\uDFFF]+/g;
      return reg.test(text);
   },

   validateMobile:function(text){
      var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if(text.match(phoneno)) {
        return true;
      }
      else {
        return false;
      }
   },

   validateMobileWithoutCC:function(val){
      return /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(val);
   },

   validateString:function(val){
   	return /^[a-zA-Z\x20]{3,25}$/.test(val);
   },

   validateStringMinimumLength2:function(val){
      return /^[a-zA-Z\x20]{2,25}$/.test(val);
   },

   validatePassword:function(val){
      return  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(val);
   },

   validateNumbers:function(val){
      return /^[0-9]{0,}$/.test(val);
   },

   validateURL:function(url){
      return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(url);
   },

   validatePrice(val){
      return /^(\d*([.,](?=\d{1}))?\d+)?$/.test(val);
   },

   validateAlphaNumberic(val){
      return /^[a-zA-Z0-9]*$/.test(val);
   },

   getNumbericValuesFromString(val){
      return val.match(/^\d+|\d+\b|\d+(?=\w)/g);
   },

   validateDecimalNumbers(val) {
      return /^((\d|[1-9]\d+)(\.\d{0,1})?|\.\d{0,1})$/.test(val);
   },

   /**
   * Method used to remove trailing zeros after decimal point.
   */ 

   removeTrailingZeros(amount){
      amount = amount.toString();
      //console.log("Actual amount=>> ", amount); 
      let regEx1 = /^[0]+/; // remove zeros from start.
      let regEx2 = /[0]+$/; // to check zeros after decimal point
      let regEx3 = /[.]$/; // remove decimal point.
      if (amount.indexOf('.')>-1){
         amount = amount.replace(regEx2,'');  // Remove trailing 0's
         amount = amount.replace(regEx3,'');
         //console.log("Remove trailings=>> ", amount); 
     };
     return parseFloat(amount).toFixed(2);
   },

}

module.exports = Regex;
