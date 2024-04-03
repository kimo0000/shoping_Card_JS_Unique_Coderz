const formTag = document.querySelector("form"),
  btnSignUp = document.querySelector(".sign_up"),
  login_user = document.querySelector(".login_user"),
  login_pass = document.querySelector(".login_pass"),
  eyeEl = document.querySelector(".eye"),
  popupTag = document.querySelector(".popup");

console.log(eyeEl);

let getUser = localStorage.getItem("username");
let getPassword = localStorage.getItem("password");

console.log(formTag);

btnSignUp.addEventListener('click', (e) => {
    e.preventDefault();

    if(login_user.value == "" || login_pass.value == "") {
       formTag.classList.add("error");
       popupTag.innerText = "Please Fill A field";
    } else if (login_user.value == getUser && login_pass.value == getPassword) {
        formTag.classList.remove("error");

        setTimeout(() => {
            window.location = "index.html";
        }, 1500);
    } else {
        formTag.classList.add("error");
        popupTag.innerText = "Wrong User or Password";
    }
})

eyeEl.addEventListener("click", () => {
  if (login_pass.type === "password") {
    login_pass.type = "text";
    eyeEl.className = `fa-regular fa-eye eye`;
  } else {
    login_pass.type = "password";
    eyeEl.className = `fa-regular fa-eye-slash eye`;
  }
});
