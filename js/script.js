function esToggleContent() {
  var content = document.getElementById("es-moreContent");
  var button = document.querySelector(".es-formula__toggle-button");
  var icon = document.getElementById("es-toggleIcon");

  if (content.classList.contains("es-formula__hidden")) {
      content.classList.remove("es-formula__hidden");
      button.textContent = "Mniej";
      button.appendChild(icon);
      icon.classList.add("es-formula__rotated");
  } else {
      content.classList.add("es-formula__hidden");
      button.textContent = "Dowiedz się więcej";
      button.appendChild(icon);
      icon.classList.remove("es-formula__rotated");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const circles = document.querySelectorAll(".es-cross__circle");
  const infoContainer = document.getElementById("es-info");
  const linkButton = document.getElementById("es-link");
  const products = document.querySelectorAll("[id^=es-product]");
  const prevArrow = document.getElementById("es-prev");
  const nextArrow = document.getElementById("es-next");
  const paginationContainer = document.createElement("div");
  paginationContainer.classList.add("es-pagination");
  linkButton.parentNode.appendChild(paginationContainer);
  
  let currentIndex = 0;
  
  function updatePagination() {
      paginationContainer.innerHTML = "";
      products.forEach((_, i) => {
          const pageDot = document.createElement("span");
          pageDot.classList.add("es-pagination-dot");
          if (i === currentIndex) {
              pageDot.classList.add("active");
          }
          pageDot.addEventListener("click", function () {
              currentIndex = i;
              updateContent(currentIndex);
          });
          paginationContainer.appendChild(pageDot);
      });
  }
  
  function updateContent(index) {
      products.forEach((product, i) => {
          product.style.display = i === index ? "block" : "none";
      });
      
      circles.forEach((circle, i) => {
          circle.style.opacity = i === index ? "1" : "0.5";
      });
      
      const selectedCircle = circles[index];
      infoContainer.textContent = selectedCircle.dataset.info;
      linkButton.href = selectedCircle.dataset.link;
      
      updatePagination();
  }
  
  circles.forEach((circle, index) => {
      circle.addEventListener("click", function () {
          currentIndex = index;
          updateContent(currentIndex);
      });
  });
  
  prevArrow.addEventListener("click", function () {
      currentIndex = (currentIndex - 1 + products.length) % products.length;
      updateContent(currentIndex);
  });
  
  nextArrow.addEventListener("click", function () {
      currentIndex = (currentIndex + 1) % products.length;
      updateContent(currentIndex);
  });
  
  updateContent(currentIndex);
});