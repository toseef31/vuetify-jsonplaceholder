export default {
  fetchPostsByQuery(context, query) {
    return new Promise((resolve, reject) => {
      fetch(query)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            reject({ error: "Did not find the article" });
            return;
          }
        })
        .then((json) => {
          json.map((item) => {
            item.user = { email: "" };
          });
          resolve(json);
        })
        .catch(() => reject({ error: "" }));
    });
  },

  async fetchPostsAll({ commit }) {
    let posts = null;
    await fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json())
      .then(async (json) => {
        posts = json;
        posts = await Promise.all(
          posts.map(async (post) => {
            await fetch(
              `https://jsonplaceholder.typicode.com/users/${post.userId}`
            )
              .then((response) => response.json())
              .then((json) => {
                post.user = {
                  id: json.id,
                  name: json.name,
                };
              })
              .catch((err) => {
                console.log(err);
              });
            return post;
          })
        );
        commit("setPosts", posts);
      })
      .catch((err) => console.log(err));
  },

  fetchPostById(context, id) {
    return new Promise((resolve, reject) => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            reject({ error: "Not found" });
            return;
          }
        })
        .then(async (json) => {
          await fetch(
            `https://jsonplaceholder.typicode.com/users/${json.userId}`
          )
            .then((response) => response.json())
            .then((user) => {
              json.user = {
                id: user.id,
                name: user.name,
              };
            })
            .catch((err) => {
              console.log(err);
            });
          resolve(json);
        })
        .catch(() => reject({ error: "" }));
    });
  },

  fetchPostByUserId({ state, dispatch }) {
    const query = `${state.api}/posts?userId=${state.userLogin.id}`;
    return dispatch("fetchPostsByQuery", query);
  },

  async fetchPostByUser({ state, dispatch }, id) {
    const query = `${state.api}/posts?userId=${id}`;
    return dispatch("fetchPostsByQuery", query);
  },

  async fetchUser(context, id) {
    let user;
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((json) => {
        user = json;
      })
      .catch((err) => console.log(err));
    return user;
  },

  async fetchComments(context, id) {
    let comments;
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => response.json())
      .then((json) => {
        comments = json;
      })
      .catch((err) => console.log(err));
    return comments;
  },

  fetchUserByEmail(context, email) {
    return new Promise((resolve, reject) => {
      fetch(`https://jsonplaceholder.typicode.com/users?email=${email}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            reject({ err: "" });
          }
        })
        .then((json) => {
          let user = { name: json[0].name, id: json[0].id };
          resolve(user);
        })
        .catch((err) => {
          reject({ err });
        });
    });
  },

  creatingPost({ state }, post) {
    let query = `${state.api}/posts`;
    return new Promise((resolve, reject) => {
      fetch(query, {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => resolve(json))
        .catch((err) => reject(err));
    });
  },

  deletingPost({ state }, id) {
    let query = `${state.api}/posts/${id}`;
    return new Promise((resolve, reject) => {
      fetch(query, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 200) {
            resolve(response);
          } else {
            reject("");
          }
        })
        .catch((err) => reject(err));
    });
  },

  updatingPost({ state }, id, post) {
    let query = `${state.api}/posts/${id}`;
    return new Promise((resolve, reject) => {
      fetch(query, {
        method: "PATCH",
        body: JSON.stringify(post),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => resolve(json))
        .catch((err) => reject(err));
    });
  },
};