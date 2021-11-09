const links = [
  {
    link: "/",
    connected: "down",
    text: "Home",
    img: window.location.origin + "/assets/Home.svg",
  },
  [
    [
      {
        link: window.location.origin + "/pages/skills/skills.html",
        text: "Habilidades | Desenvolvimento Web",
      },
      {
        link: window.location.origin + "/pages/projects/projects.html",
        connected: "both",
        text: "Projetos",
      },
      {
        link: window.location.origin + "/pages/formation/formation.html",
        text: "Formação",
      },
    ],
    [],
  ],
];

const nav = document.getElementsByClassName("nav")[0];

/**
 *  For each object --- creates a menu item
 *
 *  If there is one array --- creates a .nav_column div
 *    * nav_column hold all .nav_row
 *
 *  If there is two arrays --- creates a .nav_row div
 *
 */
function CreateItems(links, element) {
  links.forEach((link) => {
    if (Array.isArray(link)) {
      let insideColumn = false;
      let counter = 0;

      links.forEach((link) => (Array.isArray(link) ? counter++ : counter));
      if (counter >= 2) insideColumn = true;

      const div = document.createElement("div");

      if (insideColumn) div.classList.add("nav_row");
      if (!insideColumn) div.classList.add("nav_column");

      CreateItems(link, div);
      element.appendChild(div);
      return;
    }

    element.innerHTML += NavItem(link);
  });
}

function NavItem({ text, link, connected, img }) {
  let connectedClass = "";
  let imageItem = "";

  if (connected) connectedClass = `nav_connected_${connected}`;
  if (img) imageItem = `<img src="${img}" alt="${text}" />`;

  return `<div class="nav_item ${connectedClass}">
            <a class="nav_item_link" href="${link}">
                ${imageItem}
            </a>
            <div class="baloon text">${text}</div>
         </div>`;
}

CreateItems(links, nav);
