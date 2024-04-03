const headerEl = document.querySelector("header"),
  username = headerEl.querySelector(".user"),
  contentTag = document.querySelector(".content");

  //  console.log(contentTag);

if (localStorage.getItem("username")) {
  headerEl.classList.add("active");
  username.innerText = localStorage.getItem("username");
} else {
  headerEl.classList.remove("active");
}

let item = JSON.parse(localStorage.getItem("deatails"));
console.log([item]);

function detailsPage() {
    let liTag = "";
    [item].forEach((el) => {
      liTag = `<div class="item">
      <img src="imgs/${el.image}" alt="Image" />
      <a href="detailsProduct.html" class="deatails">${el.title}</a>
      <div class="price">$${el.price}</div>
      <div class="price">Qunatity: ${el.qty}</div>
      <div class="desc">${el.details}</div>
      </div>`;
    });
  
    contentTag.classList.add("deatails");
    contentTag.innerHTML = liTag;
}

detailsPage();
