<template>
<div>

  <div class="image">
    <img :src="this.singlePhoto.path" />
  </div>

  <p class="photoTitle">{{this.singlePhoto.title}}</p>
  <p class="photoDate">
    <span> {{this.singlePhoto.user.name}}, </span>
    {{formatDate(this.singlePhoto.created)}}
  </p>
  <p>{{this.singlePhoto.description}}</p>

  <hr>


  <div v-for="comment in comments" v-bind:key="comment._id">
    <p>{{comment.comment}}</p>

  </div>

  <form v-if="user" @submit.prevent="addComment">
    <p>Comment</p>
    <textarea v-model="comment"></textarea>
    <br />
    <button type="submit">Submit</button>
  </form>
  <div v-else>

  </div>




</div>
</template>


<script>
import moment from 'moment';

export default {
  name: 'Photo',
  components: {

  },
  data() {
    return {
      comment: '',

    }
  },
  watch: {
    
  },
  computed: {
    singlePhoto() {
    return this.$store.state.singlePhoto;
    },
    user() {
      return this.$store.state.user;
    },
    comments() {
      console.log("!!!!!!!!");
      console.log(this.$store.state.comments);
      console.log("!!!!!!!!!");
      return this.$store.state.comments;
    }

  },
  created() {
      this.$store.dispatch("getSinglePhoto", this.$route.params.id);
      this.$store.dispatch("getComments");
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
        else
        return moment(date).format('d MMMM YYYY');
    },
    async addComment() {
      try {
        this.error = await this.$store.dispatch("addComment", {
          user: this.user,
          photo: this.singlePhoto,
          comment: this.comment,
        });
        if (this.error === "")
          this.$router.push('photo');
      } catch (error) {
        console.log(error);
      }
    }
  },
}

</script>

<style scoped>
.photoTitle {
  margin: 0px;
  font-size: 1.2em;
}

.photoDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}

p {
  margin: 0px;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  max-width: 600px;
  max-height: 600px;
  image-orientation: from-image;
}
</style>
