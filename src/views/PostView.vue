<template>
  <v-container>
   <post-detail 
    :title="post.title" 
    :body="post.body" 
    :user="user"
    />
    <comment-container :comments="comments"/>
   </v-container>
</template>
<script>
import PostDetail from "../components/PostDetail";
import CommentContainer from "../components/CommentContainer";
export default {
  data() {
    return {
      post: {},
      user: null,
      comments: null,
    };
  },
  components: {
    PostDetail,
    CommentContainer,
  },
  async created() {
    let _this = this;
    await this.$store
      .dispatch("fetchPostById", this.$route.params.id)
      .then((res) => {
        _this.post = res;
      })
      .catch((err) => {
        _this.post = err;
      });
    if (!_this.post.error) {
      await Promise.all([
        this.$store.dispatch("fetchUser", _this.post.userId),
        this.$store.dispatch("fetchComments", _this.post.id),
      ]).then((response) => {
        _this.user = response[0];
        _this.comments = response[1];
      });
    }
  },
};
</script>