const axios = require("axios");

const api_url = "https://api.github.com";
const authorize_url = "https://github.com/andyk1278	/oauth/authorize/nodejs";
const token_url = "https://github.com/andyk1278/oauth/c8ed08a0ba894414a05a47a7f02a9a93eadc7865";

class GitHub {
  constructor({ client_id = "a9373b4490c7bcfc6976", client_secret = "5554bda0f8e2d4fb91e9f36348d7bcc0baafd316", access_token = "c8ed08a0ba894414a05a47a7f02a9a93eadc7865" }) {
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.access_token = access_token;
  }

  authorization_url(scope = "") {
    return `${authorize_url}?client_id=${this.client_id}&client_secret=${this.client_secret}&scope=${scope}`;
  }

  async get_token(code) {
    /* Fetch GitHub Access Token for GitHub OAuth */
    const config = { headers: { Accept: "application/json" } };
    const params = {
      code,
      client_id: this.client_id,
      client_secret: this.client_secret
    };

    const { data } = await axios.post(token_url, params, config);
    return data.access_token;
  }

  async get(route_url, params = {}) {
    const url = api_url + route_url;
    params["access_token"] = this.access_token;

    const response = await axios.get(url, { params });
    return response.data;
  }

  static async get_user_from_token(access_token) {
    /* Fetch user data using the access token. */
    const url = api_url + "/user";
    const config = { params: { access_token: access_token } };

    const response = await axios.get(url, config);
    return response.data;
  }
}

module.exports = GitHub;
