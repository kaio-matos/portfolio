class Loading {
  mounted = false;

  constructor(text = "Carregando") {
    this.message = text;

    this.create();
  }

  create() {
    const loadingContainerBg = document.createElement("div");
    const loadingContainer = document.createElement("div");
    const loadingAnimation = document.createElement("span");
    const message = document.createTextNode(this.message);

    loadingContainer.appendChild(loadingAnimation);
    loadingContainer.appendChild(message);

    loadingContainerBg.appendChild(loadingContainer);

    loadingContainerBg.classList.add("loading_bg", "text", "text_white");

    this.loading = loadingContainerBg;
    this.mount();
    return this;
  }

  toggle() {
    this.loading.classList.toggle("loading_on");
    return this;
  }

  on() {
    this.loading.classList.add("loading_on");
    return this;
  }

  off() {
    this.loading.classList.remove("loading_on");
    return this;
  }

  mount() {
    const body = document.getElementsByTagName("body")[0];
    body.appendChild(this.loading);
    return this;
  }

  unmount() {
    const animations = this.snack.getAnimations();
    const waitAnimations = Promise.all(animations.map((anm) => anm.finished));

    waitAnimations.then(() => {
      this.loading.remove();
      this.mounted = false;
    });
    return this;
  }
}

export { Loading };
