"use strict"

const showMoreBtn = document.querySelector("#show-more-btn");
const hiddenCategories = document.querySelectorAll(".category.hidden");
const hiddenImages = document.querySelectorAll("img[data-src]");
const categoriesBlock = document.querySelector(".work-photos");
const upBtn = document.querySelector("#up-btn");
const navBtns = document.querySelectorAll(".main-nav a");
const menuBurger = document.querySelector(".menu-burger");
const mainNav = document.querySelector("nav.main-nav");
const headerContacts = document.querySelector(".header-contacts");
const currentYear = document.querySelector("#current-year");

let isOpen = false;
let isFirst = true;

if (currentYear) {
    const year = new Date().getFullYear();
    currentYear.textContent = year;
}

showMoreBtn.addEventListener("click", evt => {
    if (isFirst)
        hiddenImages.forEach(img => img.setAttribute("src", img.getAttribute("data-src")));
    isFirst = false;
    hiddenCategories.forEach(category => category.classList.toggle("hidden"));

    showMoreBtn.classList.toggle("active");
    isOpen = !isOpen;
    showMoreBtn.textContent = isOpen ? "Скрыть" : "Показать больше";

});

const myCarousel = new Carousel(document.querySelector(".carousel"), {
    'slidesPerPage' : 1,
    'preload' : '2',
  });

window.addEventListener("scroll", evt => {
    if (window.scrollY > 580)
        upBtn.style.display = 'block';
    else
        upBtn.style.display = 'none';
});

// scroll to the top
upBtn.addEventListener("click", evt => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// menu burger
menuBurger.addEventListener("click", evt => {
    mainNav.classList.toggle("nav-show");
    headerContacts.classList.toggle("contacts-show");
    document.querySelector("body").classList.toggle("no-scroll");
});

// goto to sections
navBtns.forEach(btn => {
    btn.addEventListener("click", evt => {
        evt.preventDefault();
        const navLink = evt.target;
        if (navLink.dataset.goto && document.querySelector(navLink.dataset.goto)) {
            const gotoSection = document.querySelector(navLink.dataset.goto);
            const gotoBlockValue = gotoSection.getBoundingClientRect().top + scrollY;

            // close the menu
            if (document.querySelector("body").classList.contains("no-scroll")) {
                document.querySelector("body").classList.toggle("no-scroll");
                mainNav.classList.toggle("nav-show");
                headerContacts.classList.toggle("contacts-show");
            }
            
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
        }
    })
})

