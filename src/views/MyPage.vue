<template>
<div>
  <div v-if="user">
    <div class="header">
      <h1>{{user.name}}</h1>
      <div>
          <p><a href="#" @click="logout"><i class="fas fa-sign-out-alt"></i></a></p>
      </div>
    </div>
    <hr>
    <h2>Stock Portfolio:</h2>

    <div class="image" v-for="item in items" v-bind:key="item.ticker">
      <p>{{item.ticker}}: ${{item.amount}}<button @click="sell(item)">Delete</button></p>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="ticker" placeholder="Stock Ticker">
        <input v-model="amount" placeholder="Amount">
        <button @click="upload">Add</button>
      </div>
    </div>



  </div>
  <div v-else>
    <p>Track your holdings!</p>
    <router-link to="/register" class="pure-button">Register</router-link> or
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
</div>
</template>


<script>


export default {
  name: 'mypage',
  components: {

  },
  data() {
    return {
      show: false,
      ticker: "",
      amount: "",

    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    items() {
      return this.$store.state.stocks;
    }
  },
  watch: {

  },
  created() {
      this.$store.dispatch("getAllStocks");
       this.$store.dispatch("getUser");
    },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    async upload() {
      try {
        this.error = await this.$store.dispatch("addStock", {ticker: this.ticker,
          amount: this.amount});
          document.location.reload(true);

      } catch (error) {
        console.log(error);
      }
    },
    async sell(data) {
      try {
        this.error = await this.$store.dispatch("sellStock", data);
        document.location.reload(true);
      } catch (error) {
        console.log(error);
      }
    },
   fileChanged(event) {
     this.file = event.target.files[0]
   },
  }
}
</script>




<style scoped>
.header {
  display: flex;
}

.header a {
  padding-left: 50px;
  color: #222;
  font-size: 2em;
}

.header svg {
  margin-top: 12px;
}
</style>
