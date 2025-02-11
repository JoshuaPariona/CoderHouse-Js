import { characters } from "./data/characters.js";

setDialogue("Tu turno, elige un movimiento");
document.querySelector(".player").innerHTML = playerCard();
document.querySelector(".enemy").innerHTML = enemyCard();
localStorage.setItem("enemy", JSON.stringify(characters[Math.floor(Math.random() * characters.length)]));

function getCharacter() {
  return JSON.parse(localStorage.getItem("selected_character"));
}

function getEnemy() {
  return JSON.parse(localStorage.getItem("enemy"));
}

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
  const { name, ki, image } = getEnemy();
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

function setDialogue(text) {
  document.querySelector(".dialog").innerText = text;
}

document.querySelector(".attack").addEventListener("click", () => {
  const player = getCharacter();
  disableActions();
})

document.querySelector(".defend").addEventListener("click", () => {
  const player = getCharacter();
  disableActions();
})

document.querySelector(".ki").addEventListener("click", () => {
  const player = getCharacter();
  disableActions();
})

document.querySelector(".transform").addEventListener("click", () => {
  const player = getCharacter();
  disableActions();
})

function disableActions() {
  document.querySelectorAll(".actions button").forEach(action => action.disabled = true);
}