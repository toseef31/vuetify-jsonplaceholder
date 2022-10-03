<template>
  <v-container>
    <div class="d-flex justify-space-between align-center">
    <h4>List of Articals</h4>
    <router-link
        to="/user/post/0"
       >
     <v-btn
      color="success"
      class="mb-3"
        >
        Add Artical
      </v-btn>
     </router-link>
    </div>
     <v-divider/>
     <v-row class="mt-5">
        <v-col class="col-md-3 mb-4" 
         v-for="post in posts"
         :key="post.id"
        >
        <router-link
        :to="'/post/'+post.id"
        class="text-decoration-none"
        >
         <v-card
          class="mx-auto"
          max-width="344"
          elevation="4"
        >
        <v-card-text>
          <p class="text-h5 text--primary">
            <span class="ellipsis">{{post.title.substring(0,15)+"..."}}</span> 
          </p>
          <div class="text--primary">
            {{post.body.substring(0,120)+"..."}}
          </div>
        </v-card-text>
        <v-divider/>
        <v-card-actions>
         
           <span class="subtitle-2"> Author: {{ post.user.name }}</span>
          
         </v-card-actions>
        </v-card>
      </router-link>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'PostItem',
     props: {
      posts: {
       type: [Array, Object],
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
