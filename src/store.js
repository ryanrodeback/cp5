import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    stocks: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setStocks(state, stocks) {
      state.stocks = stocks;
    }
  },
  actions: {
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getAllStocks(context) {
      try {
        let response = await axios.get("/api/stock");
        context.commit('setStocks', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async addStock(context, data) {
      console.log("addStock");
      try {
        await axios.post("/api/stock", data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async sellStock(context, data) {
      console.log("sellStock");
      try {
        await axios.delete("/api/stock/" + data._id);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },

  }
})