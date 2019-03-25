<template>
  <div id="form" class="container center">
    <div class="row">
      <form class="col s6 offset-s3" @submit.prevent="addNewProduct">
        <h4 class>Add Product</h4>
        <div class="row">
          <div class="input-field col s12">
            <input id="input" type="text" class="validate" v-model="nameInput">
            <label for="input">product name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="input" type="number" step="50000" class="validate" v-model="priceInput">
            <label for="input">price</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="input" type="number" step="1" class="validate" v-model="stockInput">
            <label for="input">stock</label>
          </div>
        </div>
        <div class="row">
          <div class="file-field input-field s12">
            <div class="btn grey darken-1 btn-small">
              <span id="photoInput">Photo</span>
              <input type="file" @change="fileHandler" ref="file">
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text">
            </div>
          </div>
        </div>
        <div class="row">
          <button
            id="submit-button"
            class="waves-effect waves-light white grey-text text-darken-2 btn"
            type="submit"
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
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000
});

export default {
  data() {
    return {
      nameInput: "",
      priceInput: "",
      stockInput: "",
      fileInput: ""
    };
  },
  methods: {
    addNewProduct() {
      Toast.fire({
        text: "Adding new Product..."
      })


      console.log("adding new product....", this.fileInput);
      let dataFormat = new FormData();
      dataFormat.append("name", this.nameInput);
      dataFormat.append("price", this.priceInput);
      dataFormat.append("stock", this.stockInput);
      dataFormat.append("image", this.fileInput);
      console.log(dataFormat, "ini data format nyaaaaaaaa");

      axios
        .post("http://localhost:3000/products", dataFormat, {
          headers: {
            token: localStorage.getItem("token"),            
            "Content-Type": "multipart/form-data"
          }
        })
        .then(addedProduct => {
          console.log("===========new product added!===========");
          console.log("new Product Info: ", addedProduct);
          this.$store.dispatch("notif", {
            type: "success",
            message: "New Product Added Successfully."
          });
          this.$router.push("/products");
        })
        .catch(err => {
          console.log(err);
        });
    },
    fileHandler() {
      console.log("masok file handler", this.$refs.file.files[0]);
      this.fileInput = this.$refs.file.files[0];
    }
  }
};
</script>

<style scoped>
#form {
  margin-top: 2rem;
}

#submit-button {
  font-weight: lighter;
  width: 8rem;
}

#submit-button:hover {
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
