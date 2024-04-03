const headerEl = document.querySelector("header"),
  searchEl = document.querySelector(".search"),
  username = headerEl.querySelector('.user'),
  linkLogoutEl = document.querySelector(".log_out a"),
  contentEl = document.querySelector(".content"),
  shoosenProduct = document.querySelector(".shoosen_products"),
  shopingIcon = document.querySelector(".shoping_icon"),
  counterEl = document.querySelector(".count"),
  countFavorie = document.querySelector(".log_out .favorie_count"),
  shopingCard = document.querySelector(".shoping"),
  contentPage = document.querySelector(".pages");

// console.log(username);

if (localStorage.getItem("username")) {
  headerEl.classList.add("active");
  username.innerText = localStorage.getItem("username");
} else {
  headerEl.classList.remove("active");
}

linkLogoutEl.addEventListener("click", () => {
  localStorage.clear();
  setTimeout(() => {
    window.location = "register.html";
  }, 1500);
});

let cardArr = JSON.parse(localStorage.getItem("product_shoose") || "[]");
let favorieArr = JSON.parse(localStorage.getItem("favorite") || "[]");

cardArr.forEach((el) => {
  shoosenProduct.innerHTML += `<p>${el.title} (${el.qty})</p>`;
  counterEl.style.opacity = 1;
  counterEl.innerText = cardArr.length;
});

function initProducts() {
  contentEl.innerHTML = products
  .map((item) => {
    return `<div class="item" data-id="${item.id}">
    <img src="imgs/${item.image}" alt="Image" />
    <a href="detailsProduct.html" class="deatails" onclick="deatails(${item.id})">${item.title}</a>
    <div class="price">$${item.price} <i class="fa-regular fa-heart heart" onclick="addToFavorie(this, ${item.id})"></i></div>
    <button class="btn_add" onclick="addToCard(${item.id})">Add</button>
    </div>`;
  })
  .join("");
}

initProducts();

function addToCard(item_id) {
  if (localStorage.getItem("username")) {
    let shoosenItem = products.find((value) => value.id === item_id);
    let position = cardArr.findIndex((value) => value.id === item_id);
    
    if (cardArr.length <= 0) {
      cardArr = [shoosenItem];
    } else if (position < 0) {
      cardArr.push(shoosenItem);
    } else {
      cardArr[position].qty += 1;
    }
    
    shoosenProduct.innerHTML = "";
    cardArr.forEach((el) => {
      shoosenProduct.innerHTML += `<p>${el.title} (${el.qty})</p>`;
    });
    
    counterEl.innerText = cardArr.length;
    counterEl.style.opacity = 1;
    localStorage.setItem('product_shoose', JSON.stringify(cardArr));
  } else {
    window.location = "register.html";
  }
}

countFavorie.innerText = favorieArr.length;
let hearts = document.querySelectorAll('.heart');

let favoritesLocal = JSON.parse(localStorage.getItem("favorite"));

if (favoritesLocal) {
  hearts.forEach(el => {
    let proId = el.parentElement.parentElement.dataset.id;
    let position = favorieArr.findIndex((value) => value.id == proId);

    if(position >= 0) {
      el.classList.remove('add_fav');
    } else {
      el.classList.add('add_fav');
    }

    el.classList.toggle("add_fav");
    if (el.classList.contains("add_fav")) {
      el.classList.replace("fa-regular", "fa-solid");
    } else {
      el.classList.replace("fa-solid", "fa-regular");
    }
  })
}

function addToFavorie(el, id) {
  let favoritePro = products.find(value => value.id == id);
  let position = favorieArr.findIndex(value => value.id == id);

  el.classList.toggle("add_fav");
  if (el.classList.contains("add_fav")) {
    el.classList.replace("fa-regular", "fa-solid");
  } else {
    el.classList.replace("fa-solid", "fa-regular");
  }

  if (el.classList.contains("fa-solid")) {
    favorieArr.push(favoritePro);
  } else {
    favorieArr.splice(position, 1);
  }

  countFavorie.innerText = favorieArr.length;
  localStorage.setItem('favorite', JSON.stringify(favorieArr));
}

const deatails = (id) => {
  let deatailsItem = products.find((value) => value.id === id);
  localStorage.setItem("deatails", JSON.stringify(deatailsItem));
};

function showHideShopingCard() {
  if (shoosenProduct.children.length) {
    shopingCard.classList.toggle("show");
  }
}

shopingIcon.addEventListener("click", showHideShopingCard);

let allPro = document.querySelectorAll(".content .item");

function searchProducts({ target }) {
  //  let searchItem = products.filter(item => {
  //   return item.title.toLowerCase().indexOf(target.value.trim().toLowerCase()) != -1
  //  })

  //  console.log(searchItem);

  //  contentEl.innerHTML = searchItem
  //    .map((item) => {
  //      return `<div class="item">
  //   <img src="imgs/${item.image}" alt="Image" />
  //   <a href="detailsProduct.html" class="deatails" onclick="deatails(${item.id})">${item.title}</a>
  //   <div class="price">$${item.price} <i class="fa-regular fa-heart heart" onclick="addToFavorie(this, ${item.id})"></i></div>
  //   <button class="btn_add" onclick="addToCard(${item.id})">Add</button>
  //   </div>`;
  //    })
  //    .join("");

  if (target.value) {
    allPro.forEach((item) => {
      if (
        target.value.trim() == item.children[1].innerText.toLowerCase() ||
        target.value.trim() ==
          item.children[2].innerText.trim().toLowerCase().slice(1)
      ) {
        //  contentEl.innerText = "";
        item.style.display = "grid";
      } else {
        item.style.display = "none";
      }
    });
  } else {
    // allPro.forEach((item) => (item.style.display = "grid"));
     initPages();
  }
}

searchEl.addEventListener("keyup", searchProducts);

let page = 1,
  totlalPages = 3;

function initPages() {
  allPro.forEach((item, index) => {
    let startPage = totlalPages * (page - 1);
    let endPage = totlalPages * page - 1;

    if (index >= startPage && index <= endPage) {
      item.style.display = "grid";
    } else {
      item.style.display = "none";
    }
  });

  showPages();
}

initPages();

function showPages() {
  let counterPage = allPro.length / totlalPages;
  contentPage.innerHTML = "";

  if (page > 1) {
    let liPrev = document.createElement("li");
    liPrev.innerText = "Prev";
    liPrev.classList.add("prev");
    contentPage.insertAdjacentElement("afterbegin", liPrev);
    liPrev.setAttribute("onclick", `changePage(${page - 1})`);
  }

  let activeEl = "";
  for (let i = 1; i <= counterPage; i++) {
    page == i ? (activeEl = "active") : (activeEl = "");
    let liTag = document.createElement("li");
    liTag.innerHTML = i;
    liTag.className = activeEl;
    contentPage.appendChild(liTag);
    liTag.setAttribute("onclick", `changePage(${i})`);
  }

  if (page < counterPage) {
    let liNext = document.createElement("li");
    liNext.innerText = "Next";
    liNext.classList.add("next");
    liNext.setAttribute("onclick", `changePage(${page + 1})`);
    contentPage.insertAdjacentElement("beforeend", liNext);
  }
}

function changePage(i) {
  page = i;
  initPages();
}
