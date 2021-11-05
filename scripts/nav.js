const links = [
  {
    link: "/",
    connected: "down",
    text: "Home",
    img: "../../assets/Home.svg",
  },
  [
    [
      {
        link: "../skills/skills.html",
        text: "Habilidades | Desenvolvimento Web",
        connected: "down",
      },
      {
        link: "../projects/projects.html",
        connected: "both",
        text: "Projetos",
      },
      {
        link: "../formation/formation.html",
        text: "Formação",
      },
    ],

    [
      {
        link: "servidor",
        text: "Habilidades | Servidor",
      },
    ],
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
    if (link.length) {
      let insideColumn = false;
      let counter = 0;

      links.forEach((link) => (link.length ? counter++ : counter));
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
