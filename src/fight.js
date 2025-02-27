let player = JSON.parse(localStorage.getItem("selected_character"));
let enemy = JSON.parse(localStorage.getItem("enemy"));

document.querySelector(".player").innerHTML = playerCard();
document.querySelector(".enemy").innerHTML = enemyCard();

setDialogue("Tu turno, elige un movimiento");

document.body.style.backgroundImage = `url(${getMap().image})`;

function getMap() {
  return JSON.parse(localStorage.getItem("map"));
}

function playerCard() {
  const { name, ki, image } = player;
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
  const { name, ki, image } = enemy;
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

function disableActions() {
  document
    .querySelectorAll(".actions button")
    .forEach((action) => (action.disabled = true));
}

function ableActions() {
  document
    .querySelectorAll(".actions button")
    .forEach((action) => (action.disabled = false));
}

function setDialogue(text) {
  document.querySelector(".dialog-text").innerText = text;
}

document.querySelector(".attack").addEventListener("click", () => {
  disableActions();
  setDialogue("Has elegido atacar");
  setTimeout(() => {
    enemyAction();
    setTimeout(() => {
      ableActions();
      setDialogue("Tu turno, elige un movimiento");
    }, 1500);
  }, 1500);
});

document.querySelector(".defend").addEventListener("click", () => {
  disableActions();
  setDialogue("Has elegido defenderte");
  setTimeout(() => {
    enemyAction();
    setTimeout(() => {
      ableActions();
      setDialogue("Tu turno, elige un movimiento");
    }, 1500);
  }, 1500);
});

document.querySelector(".ki").addEventListener("click", () => {
  disableActions();
  setDialogue("Has elegido cargar ki");
  setTimeout(() => {
    enemyAction();
    setTimeout(() => {
      ableActions();
      setDialogue("Tu turno, elige un movimiento");
    }, 1500);
  }, 1500);
});

document.querySelector(".transform").addEventListener("click", () => {
  disableActions();
  setDialogue("Has elegido transformarte");
  if (player.transformations.length > 0) {
    const nextTransformation = (player.current_transformation ?? -1) + 1;
    const maxTransformation = player.transformations.length - 1;
    player = {
      ...player,
      image:
        player.transformations[Math.min(nextTransformation, maxTransformation)]
          .image,
      name: player.transformations[
        Math.min(nextTransformation, maxTransformation)
      ].name,
      ki: player.transformations[
        Math.min(nextTransformation, maxTransformation)
      ].ki,
      current_transformation: Math.min(nextTransformation, maxTransformation),
    };
    document.querySelector(".player").innerHTML = playerCard();
  }
  setTimeout(() => {
    enemyAction();
    setTimeout(() => {
      ableActions();
      setDialogue("Tu turno, elige un movimiento");
    }, 1500);
  }, 1500);
});

function enemyAction() {
  const actions = ["attack", "defend", "ki", "transform"];
  const action = actions[Math.floor(Math.random() * actions.length)];
  switch (action) {
    case "attack":
      setDialogue(`El enemigo ha elegido atacar`);
      break;
    case "defend":
      setDialogue(`El enemigo ha elegido defender`);
      break;
    case "ki":
      setDialogue(`El enemigo ha elegido cargar ki`);
      break;
    case "transform": {
      setDialogue(`El enemigo ha elegido transformarse`);
      if (enemy.transformations.length > 0) {
        const nextTransformation = (enemy.current_transformation ?? -1) + 1;
        const maxTransformation = enemy.transformations.length - 1;
        enemy = {
          ...enemy,
          image:
            enemy.transformations[
              Math.min(nextTransformation, maxTransformation)
            ].image,
          name: player.transformations[
            Math.min(nextTransformation, maxTransformation)
          ].name,
          ki: player.transformations[
            Math.min(nextTransformation, maxTransformation)
          ].ki,
          current_transformation: Math.min(
            nextTransformation,
            maxTransformation
          ),
        };
        document.querySelector(".enemy").innerHTML = enemyCard();
      }
      break;
    }
    default:
      break;
  }
}
