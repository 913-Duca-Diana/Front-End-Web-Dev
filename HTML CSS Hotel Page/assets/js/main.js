const menuBtn= document.querySelector('.menu-mobile');
const btn=document.querySelector('.menu-btn');
let menuOpen=false;
btn.addEventListener('click',() => {
  if(!menuOpen){
    menuBtn.classList.add('open');
    menuOpen=true;
  }else {
    menuBtn.classList.remove('open');
    menuOpen=false;
  }
});
