<template>
  <div id="form" class="container center">
    <div class="row">
      <form class="col s6 offset-s3" @submit.prevent="register()">
        <h4 class>Register</h4>
        <div class="row">
          <div class="input-field col s12">
            <input id="input-username" type="text" class="validate" v-model="username">
            <label for="username">Username</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="input-email" type="email" class="validate" v-model="email">
            <label for="email_inline">Email</label>
            <span class="helper-text" data-error="wrong email format" data-success="right"></span>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="input-password" type="password" class="validate" v-model="password">
            <label for="password">Password</label>
          </div>
        </div>
        <div class="row">
          <button
            id="submit-button"
            type="submit"
            class="waves-effect waves-light white grey-text text-darken-2 btn"
          >
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "regisrer",
  data() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      console.log("masok register pakkkkkkkkk");
      axios
        .post("http://localhost:3000/users/register", {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(createdUser => {
          console.log("success created new user");
          // console.log(createdUser);
          this.$store.dispatch("notif", {
            type: "success",
            message: "register success"
          });
          this.$router.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
#form {
  margin-top: 5rem;
}

#submit-button {
  font-weight: lighter;
  width: 8rem;
}

#submit-button:hover {
  width: 10rem;
}

#input-username:focus {
  border-bottom: 1px solid #000000;
  box-shadow: 0 1px 0 0 #000000;
}

#input-username:focus + label {
  color: #000000;
}

#input-email:focus {
  border-bottom: 1px solid #000000;
  box-shadow: 0 1px 0 0 #000000;
}

#input-email:focus + label {
  color: #000000;
}

#input-password:focus {
  border-bottom: 1px solid #000000;
  box-shadow: 0 1px 0 0 #000000;
}

#input-password:focus + label {
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
