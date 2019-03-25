import Vue from "vue";
import Vuex from "vuex";
import Home from "@/containers/home.vue";
import Router from "vue-router";
import Login from "@/containers/Login.vue";
import Register from "@/containers/register.vue";
import Products from "@/containers/products.vue";
import AddProduct from "@/containers/addProduct.vue";
import EditProduct from "@/containers/EditProduct.vue";
import ProductDetail from "@/containers/ProductDetail.vue";
import Cart from "@/containers/Cart.vue"

Vue.use(Vuex);
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/product/:id",
      name: "product-detail",
      component: ProductDetail,
    },
    {
      path: "/products",
      name: "products",
      component: Products
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/addProduct",
      name: "add-product",
      component: AddProduct
    },
    {
      path: "/editProduct",
      name: "edit-product",
      component: EditProduct
    },
    {
      path: "/myCart/:id",
      name: "cart",
      component: Cart,
    }
  ]
});
