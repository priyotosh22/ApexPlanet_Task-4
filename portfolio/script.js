/* ==================================================
   MOBILE NAVIGATION
================================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("show");

});


/* ==================================================
   CLOSE MOBILE MENU AFTER CLICK
================================================== */

const navigationItems =
    document.querySelectorAll(".nav-links a");

navigationItems.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

    });

});