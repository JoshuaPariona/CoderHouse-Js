const characters = [
  {
    name: "Guerrero",
    health: 150,
    attack: 30,
    defense: 20,
    critical: 0.15,
    skills: [
      {
        name: "Golpe Poderoso",
        description: "Inflige un 150% del daño base al enemigo.",
        cooldown: 2,
      },
      {
        name: "Defensa Total",
        description: "Reduce el daño recibido en un 50% durante 1 turno.",
        cooldown: 3,
      },
    ],
  },
  {
    name: "Mago",
    health: 100,
    attack: 40,
    defense: 10,
    critical: 0.2,
    skills: [
      {
        name: "Bola de Fuego",
        description: "Lanza una bola de fuego que inflige 200% de daño mágico.",
        cooldown: 2,
      },
      {
        name: "Escudo Mágico",
        description: "Crea un escudo que absorbe hasta 50 puntos de daño.",
        cooldown: 4,
      },
    ],
  },
  {
    name: "Pícaro",
    health: 120,
    attack: 25,
    defense: 15,
    critical: 0.4,
    skills: [
      {
        name: "Golpe Sombrío",
        description:
          "Ataque rápido con un 50% de probabilidad de crítico adicional.",
        cooldown: 1,
      },
      {
        name: "Evasión",
        description:
          "Aumenta la probabilidad de esquivar ataques en un 30% durante 2 turnos.",
        cooldown: 3,
      },
    ],
  },
  {
    name: "Clérigo",
    health: 130,
    attack: 20,
    defense: 25,
    critical: 0.1,
    skills: [
      {
        name: "Sanación",
        description: "Restaura 50 puntos de vida a un aliado.",
        cooldown: 2,
      },
      {
        name: "Luz Purificadora",
        description:
          "Inflige 100% de daño mágico a todos los enemigos y cura a todos los aliados un 20% de su vida máxima.",
        cooldown: 5,
      },
    ],
  },
];

function main() {
  const promptCharacters = characters
    .map((character, index) => {
      return `${index}) ${character.name}: vida->${character.health} defenza->${character.defense}\n`;
    })
    .join("");

  const character1Index = parseInt(
    prompt("Selecciona el personaje 1:\n\n" + promptCharacters)
  );

  const character2Index = parseInt(
    prompt("Selecciona el personaje 2:\n\n" + promptCharacters)
  );

  if (isNaN(character1Index) || isNaN(character2Index)) {
    alert("Por favor selecciona un personaje válido.");
    return;
  }

  const character1 = characters[character1Index];
  const character2 = characters[character2Index];

  alert(`\nJuego iniciado: ${character1.name} vs ${character2.name}`);
  gameLoop(character1, character2);
}

function moveRequest(attacker, defender) {
  const promptSkills = [
    "0) Ataque basico",
    ...attacker.skills.map(
      (item, index) => String(index + 1) + ") " + item.name
    ),
  ].join("\n");

  let option = parseInt(
    prompt(
      "Vida actual->" +
        attacker.health +
        "\nSelecciona una habilidad del " +
        attacker.name +
        ": \n\n" +
        promptSkills
    )
  );

  let dmg = attacker.attack;
  if (isNaN(option)) {
    option = 0;
  }

  // calcula si es un golpe critico
  if (Math.random() < attacker.critical) {
    dmg *= 1.5;
    alert("Golpe Critico");
  }

  // hace daño si supera su defensa
  if (defender.defense < dmg) {
    defender.health += defender.defense - dmg;
  }

  alert(
    "Daño inflingido: " + String(defender.defense - dmg) + "\n\nSiguiente turno"
  );
}

function gameCheck(character1, character2) {
  return character1.health <= 0 || character2.health <= 0;
}

function getWinner(character1, character2) {
  if (character1.health > 0) return character1.name;
  return character2.name;
}

function gameLoop(character1, character2) {
  let turn = 1;
  let gameOver = false;
  while (!gameOver) {
    if (turn % 2 === 0) {
      moveRequest(character2, character1);
    } else {
      moveRequest(character1, character2);
    }
    gameOver = gameCheck(character1, character2);
    turn++;
  }
  alert("Fin del juego, ganador:\n\n" + getWinner(character1, character2));
}
