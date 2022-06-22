class Post {
  post_id = "";
  post_content = "";
  user_id = "";
  likes = "";
  api_url = "https://62b0a208e460b79df04a49a1.mockapi.io";

  async create() {
    let session = new Session();
    session_id = session.getSession();

    let data = {
      user_id: session_id,
      content: this.post_content,
      likes: 0,
    };

    data = JSON.stringify(data);

    let response = await fetch(this.api_url + "/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    data = await response.json();

    return data;
  }

  async getAllPosts() {
    let response = await fetch(this.api_url + "/posts");
    let data = await response.json();
    return data;
  }

  async delete(post_id) {
    let response = await fetch(this.api_url + "/posts/" + post_id, {
      method: "DELETE",
    });
    // data = await response.json();
  }
  async like(post_id, likes) {
    let data = {
      likes: likes,
    };

    data = JSON.stringify(data);

    let response = await fetch(this.api_url + "/posts/" + post_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    data = await response.json();
  }
}
