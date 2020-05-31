const navSlide = () => {
    const burger = document.querySelector(".burger");
    const line1 = document.querySelector(".line1");
    const line2 = document.querySelector(".line2");
    const line3 = document.querySelector(".line3");
    const nav = document.querySelector(".links");
    burger.addEventListener("click", () => {
        burger.classList.toggle("burger-active");
        line1.classList.toggle("line1_active");
        line2.classList.toggle("line2_active");
        line3.classList.toggle("line3_active");
        nav.classList.toggle("nav-active");
    });
};

navSlide();