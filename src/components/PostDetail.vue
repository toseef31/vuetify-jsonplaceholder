<template>
    <v-row class="mt-5">
      <v-col class="col-md-12 mb-4">
      <h2>{{ title}}</h2>
      <p class="caption">Author: {{ user.name }}</p>
      <v-divider/>
      <p class="py-3 body-1">{{ body }}</p>
      <v-divider/>
      </v-col>
    </v-row>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: "",
      },
      body: {
        type: String,
        default: "",
      },
      user: {
        type: Object,
        default: function () {
          return {
            id: 0,
            name: "",
            email: "",
          };
        },
      },
    },
  };
</script>