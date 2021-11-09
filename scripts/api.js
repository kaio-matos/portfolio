import { Snackbar } from "./Snackbar.js";

/**
 * Class that provides functions for github API requests
 */
class GithubAPI {
  username = "kaio-matos";
  api = "https://api.github.com";

  async getRepos() {
    try {
      const raw = await fetch(`${this.api}/users/${this.username}/repos`);
      const repos = await raw.json();

      return repos;
    } catch (err) {
      new Snackbar(
        "Ocorreu um erro ao buscar os repositórios",
        "error"
      ).showAndHide();

      console.log(err);
      return [];
    }
  }

  async getUsedLanguage(languages_url) {
    try {
      const raw = await fetch(languages_url);
      const usedLanguages = await raw.json();
      return usedLanguages;
    } catch (err) {
      new Snackbar(
        "Ocorreu um erro ao buscar as linguagens utilizadas",
        "error"
      ).showAndHide();

      console.log(err);
      return [];
    }
  }

  async getImage(repoName, branch) {
    let url = "";

    try {
      const raw = await fetch(
        `${this.api}/repos/kaio-matos/${repoName}/git/trees/${branch}`
      );
      const { tree: repositoryTree } = await raw.json();

      for (let file of repositoryTree) {
        if (file.path === "README") {
          const raw = await fetch(file.url);
          const { tree: images } = await raw.json();
          url = `https://raw.githubusercontent.com/kaio-matos/${repoName}/${branch}/README/${images[0].path}`;
        }
      }
    } catch (err) {
      console.log(err);
      return "";
    }

    return url;
  }
}

const ghApi = new GithubAPI();

export { ghApi };
