import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  mounted() {
    let _this = this;
    if (localStorage.getItem("name") && localStorage.getItem("id")) {
      let name = localStorage.getItem("name");
      let id = localStorage.getItem("id");
      _this.$store.commit("setUserLogin", { name, id });
    }
  },
}).$mount('#app')
