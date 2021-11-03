import { ghApi } from "./api.js";

async function getRepositories() {
  const repos = await ghApi.getRepos();
  console.log(repos);
}

(() => {
  getRepositories();
})();
