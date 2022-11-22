function validateName() {
  var name = document.getElementById('name').value;
  if (name.length === 0 || name.length === 1 || name.length === 2 ) {
      $('#name').css("border", "1px solid red");
      producePrompt('Name should have at least 3 letterrs.', 'name-error1', 'red');
      return false;
    }
  if (!name.match(/^[A-Za-z]*$/)) {
      $('#name').css("border", "1px solid red");
      producePrompt('Name should contain only letters!', 'name-error1', 'red');
      return false;
    }
  $('#name').css("border", "1px solid grey");
  producePrompt('', 'name-error1', 'red');
  return true;
}

function validateEmail () {
  var email = document.getElementById('email').value;

  if (email.length == 0) {
      $('#email').css("border", "1px solid red");
      producePrompt("Email field shouldn't be empty",'email-error1', 'red');
      return false;
  } else if (!email.match(/^[A-Za-z\._\-[1-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
      producePrompt('Email Invalid','email-error1', 'red');
      $('#email').css("border", "1px solid red");
      return false;
  } else {
    producePrompt('','email-error1', 'red');
    $('#email').css("border", "1px solid grey");
  }
  return true;
}

function validateEmailP () {
  var email1 = document.getElementById('email1').value;

  if (email1.length == 0) {
      $('#email1').css("border", "1px solid red");
      producePrompt('Email Invalid','email-error', 'red');
      return false;
  } else if (!email1.match(/^[A-Za-z\._\-[1-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
      $('#email1').css("border", "1px solid red");
      producePrompt('Email Invalid', 'email-error', 'red');
      return false;
  } else {
      $('#email1').css("border", "1px solid grey");
      producePrompt('Valid', 'email-error', 'green');
      return true;
  }
}

function validateMessage() {
  var message = document.getElementById('message').value;
  var required = 5;
  var left = required - message.length;
  if (left > 0) {
    $('#message').css("border", "1px solid red");
    producePrompt('Invalid Message', 'message-error1', 'red');
    return false;
  }
  producePrompt('', 'message-error1', 'red');
  $('#message').css("border", "1px solid grey");
  return true;
}

function validateForm (){
  if (!validateEmail() || !validateName() || !validateMessage()) {
    validateName();
    validateMessage();
    $('#ModalCenterError').modal('show');
   } else {
    $('#ModalCenterF').modal('show');
   }
}

function validateSubs() {
  if (!validateEmailP()) {
    producePrompt('Your message has failed to send, please input a valid email adress', 'submit-err', 'red');
    return false;
   } else {
    producePrompt('You are succesfully subscribed to our newletter!', 'submit-error', 'green');
    return true;
   }
}

function producePrompt(message, promptLocation, color) {
  document.getElementById(promptLocation).innerHTML = message;
  document.getElementById(promptLocation).style.color = color;
}

function splitJudete(elem){
  let numeJud = '';
  for (j in elem){
    if (j > 2)
      numeJud += elem[j];
    }
  return numeJud;
}

async function loadFile(file) {
  let text = await (new Response(file)).text();
  const allLines = text.split(/\r\n|\n/);
  for (i in allLines){
    splitJudete(allLines[i]);
  }
  return allLines;
}

function extractDataFromCNP() {
  var cnp = document.getElementById("cnp").value;
  var sex = cnp.substring(0,1);
  var year = cnp.substring(1,3);
  var month = cnp.substring(3,5);
  var day = cnp.substring(5,7);
  var jud = cnp.substring(7,9);
  if (verifyCNP(cnp)){
    calculateGender(sex);
    calculateJudet(jud);
    calculateYear(year,sex);
    calculateMonth(month);
    calculateDay(day);
    $('#cnp').css("border", "1px solid grey");
    producePrompt("", 'submit-e');
  } else {
    $('#cnp').css("border", "1px solid red");
    producePrompt("This CNP doesn't exist", 'submit-e', 'red');
  }
}

function calculateJudet(jud){
  var xhr = new XMLHttpRequest();
  var txt;
  xhr.open("GET","https://raw.githubusercontent.com/marianPeFelie/descifrare-CNP/main/judete.txt");
  xhr.onload = function(){
    txt = xhr.responseText + "";
    txt.replace(/<&#91;^>&#93;*>/g, "");
    txt = txt.split(/\r\n|\n/);
    document.getElementById("county").innerHTML = splitJudete(txt[parseInt(jud) - 1]);
  }
  xhr.send();
}

function calculateGender(sex){
  var fullGender;
  if (sex == 1 || sex == 5){
    fullGender = 'Masculin';
  } else if (sex == 2 || sex == 6) {
    fullGender="Feminin";
  }
  document.getElementById("gender").innerHTML = fullGender;
}

function calculateYear(year,sex){
  var fullYear;
  if (sex < 5){
    fullYear = 19 + year;
  }else {
    fullYear = 20 + year;
  }
  document.getElementById("year").innerHTML = fullYear;
}

function calculateDay(day){
  document.getElementById("day").innerHTML = day;
}

function calculateMonth(month){
   switch (month){
      case '01':
        document.getElementById("month").innerHTML = 'Ianuarie';
        break;
      case '02':
        document.getElementById("month").innerHTML = 'Februarie';
        break;
      case '03':
        document.getElementById("month").innerHTML = 'Martie';
        break;
      case '04':
        document.getElementById("month").innerHTML = 'Aprilie';
        break;
      case '05':
        document.getElementById("month").innerHTML = 'Mai';
        break;
      case '06':
        document.getElementById("month").innerHTML = 'Iunie';
        break;
      case '07':
        document.getElementById("month").innerHTML = 'Iulie';
        break;
      case '08':
        document.getElementById("month").innerHTML = 'August';
        break;
      case '09':
        document.getElementById("month").innerHTML = 'Septembrie';
        break;
      case '10':
        document.getElementById("month").innerHTML = 'Octombrie';
        break;
      case '11':
        document.getElementById("month").innerHTML = 'Noiembrie';
        break;
      case '12':
        document.getElementById("month").innerHTML = 'Decembrie';
        break;
      default: return 1;
   }

}


 function verifyCNP(cnp) {
     constanta = new String("279146358279");
     if (cnp.length == 13){
       suma = 0;
       for (i = 0; i < constanta.length; i++) {
          suma = suma + cnp.charAt(i) * constanta.charAt(i);
       }
       rest=suma%11;
       if ((rest < 10 && rest == cnp.charAt(12)) || (rest == 10 && cnp.charAt(12) == 1)){
         return true;
       } else {
         return false;
       }
     }

 }

 (function(){

   var doc = document.documentElement;
   var w = window;

   var prevScroll = w.scrollY || doc.scrollTop;
   var curScroll;
   var direction = 0;
   var prevDirection = 0;

   var header = document.getElementById('navbar');

   var checkScroll = function() {

     curScroll = w.scrollY || doc.scrollTop;
     if (curScroll > prevScroll) {
       //scrolled up
       direction = 2;
     }
     else if (curScroll < prevScroll) {
       //scrolled down
       direction = 1;
     }

     if (direction !== prevDirection) {
       toggleHeader(direction, curScroll);
     }

     prevScroll = curScroll;
   };

   var toggleHeader = function(direction, curScroll) {
     if (direction === 2 && curScroll > document.documentElement.clientHeight) {

       header.classList.add('hide');
       prevDirection = direction;
     }
     else if (direction === 1) {
       header.classList.remove('hide');
       prevDirection = direction;
     }
   };

   window.addEventListener('scroll', checkScroll);
 })();

 function isInViewport(el) {
     const rect = el.getBoundingClientRect();
     return (
        rect.top >= -1*(document.documentElement.clientHeight) &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      );
 }
function showFooter() {
  if (isInViewport(document.getElementById('caseta'))) {
    $('#banner').removeClass('d-block');
    $('#banner').addClass('d-none');
  } else {
    $('#banner').removeClass('d-none');
    $('#banner').addClass('d-block');
  }
}

window.addEventListener('scroll', showFooter);

var placeSearch, autocomplete;
      var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

function initAutocomplete() {
        var options = {
         componentRestrictions: {country: "ro"},
         types: ["address"]
        };
        autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')),
        options);
        autocomplete.addListener('place_changed', fillInAddress);
      }
function fillInAddress() {
        var place = autocomplete.getPlace();
        for (var component in componentForm) {
          document.getElementById(component).value = '';
          document.getElementById(component).disabled = false;
        }
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
          }
        }
      }
function geolocate() {
        if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(position)  {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
          });
        }
      }
