import { characters } from "./data/characters.js";

document.querySelector(".character-container").innerHTML = characters
  .map(characterCard)
  .join("");  

function characterCard(character) {
  const { name, ki, affiliation, image, originPlanet } = character;
  return `
      <button class="card">
        <div class="card-image-container">
          <img class="card-foreground" src="${image}" alt="${name}"></img>
          <img class="card-background" src="${originPlanet.image}" alt="${name}"></img>
        </div>
        <ul class="card-details">
          <li>${name}</li>
          <li>${ki}</li>
          <li>${affiliation}</li>
        </ul>
      </button>
    `;
}

document.querySelectorAll(".card").forEach((button, index) => {
  button.addEventListener("click", () => setCharacter(characters[index]));
});

function setCharacter(character) {
  localStorage.setItem("selected_character", JSON.stringify(character));
}
