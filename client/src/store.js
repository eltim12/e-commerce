import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import store from "./store";
import Swal from "sweetalert2";
import { userInfo } from "os";
import axios from "axios";

Vue.use(Vuex);

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000
});

export default new Vuex.Store({
  state: {
    isLogin: false,
    role: "",
    allProducts: [],
    productLoading: true,
    editProduct: {},
    userCart: [],
    username: "",
    totalPrice: 0
  },
  mutations: {
    setUserStatus(state, payload) {
      state.role = payload.role;
      state.isLogin = payload.status;
    },
    postProduct(state, payload) {
      state.allProducts = payload.productData.data.reverse();
      state.productLoading = false;
    },
    populateProductData(state, payload) {
      state.editProduct = payload.foundProduct.data;
    },
    getMyCart(state, payload) {
      state.userCart = payload.myCart;
      state.username = payload.username;
      state.totalPrice = payload.totalPrice;
    }
  },
  actions: {
    notif({ commit }, { type, message }) {
      Toast.fire({
        type: type,
        text: message
      });
    },

    loginStatus({ commit }, { role }) {
      commit("setUserStatus", {
        status: true,
        role
      });
    },
    logout({ commit }) {
      localStorage.clear();
      commit("setUserStatus", {
        status: false,
        role: ""
      });
    },
    getProducts({ commit }) {
      axios
        .get("http://localhost:3000/products/")
        .then(productData => {
          commit("postProduct", {
            productData
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    findProduct({ commit }, { productId, to }) {
      axios
        .get(`http://localhost:3000/products/find?id=${productId}`)
        .then(foundProduct => {
          commit("populateProductData", {
            foundProduct
          });
          if (to === "edit") {
            router.push("/editProduct");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getUserCart({ commit }, { userId }) {
      axios
        .get(`http://localhost:3000/users/find?id=${userId}`)
        .then(userData => {
          console.log("success get cart", userData.data.cart);
          let myCart = userData.data.cart;
          let username = userData.data.username;
          let totalPrice = 0;
          userData.data.cart.map(e => {
            console.log(e);
            totalPrice += Number(e.price);
          });

          commit("getMyCart", {
            myCart,
            username,
            totalPrice
          });
          router.push(`/myCart/${userId}`);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteProductFromCart({ commit }, { userId, productId }) {
      console.log(userId, "ini user id");
      console.log(productId, "ini product id");

      axios
        .put(
          `http://localhost:3000/users/deleteFromCart?id=${userId}`,
          {
            productId: productId
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(deleted => {
          console.log("success delete product =================");

          router.push(`/myCart/${userId}`);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
