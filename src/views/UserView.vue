<template>
  <v-container>
   <v-row justify="center">
    <v-col class="col-10">
    <h3 class="mb-2">List of your posts</h3>
    <v-divider class="mb-4" />
   <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            #
          </th>
          <th class="text-left">
            Title
          </th>
          <th class="text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="post in posts"
          :key="post.title"
        >
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td> 
           <router-link
            :to="'/post/'+post.id"
            class="text-decoration-none"
           ><v-btn text small>
            <v-icon aria-hidden="false">
              mdi-eye-outline
            </v-icon>
           </v-btn>
           </router-link>
           <router-link
            :to="'/user/post/'+post.id"
            class="text-decoration-none"
           ><v-btn text small>
            <v-icon aria-hidden="false">
              mdi-pencil
            </v-icon>
           </v-btn>
           </router-link>
           <v-btn text small >
            <v-icon aria-hidden="false" @click="deletePost(post.id)">
              mdi-delete
            </v-icon>
           </v-btn>
      </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</v-col>
</v-row>
</v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      posts: {},
    };
  },
  async created() {
    let _this = this;
    await _this
      .fetchPostByUserId()
      .then((response) => {
        _this.posts = response;
      })
      .catch((err) => {
        _this.posts = err;
      });
  },
  beforeCreate: function () {
   console.log(localStorage.getItem("name"));
   if (localStorage.getItem("name") == null) {
        this.$router.push('/login')
      }
   },
  computed: {
    ...mapState(["userLogin"]),
  },
  methods: {
    ...mapActions(["fetchPostByUserId"]),
    deletePost(id) {
      if (confirm(`Are you sure you want to delete the post? #${id}`)) {
        this.$store
          .dispatch("deletingPost", id)
          .then(() => {
            alert(`You have successfully deleted the post #${id}`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
<style>
.v-application a {
    color: #333 !important;
    text-decoration: none;
}
</style>