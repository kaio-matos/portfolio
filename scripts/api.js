/**
 * Class that provides functions for github API requests
 */
class GithubAPI {
  username = "kaio-matos";
  api = "https://api.github.com";

  async getRepos() {
    const raw = await fetch(`${this.api}/users/${this.username}/repos`, {
      method: "GET",
    });

    const repos = await raw.json();
    return repos;
  }

  async getImage(repoName, branch) {
    let url = "";
    const raw = await fetch(
      `${this.api}/repos/kaio-matos/${repoName}/git/trees/${branch}`
    );
    const { tree } = await raw.json();

    for (let file of tree) {
      if (file.path === "README") {
        const raw = await fetch(file.url);
        const { tree: images } = await raw.json();

        url = `https://raw.githubusercontent.com/kaio-matos/${repoName}/${branch}/README/${images[0].path}`;
      }
    }

    return url;
  }
}

const ghApi = new GithubAPI();

export { ghApi };
