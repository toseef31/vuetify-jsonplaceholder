<template>
  <post-item :posts="getPosts" />
</template>

<script>
  import PostItem from '../components/PostItem'
  import { mapGetters } from "vuex";
  export default {
    name: "HomeView",
    components: {
      PostItem,
    },
    async created() {
      if (!this.getPosts) await this.$store.dispatch("fetchPostsAll");
    },
    computed: {
      ...mapGetters(["getPosts"]),
    },
};
</script>
