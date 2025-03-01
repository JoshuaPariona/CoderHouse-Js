const base_url = "https://dragonball-api.com/api";

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let prev = "";
let next = "";

const sound = new Audio("src/res/select-character.mp3");

Toastify({
  text: "Elige un personaje para comenzar la batalla,\n\nRecuerda que puedes pausar la musica en cualquien momento\n\n¡Buena suerte!",
  duration: 10000,
  gravity: "bottom",
  position: "right",
  style: {
    background: "linear-gradient(to right,rgb(252, 94, 94),rgb(206, 197, 74))",
    color: "black",
    fontWeight: "bold",
  }
}).showToast();

const audio = document.getElementById("audio");
if (audio.paused) {
  audio
    .play()
    .catch((error) => console.error("Error al reproducir el audio:", error));
}

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
  const selectedCharacter = await getCharacter(characterId);
  localStorage.setItem("selected_character", JSON.stringify(selectedCharacter));
  sound.pause();
  sound.currentTime = 0;
  sound.play();
  setTimeout(() => {
    window.location.href = "battlefield.html";
  }, 500);
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
