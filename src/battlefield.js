const base_url = "https://dragonball-api.com/api";

let selectedMapId = 2;

document.querySelector(".map-name").addEventListener("click", async () => {
  const map = await getMap(selectedMapId);
  map.characters = undefined;
  localStorage.setItem("map", JSON.stringify(map));
  window.location.href = "fight.html";
});

fetch(`${base_url}/planets?limit=20`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    document.querySelector(".maps-container").innerHTML = data.items
      .map(mapCard)
      .join("");
    document.querySelectorAll(".map-card").forEach((card) => {
      card.addEventListener("click", () => {
        setSelectedMap(card.getAttribute("map-id"), card.querySelector("h5").textContent);
      });
    });
    setSelectedMap(selectedMapId, data.items.find((map) => map.id === selectedMapId).name);
  })
  .catch((error) => console.error("Error:", error));

function mapCard(map) {
  return `
    <div class="map-card" map-id="${map.id}">
      <img src="${map.image}" alt="${map.name}" />
      <h5>${map.name}</h5>
    </div>
  `;
}

function setSelectedMap(mapId,mapName) {
  selectedMapId = mapId;
  document
    .querySelector(".map-card-selected")
    ?.classList.remove("map-card-selected");
  document
    .querySelector(`.map-card[map-id="${mapId}"]`)
    .classList.add("map-card-selected");
  document.querySelector(".map-name").textContent = mapName;
}

function getMap(mapId) {
  return fetch(`${base_url}/planets/${mapId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => console.error("Error:", error));
}
