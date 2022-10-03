<template>
<v-container>
 <v-row justify="center">
  <p  class="mt-5 pa-3" color="red"><span class="font-bold">Important:</span> resource will not be really updated on the server but it will be faked as if.</p>
  <v-col class="col-12 col-md-6">
  <p class="mt-5">{{ messenge }} </p>
   <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model.trim="post.title"
      :counter="5"
      :rules="titleRules"
      label="Title"
      required
    ></v-text-field>
    <v-textarea
      filled
      v-model.trim="post.body"
      label="Body"
      value=""
      class="mt-5"
    ></v-textarea>
    <v-text-field
      v-model.trim="post.user.name"
      disabled
      required
    ></v-text-field>
    <input type="hidden" v-model.lazy.trim="post.user.id">
    <div v-if="addnew">
     <v-btn
     :disabled="!valid"
     color="success"
     class="mr-4"
     @click="save"
    >
      Save
    </v-btn>
    </div>
    <div v-else>
    <v-btn
    :disabled="!valid"
    color="success"
    class="mr-4"
    @click="edit"
    >
      Update
    </v-btn>
    </div>
   </v-form>
  </v-col>
 </v-row>	
</v-container>	
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      addnew: true,
      valid: true,
      post: {},
      success: "",
      messenge: "",
      showMessenge: null,
      titleRules: [
        v => !!v || 'Title is required',
        v => (v && v.length >= 5) || 'Title must be greater than 5 characters',
      ],
    };
  },
  beforeCreate: function () {
   console.log(localStorage.getItem("name"));
   if (localStorage.getItem("name") == null) {
        this.$router.push('/login')
      }
   },
  async created() {
    let _this = this;
    await _this.$store
      .dispatch("fetchPostById", _this.$route.params.id)
      .then((response) => {
        _this.post = response;
        _this.addnew = false;
      })
      .catch(() => {
        _this.post = {
          userId: null,
          id: null,
          title: "",
          body: "",
          user: {
            id: this.userLogin.id,
            name: this.userLogin.name,
          },
        };
        _this.addnew = true;
      });
  },
  computed: {
    ...mapState(["userLogin"]),
  },
  methods: {
    save() {
      if (this.post.title && this.post.body) {
        let post = {
          title: this.post.title,
          body: this.post.body,
          userId: this.userLogin.id,
        };
        this.$store
          .dispatch("creatingPost", post)
          .then((response) => {
            this.messenge = "You have successfully added.";
            this.success = true;
            console.table(response);
            let _this = this;
            this.showMessenge = setTimeout(function () {
              _this.messenge = "";
              _this.success = "";
            }, 3000);
          })
          .catch(() => {
            this.messenge = "More failure";
          });
      } else {
        alert("");
      }
    },
    edit() {
      if (this.post.title && this.post.body) {
        let post = {
          title: this.post.title,
          body: this.post.body,
        };
        this.$store
          .dispatch("updatingPost", this.post.id, post)
          .then((response) => {
            this.messenge = "You have successfully updated the post.";
            this.success = true;
            console.table(response);
            let _this = this;
            this.showMessenge = setTimeout(function () {
              _this.messenge = "";
              _this.success = "";
            }, 3000);
          })
          .catch(() => {
            this.messenge = "Update failed";
          });
      } else {
        alert("");
      }
    },
  },
  beforeDestroy() {
    clearTimeout(this.showMessenge);
  },
  watch: {
    $route() {
      console.log("route change");
      // this.$forceUpdate();
      this.$router.go();
    },
  },
};
</script>