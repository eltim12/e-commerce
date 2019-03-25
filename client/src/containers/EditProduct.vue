<template>
  <div id="form" class="container center">
    <div class="row">
      <form class="col s6 offset-s3" @submit.prevent="editProduct">
        <h4 class>Edit Product</h4>
        <div class="row">
          <div class="input-field col s12">
            <input id="input" type="text" class="validate" v-model="editData.name">
            <label for="input" class="active">product name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="input" type="number" step="50000" class="validate" v-model="editData.price">
            <label for="input" class="active">price</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="input" type="number" step="1" class="validate" v-model="editData.stock">
            <label for="input" class="active">stock</label>
          </div>
        </div>
        <div class="row">
          <div class="container center">
            <div class="input-field col s6">
              <img id="img" class width="250" height="200" :src="editData.photo">
            </div>
            <div class="file-field input-field col s6 ">
              <div id="change-button" class="btn grey darken-1 btn-small">
                <span id="photoInput">change photo</span>
                <input type="file" @change="fileHandler" ref="file">
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <button
            id="submit-button"
            class="waves-effect waves-light white grey-text text-darken-2 btn"
            type="submit"
          >
            <span>Confirm</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000
});

export default {
  computed: {
    editData() {
      this.productId = this.$store.state.editProduct._id;
      this.nameInput = this.$store.state.editProduct.name;
      this.priceInput = this.$store.state.editProduct.price;
      this.stockInput = this.$store.state.editProduct.stock;
      this.currentFile = this.$store.state.editProduct.photo;

      return this.$store.state.editProduct;
    }
  },
  data() {
    return {
      productId: "",
      nameInput: "",
      priceInput: "",
      stockInput: "",
      currentFile: "",
      newFileInput: ""
    };
  },
  methods: {
    fileHandler() {
      console.log("masok file handler", this.$refs.file.files[0]);
      this.newFileInput = this.$refs.file.files[0];
    },
    editProduct() {
      Toast.fire({
        text: "Editing your Product..."
      })

      console.log("masok edit product", this.nameInput);
      let dataFormat = new FormData();

      if (this.newFileInput !== '') {
        dataFormat.append("name", this.nameInput);
        dataFormat.append("price", this.priceInput);
        dataFormat.append("stock", this.stockInput);
        dataFormat.append("image", this.newFileInput);
      } else {
        dataFormat.append("name", this.nameInput);
        dataFormat.append("price", this.priceInput);
        dataFormat.append("stock", this.stockInput);
      }

      axios
        .put(
          `http://localhost:3000/products?id=${this.productId}`,
          dataFormat,
          {
            headers: {
              token: localStorage.getItem("token"),
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(editedProduct => {
          this.$store.dispatch("notif", {
            type: "success",
            message: "Product Edited Successfully."
          });
          console.log("success updated product");
          this.$router.push("/products");
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

#img {
  margin-right: 3rem; 
}

#change-button {
  margin-top: 6rem;
  margin-left: 3rem;
  /* padding: 3rem 0; */
}
</style>
