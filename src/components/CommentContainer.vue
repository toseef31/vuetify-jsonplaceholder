<template>
  <v-row>
   <v-col class="col-12">
    <h3 class="mt-3 mb-3">Comments</h3>
    <template v-for="(comment,index) in comments">
    <v-card 
      :key="comment.title"
      elevation="2"
      class="mb-3">
     <v-list-item>
      <v-list-item-avatar>
        <span class="avatar" :style="'background-color:'+color[index]"></span>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-html="comment.email"></v-list-item-title>
        <v-list-item-subtitle v-html="comment.body"></v-list-item-subtitle>
      </v-list-item-content>
      </v-list-item>
     </v-card>
    </template>
   </v-col>
  </v-row>
</template>

<script>
export default {
  Name: "CommentContainer",
  props: {
    comments: {
      type: Array,
      default: null,
    },
  },
  data: () => ({
      color: [
       '#1976d2',
       'pink',
       '#333',
       'green',
       'blue',
       'red',
       'vintage',
      ]
    }),
};
</script>
<style>
.avatar{
  display: block;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 9999px;
  --tw-bg-opacity: 1;
}
</style>