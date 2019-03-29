<template>
  <div id="content" class="container center">
    <div id="info" class="row">
      <div id="middle-line" class="col s6">
        <div class="card" id="card">
          <div class="card-image">
            <img :src="productPhoto">
          </div>
        </div>
      </div>
      <div class="col s6">
        <h4 id="product-name">{{ productName }}</h4>
        <div id="detail-box" class="row">
          <div id="inner-line" class="col s6">
            <h5 id="stock">{{ productStock }} in stock</h5>
          </div>
          <a href id="add-to-cart" @click.prevent="addToCart()">
            <div class="col s6">
              <h5 id="price">${{ productPrice }} add to cart</h5>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "product-detail",
  created() {
    console.log(this.$route.params);
    axios
      .get(`http://localhost:3000/products/find?id=${this.$route.params.id}`)
      .then(foundProduct => {
        this.productName = foundProduct.data.name;
        this.productPrice = foundProduct.data.price;
        this.productStock = foundProduct.data.stock;
        this.productPhoto = foundProduct.data.photo;
      })
      .catch(err => {
        console.log(err);
      });
  },

  data() {
    return {
      productName: "",
      productPrice: "",
      productStock: "",
      productPhoto: ""
    };
  },
  methods: {
    addToCart() {
      console.log("masok add to cart whoooi");
      if (localStorage.getItem("userId")) {
        axios
          .post(
            `http://localhost:3000/users/addToCart?id=${localStorage.getItem(
              "userId"
            )}`,
            {
              productId: this.$route.params.id
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(addedProduct => {
            this.$store.dispatch("notif", {
              type: "success",
              message: "Added Item to Your Cart.."
            });
            this.$router.push("/products");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$store.dispatch("notif", {
          type: "error",
          message: "You have to login duls"
        })
        this.$router.push("/login")
      }
    }
  }
};
</script>

<style>
#card {
  box-shadow: none !important;
  /* border: 1px black solid; */
}

#content {
  margin-top: 10rem;
}

#info {
  border: 1px black solid;
}

#middle-line {
  border-right: 1px solid black;
}

#inner-line {
  border-right: 1px solid black;
  /* height: 3rem; */
}

#product-name {
  margin-top: 12rem;
}

#detail-box {
  position: fixed;
  border-top: 1px solid black;
  /* margin-top: 3; */
  bottom: 14.2rem;
  width: 39.3rem;
}

#add-to-cart {
  color: black;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

#add-to-cart:hover {
  color: grey;
}
</style>
