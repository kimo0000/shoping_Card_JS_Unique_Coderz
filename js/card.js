const headerTag = document.querySelector(".wrapper header"),
  username = document.querySelector(".username"),
  counterEle = headerTag.querySelector(".count"),
  totalDisplay = document.querySelector(".total_price_quantity"),
  containerEl = document.querySelector(".content");

if (localStorage.getItem("username")) {
  headerTag.classList.add("active");
  username.innerText = localStorage.getItem("username");
} else {
  headerTag.classList.remove("active");
}

let items = JSON.parse(localStorage.getItem("product_shoose")) || "[]";

function showAllProductIncard() {
  if (localStorage.getItem("product_shoose")) {
    let liTag = "";
    let totalPrice = 0;
    items.forEach((element) => {
      totalPrice += element.price * element.qty;
      liTag += `<div class="item">
      <img src="imgs/${element.image}" alt="Image" />
      <div class="title">${element.title}</div>
      <div class="price">1 Piece/$${element.price}</div>
      <div class="quantity">
            Quantity: 
            <span class="minus" onclick="changeQuantity(this, ${
              element.id
            })">-</span>
            <span class="qty">${element.qty}</span>
            <span class="plus" onclick="changeQuantity(this, ${
              element.id
            })">+</span>
      </div>
      <div class="toto_price">Total: 
            <span class="toto">$${element.price * element.qty}</span>
      </div>
      <button class="btn_delete" 
      onclick="deleteToCard(${element.id})">Delete</button>
      </div>`;
    });

    counterEle.innerText = items.length;
    counterEle.style.opacity = 1;

    if (totalPrice == 0) {
      totalDisplay.innerHTML = "";
      counterEle.style.opacity = 0;
    } else {
      totalDisplay.innerHTML = `<p>Total Price: <span>${
        totalPrice == 0 ? totalPrice : "$" + totalPrice
      }</span></p><p>Quantity: <span>${items.length}</span></p>`;
    }
    containerEl.innerHTML = liTag;
  }

  if (localStorage.getItem("product_shoose") == null) {
    containerEl.innerText = "Your card is Empty";
    containerEl.classList.add("no_products");
  }
}

showAllProductIncard();

function deleteToCard(id) {
  let position = items.findIndex((value) => value.id === id);
  items.splice(position, 1);
  localStorage.setItem("product_shoose", JSON.stringify(items));
  showAllProductIncard();
  emtyLocal();
}

function changeQuantity(type, proId) {
  let position = items.findIndex((value) => value.id === proId);

    if (type.innerText == "-") {
      items[position].qty -= 1;
    } else {
      items[position].qty += 1;
    }

    if (items[position].qty < 1) {
      items.splice(position, 1);
    }

    localStorage.setItem("product_shoose", JSON.stringify(items));
    showAllProductIncard();
    emtyLocal();
}
  
function emtyLocal() {
  if(!items.length) {
    localStorage.removeItem("product_shoose");
    containerEl.innerText = "Your card is Empty";
    containerEl.classList.add("no_products");
  }
}
