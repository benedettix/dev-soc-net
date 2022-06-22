class User {
  user_id = "";
  username = "";
  email = "";
  password = "";
  api_url = "https://62b0a208e460b79df04a49a1.mockapi.io";

  async create() {
    let data = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    data = JSON.stringify(data);
    try {
      let request = await fetch(this.api_url + "/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      let requestData = await request.json();
      let succesLogin = await function () {
        let session = new Session();

        console.log(requestData);
        session.user_id = requestData.id;
        session.startSession();

        window.location.href = "account.html";
      };
      if (request.ok) succesLogin();
      else throw new Error("Bad Url");
    } catch (err) {
      console.log(err);
    }
  }

  async get(user_id) {
    let api_url = this.api_url + "/users/" + user_id;

    let resp = await fetch(api_url);
    let respData = await resp.json();

    return respData;
  }

  edit() {
    let data = {
      username: this.username,
      email: this.email,
    };
    data = JSON.stringify(data);
    console.log(data);
    let session = new Session();
    session_id = session.getSession();

    let resp = fetch(this.api_url + "/users/" + session_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = "account.html";
      });
  }

  delete() {
    let session = new Session();
    session_id = session.getSession();

    let resp = fetch(this.api_url + "/users/" + session_id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        let session = new Session();
        session.destroySession();

        window.location.href = "/";
      });
  }

  async login() {
    let res = await fetch(this.api_url + "/users");
    let resData = await res.json();

    let login_succesful = 0;

    resData.forEach((db_user) => {
      if (db_user.email === this.email && db_user.password === this.password) {
        let session = new Session();
        session.user_id = db_user.id;
        session.startSession();
        login_succesful = 1;
        window.location.href = "account.html";
      }
    });
    if (login_succesful === 0) {
      alert("bad email or password");
    }
  }
}
