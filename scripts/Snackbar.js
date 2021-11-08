class Snackbar {
  message = "";
  status = "";
  mounted = false;

  ON = "snackbar_on";

  constructor(text, status) {
    this.message = text;
    this.status = status;

    this.create();
  }

  create() {
    const snackbar = document.createElement("div");
    const message = document.createTextNode(this.message);

    snackbar.appendChild(message);
    snackbar.classList.add(
      "snackbar",
      `snackbar-${this.status}`,
      "text",
      "text_white"
    );

    this.snack = snackbar;
    this.mount();
    return this;
  }

  showAndHide(time = 3000) {
    if (this.mounted) this.mount();

    this.toggle();
    setTimeout(() => {
      this.toggle();
      this.unmount();
    }, time);

    return this;
  }

  toggle() {
    this.snack.classList.toggle(this.ON);
    return this;
  }

  mount() {
    const body = document.getElementsByTagName("body")[0];
    this.mounted = true;
    body.appendChild(this.snack);
    return this;
  }

  unmount() {
    const animations = this.snack.getAnimations();
    const waitAnimations = Promise.all(animations.map((anm) => anm.finished));

    waitAnimations.then(() => {
      this.snack.remove();
      this.mounted = false;
    });
    return this;
  }
}

export { Snackbar };
