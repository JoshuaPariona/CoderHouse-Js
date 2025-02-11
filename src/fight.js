import { characters } from "./data/characters.js";

function getCharacter() {
  return JSON.parse(localStorage.getItem("selected_character"));
}

document.querySelector(".player").innerHTML = playerCard();
document.querySelector(".enemy").innerHTML = enemyCard();

function playerCard() {
  const { name, ki, image } = getCharacter();
  return `
      <div class="card">
        <img class="card-foreground" src="${image}" alt="${name}"></img>
        <ul class="card-details">
          <li>${name}</li>
          <li>${ki}</li>
        </ul>
      </div>
    `;
}

function enemyCard() {
  const { name, ki, image } = characters[Math.floor(Math.random() * characters.length)];
  return `
      <div class="card">
        <img class="card-foreground" src="${image}" alt="${name}"></img>
        <ul class="card-details">
          <li>${name}</li>
          <li>${ki}</li>
        </ul>
      </div>
    `;
}