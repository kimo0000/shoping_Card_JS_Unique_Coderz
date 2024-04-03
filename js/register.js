const formEl = document.querySelector(".form_register"),
  usernameEl = document.querySelector(".user"),
  emailEl = document.querySelector(".mail"),
  passwordEl = document.querySelector(".pass"),
  eyeEl = document.querySelector(".eye"),
  btnSignUp = document.querySelector(".sign_up"),
  popupEl = document.querySelector(".popup");

eyeEl.addEventListener('click', () => {
    if (passwordEl.type === 'password') {
        passwordEl.type = 'text';
        eyeEl.className = `fa-regular fa-eye eye`;
    } else {
        passwordEl.type = 'password';
        eyeEl.className = `fa-regular fa-eye-slash eye`;
    }
});

btnSignUp.addEventListener('click', (e) => {
    e.preventDefault();

    let userValue = usernameEl.value;
    let mailValue = emailEl.value;
    let passValue = passwordEl.value;

    if (userValue == "" || mailValue == "" || passValue == "") {
        formEl.classList.add('error');
        popupEl.innerText = "Please Fill A Field!";
    } else {
       formEl.classList.remove('error');
       localStorage.setItem('username', userValue);
       localStorage.setItem("mail", mailValue);
       localStorage.setItem("password", passValue);

       setTimeout(() => {
         window.location = "login.html";
       }, 1500);
    }
})