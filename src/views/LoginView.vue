<template>
  <v-container>
   <v-row justify="center" class="mt-5">
    <v-col class="col-10 col-md-5 pa-16 mt-5" style="background: #1976d224;">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
      <h3 class="mb-5">Login with account</h3>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click.prevent="login"
        >
        Login
        </v-btn>
     
    </v-form>
  </v-col>
 </v-row>
</v-container>
</template>
<script>
import { mapMutations } from "vuex";
  export default {
    data: () => ({
      valid: true,
      email: "Sincere@april.biz",
      user: {},
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
     
    }),
    beforeCreate: function () {
        if (localStorage.getItem("name")) {
          this.$router.push('/')
        }
      },
    methods: {
      ...mapMutations(["setUserLogin"]),
        async login() {
          let _this = this;
          await _this.$store
            .dispatch("fetchUserByEmail", _this.email)
            .then((user) => {
              _this.user = user;
            })
            .catch(() => {
              _this.user = { err: "" };
            });
          if (!_this.user.err) {
            this.setUserLogin(_this.user);
            localStorage.setItem("name", _this.user.name);
            localStorage.setItem("id", _this.user.id);
            _this.$router.replace({ name: "home" });
          }
        },
      validate () {
        this.$refs.form.validate()
      },
     
    },
  }
</script>
<style>
.v-application .success {
    background-color: #1976d2 !important;
    border-color: #1976d2 !important;
}
</style>