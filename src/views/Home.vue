<template>
<div class="home">
  <img id="InvestmentChart" src="/InvestmentChart.pdf">
</div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
  computed: {
    photos() {
      return this.$store.state.photos;
    }
  },
  async created() {
    await this.$store.dispatch("getAllPhotos");
  },
}
</script>
