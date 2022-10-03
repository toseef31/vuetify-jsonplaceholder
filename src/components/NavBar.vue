<template>
 <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
         <router-link
          to="/"
          class="white--text"
          >  
          <h5>VUETIFY JSONPLACEHOLDER</h5>
         </router-link>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
      <p class="ma-0 subtitle-2"  v-if="getUserLogin.id">
       Hello,  
       <router-link
        to="/user"
        class="white--text"
        > {{ getUserLogin.name  }} 
       </router-link>
        | <button class="rounded.underline text-yellow-500" @click.prevent="logout">Logout</button>
      </p>
      <p class="ma-0 subtitle-2" v-else>
       <router-link
        to="/login"
        class="white--text"
       >
        <span class="mr-2" >Login</span>
       </router-link>
      </p>
      </div>
    </v-app-bar>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  Name: "NavBar",
  computed: {
    ...mapGetters(["getUserLogin"]),
  },
  methods: {
    ...mapMutations(["setUserLogin"]),
    logout() {
      let _this = this;
      if (localStorage.getItem("name") && localStorage.getItem("id")) {
        localStorage.removeItem("name");
        localStorage.removeItem("id");
        _this.setUserLogin({ name: "", id: "" });
        _this.$router.push({ name: "home" });
      }
    },
  },
};
</script>
<style>
.v-application a {
    color: #fff !important;
    text-decoration: none;
}
</style>