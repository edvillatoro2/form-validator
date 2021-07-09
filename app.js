const form = document.querySelector('.form')
const username = document.getElementById('username')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const email = document.getElementById('email')

//show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//show success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

//check that email is valid
function emailIsValid(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, 'Not a valid Email');
    }
}

//check required
function checkRequired(inputArray) {
  inputArray.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//check length
function checkLength(input, min, max) {
  if(input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if(input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

//passwords match
function matchingPasswords() {
  if(password.value !== password2.value) {
    showError(password2, 'Passwords do not match');
  }
}

//get Fieldname
function getFieldName(input) {
  //uppercase the first letter, and then we join the rest of the letters to the first letter we made uppercase to form the word
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//eventListeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 7, 18);
  checkLength(password, 6, 25);
  emailIsValid(email);
  matchingPasswords(password, password2);
});