import "./scss/main.scss";
import 'whatwg-fetch';
import Promise from 'promise-polyfill';


if (!window.Promise) {
  window.Promise = Promise;
};


let card = document.querySelector(".card");
let buttons = document.querySelectorAll(".card__button");

for(let i = 0; i < buttons.length; i++) {
  let button = buttons[i];
  button.addEventListener("click", function (evt) {
    evt.preventDefault();
    button.classList.add("button--loader");
    fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(function(response){
      if(response.ok) {
        sessionStorage.setItem(i, i);
        button.classList.remove("button--loader");
        button.textContent = "В корзине";
        button.classList.add("button--active");
      } else {
        alert('Ошибка HTTP: ' + response.status);
        }
    })
  });

  for(let j = 0; j < sessionStorage.length; j++) {
    let key = sessionStorage.key(j);

    if( i == sessionStorage.key(j)) {
      button.textContent = "В корзине";
      button.classList.add("button--active");
    }
  };

};

