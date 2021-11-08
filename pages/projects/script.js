import { ghApi } from "../../scripts/api.js";

(async () => {
  async function requestData() {
    let repos = JSON.parse(localStorage.getItem("repositories"));

    if (repos === null) {
      repos = await ghApi.getRepos();

      for (let i in repos) {
        const image = await ghApi.getImage(
          repos[i].name,
          repos[i].default_branch
        );
        repos[i] = { ...repos[i], imageSrc: image };
      }

      localStorage.setItem("repositories", JSON.stringify(repos));
    }

    return repos;
  }

  const container = document.getElementsByClassName("cards_container")[0];
  const repos = await requestData();

  createCards(repos, container);
})();

function createCards(repos, element) {
  repos.forEach(async (repo) => {
    const card = Card(repo);
    card.appendChild(HoverCard(repo));
    element.appendChild(card);
  });
}

function Card({ name, description, imageSrc }) {
  // Containers
  const card = document.createElement("div");
  const cardImageContainer = document.createElement("div");
  const cardInfo = document.createElement("div");

  card.classList.add("card");
  cardImageContainer.classList.add("card_image_container");
  cardInfo.classList.add("card_info");

  // Image
  const img = CardImage(imageSrc, name); // For now
  cardImageContainer.appendChild(img);

  // Infos
  const h2 = CardTitle(name);

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
  language,
  imageSrc,
}) {
  // Containers
  const card = document.createElement("div");
  const cardImageContainer = document.createElement("div");
  const cardInfo = document.createElement("div");

  card.classList.add("card_hover");
  cardImageContainer.classList.add("card_image_container");
  cardInfo.classList.add("card_info");

  // Image
  const img = CardImage(imageSrc, name);
  cardImageContainer.appendChild(img);

  // Infos
  const h2 = CardTitle(name);
  const descriptionDiv = CardDescription(description);

  cardInfo.appendChild(h2);
  cardInfo.appendChild(descriptionDiv);

  card.appendChild(cardImageContainer);
  card.appendChild(cardInfo);
  return card;
}

function CardDescription(description) {
  const descriptionDiv = document.createElement("div");
  const descText = document.createTextNode(description);

  descriptionDiv.appendChild(descText);
  descriptionDiv.classList.add("card_description", "text_gray", "text");
  return descriptionDiv;
}

function CardTitle(name) {
  const h2 = document.createElement("h2");
  const title = document.createTextNode(name);

  h2.appendChild(title);
  h2.classList.add("card_title", "title", "text_gray");

  return h2;
}

function CardImage(link, name) {
  const img = document.createElement("img");
  img.src = link;
  img.alt = name;
  return img;
}
