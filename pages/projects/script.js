import { ghApi } from "../../scripts/api.js";

(async () => {
  const container = document.getElementsByClassName("cards_container")[0];
  const repos = await ghApi.getReposImagedAndLanguages();

  createCards(repos, container);
})();

function createCards(repos, element) {
  repos.forEach(async (repo) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.appendChild(CardFront(repo));
    card.appendChild(CardBack(repo));

    card.addEventListener("click", () => {
      const cards = document.getElementsByClassName("card");

      Array.from(cards).forEach((crd) => {
        if (card === crd) {
          card.classList.toggle("card_flip");
        } else {
          crd.classList.remove("card_flip");
        }
      });
    });

    element.appendChild(card);
  });
}

function CardFront({ name, imageSrc }) {
  // Containers
  const front = document.createElement("div");
  const cardImageContainer = document.createElement("div");
  const cardInfo = document.createElement("div");

  front.classList.add("card_front");
  cardImageContainer.classList.add("card_image_container");
  cardInfo.classList.add("card_info");

  // Image
  const img = CardImage(imageSrc, name);
  cardImageContainer.appendChild(img);

  // Infos
  const h2 = CardTitle(name);

  cardInfo.appendChild(h2);

  front.appendChild(cardImageContainer);
  front.appendChild(cardInfo);

  return front;
}

function CardBack({ name, description, homepage, usedLanguages }) {
  // Containers
  const back = document.createElement("div");
  const cardInfo = document.createElement("div");

  back.classList.add("card_back");
  cardInfo.classList.add("card_info");

  // Infos
  const h2 = CardTitle(name);
  const descriptionDiv = CardDescription(description);
  const anchor = document.createElement("a");
  anchor.classList.add("text");
  anchor.target = "_blank";
  anchor.href = homepage;

  const languageList = CardLanguageList(Object.keys(usedLanguages));

  anchor.appendChild(document.createTextNode("Página"));

  cardInfo.appendChild(h2);
  cardInfo.appendChild(descriptionDiv);
  cardInfo.appendChild(languageList);
  cardInfo.appendChild(anchor);

  back.appendChild(cardInfo);
  return back;
}

function CardImage(link, name) {
  if (link) {
    const img = document.createElement("img");
    img.src = link;
    img.alt = name;
    return img;
  } else {
    const span = document.createElement("span");
    span.classList.add("text");
    const text = document.createTextNode("Não há imagem");
    span.appendChild(text);
    return span;
  }
}

function CardTitle(name) {
  const h2 = document.createElement("h2");

  let adjustedName = "";
  for (let i = 0; i < name.length; i++) {
    if (name[i] === "-") {
      adjustedName += " ";
    } else {
      adjustedName += name[i];
    }
  }

  const title = document.createTextNode(adjustedName);

  h2.appendChild(title);
  h2.classList.add("card_title", "title", "text_gray");

  return h2;
}

function CardDescription(description) {
  const descriptionDiv = document.createElement("div");
  const descText = document.createTextNode(description);

  descriptionDiv.appendChild(descText);
  descriptionDiv.classList.add("card_description", "text_gray", "text");
  return descriptionDiv;
}

function CardLanguageList(languages) {
  const ul = document.createElement("ul");
  ul.classList.add("text", "card_languages_list");

  languages.forEach((language) => {
    const li = document.createElement("li");
    const text = document.createTextNode(language);
    li.appendChild(text);

    switch (language) {
      case "JavaScript":
        li.style.color = "#a89502";
        break;
      case "CSS":
        li.style.color = "#009EFF";
        break;
      case "HTML":
        li.style.color = "#E34C27";
        break;
      case "EJS":
        li.style.color = "#A91E50";
        break;

      default:
        li.style.color = "black";
        break;
    }
    ul.appendChild(li);
  });

  return ul;
}
