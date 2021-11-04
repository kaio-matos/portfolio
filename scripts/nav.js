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

const navs = document.getElementsByClassName("nav")[0];

function CreateItems(links, element) {
  links.forEach((link) => {
    if (link.length) {
      let isInsideOtherSub = false;
      let counter = 0;

      links.forEach((link) => {
        if (link.length) counter++;
        if (counter >= 2) isInsideOtherSub = true;
      });

      const subNav = document.createElement("div");

      if (isInsideOtherSub) {
        subNav.classList.add("nav_row");
      } else {
        subNav.classList.add("sub_nav");
      }

      CreateItems(link, subNav);
      element.appendChild(subNav);
    } else {
      element.innerHTML += NavItem(link);
    }
  });
}

function NavItem({ text, link, connected, img }) {
  let connectedClass = "";
  let imageItem = "";

  if (connected) {
    connectedClass = `nav_connected_${connected}`;
  }

  if (img) {
    imageItem = `<img src="${img}" />`;
  }

  return `<div class="nav_item ${connectedClass}">
            <a class="nav_item_link" href="${link}">
                ${imageItem}
            </a>
            <div class="baloon text">${text}</div>
         </div>`;
}

CreateItems(links, navs);
