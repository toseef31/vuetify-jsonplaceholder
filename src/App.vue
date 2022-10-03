<template>
  <v-app>
    <NavMenu/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavMenu from "./components/NavBar";
export default {
  name: 'App',
  components: {
    NavMenu
  },
  data: () => ({
    //
  }),
};
</script>
<style>
.v-application a {
    color: #fff !important;
    text-decoration: none;
}
</style>
