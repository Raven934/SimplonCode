const apply = document.querySelector(".apply");

apply.addEventListener("click", function () {
  window.location.href = "programmes.html";
});
const menu=document.querySelector(".menu")
const nav1=document.querySelector(".nav1")
const signup=document.querySelector(".signup")
menu.addEventListener("click", ()=>{
    nav1.classList.toggle("active");
    signup.classList.toggle("active");

})