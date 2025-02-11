setDialogue("Tu turno, elige un movimiento");
document.querySelector(".player").innerHTML = playerCard();
document.querySelector(".enemy").innerHTML = enemyCard();

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
  document.querySelector(".dialog").innerText = text;
}

document.querySelector(".attack").addEventListener("click", () => {
  disableActions();
  const player = getCharacter();
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
  const player = getCharacter();
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
  const player = getCharacter();
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
  const player = getCharacter();
  setDialogue("Has elegido transformarte");
  const nextTransformation = (player.current_transformation ?? -1) + 1;
  const maxTransformation = player.transformations.length - 1;
  localStorage.setItem(
    "selected_character",
    JSON.stringify({
      current_transformation: Math.min(nextTransformation, maxTransformation),
      ...player,
      ...player.transformations[
        Math.min(nextTransformation, maxTransformation)
      ],
    })
  );
  document.querySelector(".player").innerHTML = playerCard();
  setTimeout(() => {
    enemyAction();
    setTimeout(() => {
      ableActions();
      setDialogue("Tu turno, elige un movimiento");
    }, 1500);
  }, 1500);
});

function enemyAction() {
  const enemy = getEnemy();
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
    case "transform":{
      setDialogue(`El enemigo ha elegido transformarse`);
      const enemy = getEnemy();
      const nextTransformation = (enemy.current_transformation ?? -1) + 1;
      const maxTransformation = enemy.transformations.length - 1;
      localStorage.setItem(
        "enemy",
        JSON.stringify({
          current_transformation: Math.min(
            nextTransformation,
            maxTransformation
          ),
          ...enemy,
          ...enemy.transformations[
            Math.min(nextTransformation, maxTransformation)
          ],
        })
      );
      document.querySelector(".enemy").innerHTML = enemyCard();
      break;
    }
    default:
      break;
  }
}
