<template>
  <div id="navbar" class="container center">
    <div id="navbar-content" class="row">
      <div class="col s1">
        <router-link to="/products" class="black-text">
          <span>Shop</span>
        </router-link>
      </div>
      <div class="col s2" v-if="role === 'user' && isLogin === true">
        <router-link :to="'/myCart/' +userId" href class="black-text">
          <span>My cart</span>
        </router-link>
      </div>
      <div class="col s2" v-if="role === 'admin' && isLogin === true">
        <router-link class="black-text" to="/addProduct">
          <span>Add Product</span>
        </router-link>
      </div>
      <div class="class col s1 right">
        <a href>
          <i id="search" class="material-icons black-text">search</i>
        </a>
      </div>
      <div class="col s1 right" v-if="isLogin === false">
        <router-link class="black-text" to="/login">
          <span>Login</span>
        </router-link>
      </div>
      <div class="col s1 right" v-if="isLogin === true">
        <a href="#" class="black-text" @click.prevent="logout">
          <span>Logout</span>
        </a>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  name: "navbar",
  computed: mapState(["isLogin", "role"]),
  created() {
    this.userId = localStorage.getItem("userId")
  },
  data() {
    return {
      navbarData: "ini navbar",
      userId: ''
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("notif", {
        type: "success",
        message: "You Have Successfully Logged Out"
      })
      this.$store.dispatch("logout")
      this.$router.push('/')
    }
  }
};
</script>


<style scoped>
#navbar {
  margin-top: 3rem;
  /* margin-left: 20rem; */
  /* position: fixed; */
}

#navbar-content {
}

#search {
  margin-top: 7px;
}

span {
  font-size: 1.5rem;
  /* font-weight: 700; */
}

span {
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

span:hover {
  color: grey;
}

i {
  font-weight: 3px;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

i:hover {
  color: grey;
}
</style>


