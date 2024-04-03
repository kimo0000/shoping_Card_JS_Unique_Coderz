const headerEl = document.querySelector("header"),
  username = headerEl.querySelector(".user"),
  contentFavorite = document.querySelector(".content"),
  favPopup = document.querySelector(".fav_popup"),
  favClose = favPopup.querySelector(".fav_close"),
  favImg = favPopup.querySelector(".image img"),
  btnChangeImg = favPopup.querySelector(".rotate"),
  inputFile = favPopup.querySelector("input[type='file']"),
  favInp = favPopup.querySelector(".fav_title"),
  favNum = favPopup.querySelector(".fav_num"),
  favArea = favPopup.querySelector(".fav_area"),
  favEdit = favPopup.querySelector(".itemEdited");

// console.log(favImg);

if (localStorage.getItem("username")) {
  headerEl.classList.add("active");
  username.innerText = localStorage.getItem("username");
} else {
  headerEl.classList.remove("active");
}

let favoriteItem = JSON.parse(localStorage.getItem("favorite"));

function favoritePage() {
  if (favoriteItem.length) {
    contentFavorite.innerHTML = favoriteItem
      .map((item) => {
        return `<div class="item">
      <img src=${
        item.image.length < 10 ? `imgs/${item.image}` : `${item.image}`
      } alt="Image" />
      <div>${item.title}</div>
      <div class="price">${item.price}</div>
      <div class="description">${item.details}</div>
      <button class="btn_remove" onclick="removeItem(${
        item.id
      })">Remmove Product</button>
      <button class="btn_edit" onclick="editItem(${
        item.id
      })">Edit Product</button>
      </div>`;
      })
      .join("");
  } else {
    contentFavorite.innerHTML = "Favorite Page is Empty";
  }

  let images = document.querySelectorAll(".conten .item img");
  console.log(images);
}

favoritePage();

function removeItem(id) {
  let position = favoriteItem.findIndex((value) => value.id == id);
  favoriteItem.splice(position, 1);
  localStorage.setItem("favorite", JSON.stringify(favoriteItem));
  favoritePage();
}

function editItem(id) {
  favPopup.classList.add("open");
  let position = favoriteItem.find((value) => value.id == id);
  let favItemIndex = favoriteItem.findIndex((value) => value.id == id);

  inputFile.addEventListener("change", ({ target }) => {
    let file = target.files[0];
    if (!file) return;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      favImg.src = fileReader.result;
    };

    fileReader.readAsDataURL(file);
  });

  btnChangeImg.addEventListener("click", () => inputFile.click());

  favInp.value = position.title;
  favNum.value = position.price;
  favArea.value = position.details;

  favEdit.addEventListener("click", (e) => {
    e.preventDefault();

    // console.log(favImg.src);
    favoriteItem[favItemIndex].image = favImg.src;
    favoriteItem[favItemIndex].title = favInp.value;
    favoriteItem[favItemIndex].price = favNum.value;
    favoriteItem[favItemIndex].details = favArea.value;
    localStorage.setItem("favorite", JSON.stringify(favoriteItem));
    favoritePage();
    favPopup.classList.remove("open");
  });
}

favClose.addEventListener("click", () => favPopup.classList.remove("open"));
