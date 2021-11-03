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
}

const ghApi = new GithubAPI();

export { ghApi };
