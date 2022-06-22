class Comment {
  post_id = "";
  user_id = "";
  content = "";
  api_url = "https://62b0a208e460b79df04a49a1.mockapi.io";

  async create() {
    let data = {
      post_id: this.post_id,
      user_id: this.user_id,
      content: this.content,
    };

    data = JSON.stringify(data);

    let response = await fetch(this.api_url + "/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    data = await response.json();
  }

  async get(post_id) {
    let api_url = this.api_url + "/comments";

    let resp = await fetch(api_url);
    let respData = await resp.json();
    console.log(respData);
    let post_comments = [];

    let i = 0;
    respData.forEach((item) => {
      if (item.post_id === post_id) {
        post_comments[i] = item;
        i++;
      }
    });

    return post_comments;
  }
}
