import { ghApi } from "../../scripts/api.js";

(async () => {
  const container = document.getElementsByClassName("cards_container")[0];
  const repos = await ghApi.getRepos();
  createCards(repos, container);
})();

function createCards(repos, element) {
  // repos.forEach((repo) => {
  //   const card = Card(repo);
  //   element.appendChild(card);
  // });
}
function Card({ name, description, topics, homepage, html_url, language }) {
  const div = document.createElement("div");
  const txt = document.createTextNode(name);
  div.appendChild(txt);
  return div;
}
