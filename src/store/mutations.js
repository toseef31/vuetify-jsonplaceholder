export default {
  setPosts(state, value) {
    state.posts = value;
  },
  setPost(state, value) {
    state.post = value;
  },
  setUserLogin(state, value) {
    state.userLogin.name = value.name;
    state.userLogin.id = value.id;
  },
};