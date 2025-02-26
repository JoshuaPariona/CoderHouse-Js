const audio = document.getElementById("audio");
audio.volume = 0.5;

const base_url = "https://dragonball-api.com/api";

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let prev = "";
let next = "";

function setPage(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      document.querySelector(".character-container").innerHTML = data.items
        .map(characterCard)
        .join("");

      prev = data.links.previous;
      prevButton.disabled = !prev;
      next = data.links.next;
      nextButton.disabled = !next;

      const cards = document.querySelectorAll(".card");

      if (cards.length > 0) {
        const randomIndex = Math.floor(Math.random() * cards.length);
        const enemyId = cards[randomIndex].getAttribute("data-id");
        getCharacter(enemyId).then((enemy) => {
          localStorage.setItem("enemy", JSON.stringify(enemy));
        });
      }

      cards.forEach((card) => {
        card.addEventListener("click", () => {
          const characterId = card.getAttribute("data-id");
          onCharacterSelect(characterId);
        });
      });
    })
    .catch((error) => console.error("Error:", error));
}

setPage(`${base_url}/characters?page=1&limit=12`);

prevButton.addEventListener("click", () => {
  if (prev) {
    setPage(prev);
  }
});

nextButton.addEventListener("click", () => {
  if (next) {
    setPage(next);
  }
});

function characterCard(character) {
  const { id, name, ki, affiliation, image } = character;
  return `
      <button class="card" data-id="${id}">
        <div class="card-image-container">
          <img class="card-background" src="${image}" alt="${name}"></img>
          <img class="card-foreground" src="${image}" alt="${name}"></img>
        </div>
        <ul class="card-details">
          <li>${name}</li>
          <li>ki: ${ki}</li>
          <li>Afiliación: ${affiliation}</li>
        </ul>
      </button>
    `;
}

async function onCharacterSelect(characterId) {
  console.log(characterId);
  const selectedCharacter = await getCharacter(characterId);
  localStorage.setItem("selected_character", JSON.stringify(selectedCharacter));
  window.location.href = "battlefield.html";
}

function getCharacter(characterId) {
  return fetch(`${base_url}/characters/${characterId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => console.error("Error:", error));
}
