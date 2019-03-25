<template>
  <div id="form" class="container center">
    <div class="row">
      <form class="col s6 offset-s3" @submit.prevent="submitLogin">
        <h4 class>Login</h4>
        <div class="row">
          <div class="input-field col s12">
            <input id="input" type="email" class="validate" v-model="emailInput">
            <label for="email_inline">Email</label>
            <span class="helper-text" data-error="wrong email format" data-success="right"></span>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="input" type="password" class="validate" v-model="passwordInput">
            <label for="password">Password</label>
          </div>
        </div>
        <div class="row">
          <button
            id="login-button"
            class="waves-effect waves-light white grey-text text-darken-2 btn"
            type="submit"
          >
            <span>Login</span>
          </button>
        </div>
        <div class="row">
          <router-link to="/register">
            <button
              id="register-button"
              class="waves-effect waves-light white grey-text text-darken-2 btn"
            >
              <span>Register</span>
            </button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import alertify from "alertifyjs";

const url = "http://localhost:3000";

export default {
  name: "login-form",
  data() {
    return {
      emailInput: "",
      passwordInput: ""
    };
  },
  methods: {
    submitLogin() {
      axios
        .post(`${url}/users/login`, {
          email: this.emailInput,
          password: this.passwordInput
        })
        .then(loggedIn => {
          console.log("login sukses", loggedIn.data.role);
          console.log(loggedIn.data);
          localStorage.setItem("token", loggedIn.data.token);
          localStorage.setItem("userId", loggedIn.data.userId);
          localStorage.setItem("role", loggedIn.data.role);

          this.$store.dispatch("notif", {
            type: "success",
            message: "Logged in Successfully"
          });

          this.$store.dispatch("loginStatus", {
            role: loggedIn.data.role
          });

          this.$router.push("/products");
        })
        .catch(err => {
          this.$store.dispatch("notif", {
            type: "error",
            message: "email/password wrong."
          });
        });
    }
  }
};
</script>

<style scoped>
#form {
  margin-top: 9rem;
}

#login-button {
  font-weight: lighter;
  width: 8rem;
}

#login-button:hover {
  width: 10rem;
}

#register-button {
  font-weight: lighter;
  width: 8rem;
}

#register-button:hover {
  width: 10rem;
}

#input:focus {
  border-bottom: 1px solid #000000;
  box-shadow: 0 1px 0 0 #000000;
}

#input:focus + label {
  color: #000000;
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
</style>
