import { ghApi } from "../../scripts/api.js";

(async () => {
  const container = document.getElementsByClassName("cards_container")[0];
  const repos = await ghApi.getRepos();
  createCards(repos, container);
})();

function createCards(repos, element) {
  repos.forEach((repo) => {
    const card = Card(repo);
    card.appendChild(HoverCard(repo));
    element.appendChild(card);
  });
}

function Card({ name, description }) {
  // Containers
  const card = document.createElement("div");
  const cardImageContainer = document.createElement("div");
  const cardInfo = document.createElement("div");

  card.classList.add("card");
  cardImageContainer.classList.add("card_image_container");
  cardInfo.classList.add("card_info");

  // Image
  const img = document.createElement("img");
  img.src = "https://source.unsplash.com/random"; // For now
  img.alt = name;

  cardImageContainer.appendChild(img);

  // Infos
  const h2 = document.createElement("h2");
  const title = document.createTextNode(name);

  h2.appendChild(title);
  h2.classList.add("card_title", "title", "text_gray");

  cardInfo.appendChild(h2);

  card.appendChild(cardImageContainer);
  card.appendChild(cardInfo);
  return card;
}

function HoverCard({
  name,
  description,
  topics,
  homepage,
  html_url,
  language,
}) {
  // Containers
  const card = document.createElement("div");
  const cardImageContainer = document.createElement("div");
  const cardInfo = document.createElement("div");

  card.classList.add("card_hover");
  cardImageContainer.classList.add("card_image_container");
  cardInfo.classList.add("card_info");

  // Image
  const img = document.createElement("img");
  img.src = "https://source.unsplash.com/random"; // For now
  img.alt = name;

  cardImageContainer.appendChild(img);

  // Infos
  const h2 = document.createElement("h2");
  const title = document.createTextNode(name);

  h2.appendChild(title);
  h2.classList.add("card_title", "title", "text_gray");

  const descriptionDiv = document.createElement("div");
  const descText = document.createTextNode(description);

  descriptionDiv.appendChild(descText);
  descriptionDiv.classList.add("card_description", "text_gray", "text");

  cardInfo.appendChild(h2);
  cardInfo.appendChild(descriptionDiv);

  card.appendChild(cardImageContainer);
  card.appendChild(cardInfo);
  return card;
}
