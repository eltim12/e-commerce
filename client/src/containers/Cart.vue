<template>
  <div class="container center">
    <div id="empty-cart" v-if="userCart.length === 0">
        <h3>Your cart is currently empty.</h3>
    <div id="shopnow-button">
        <router-link to="/products" href>
            <h4 id="shopnow-text">SHOP NOW</h4>
        </router-link>
    </div>
    </div>
    <div v-else>
        <h1>{{ username }}'s cart</h1>
        <table>
        <thead>
            <tr>
            <th>Detail</th>
            <th>Name</th>
            <th>Price</th>
            <th></th>
            </tr>
        </thead>

        <tbody v-for="product in userCart" :key="product._id">
            <tr>
            <td>
                <img :src="product.photo" width="140px" height="100px" alt>
            </td>
            <td>
                <h5>{{ product.name }}</h5>
            </td>
            <td>
                <h5>${{ product.price }}</h5>
            </td>
            <td class="center">
                <div id="cancel-button">
                <a id="cancel" href @click.prevent="cancelProduct(product._id)">
                    <h5>cancel</h5>
                </a>
                </div>
            </td>
            </tr>
        </tbody>
        <tr id="last-row">
            <td>
            <th id="total"> Total</th>
            </td>
            <td> </td>

            <td class="">
                <h5 id="total">
                $ {{ totalPrice }}
                </h5>
            </td>
            <td> </td>
        </tr>
        </table>
        <div id="checkout-button">
            <a href="" @click.prevent="checkout">
                <h4 id="checkout-text">CHECKOUT</h4>
            </a>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "cart",
  computed: mapState(["userCart", "username", "totalPrice"]),
  created() {
    console.log("masok created!");
    this.myCart = []
    this.$store.dispatch("getUserCart", {
        userId: localStorage.getItem("userId")
    })
  },
  methods: {
      cancelProduct(productId) {
          console.log(productId, 'masok cancel productsssssss')
           console.log(localStorage.getItem("token"))
        axios
        .put(`http://localhost:3000/users/deleteFromCart?id=${localStorage.getItem("userId")}`, 
          {  
            productId
          }, {
              headers: {
              token: localStorage.getItem("token")
              }
          
        })
        .then(deleted => {
          console.log("success delete product =================");
            this.$store.dispatch("getUserCart", {
                userId: localStorage.getItem("userId")
            })
        })
        .catch(err => {
          console.log(err);
        });
      },
      checkout() {
          axios 
            .delete(`http://localhost:3000/users/checkout?id=${localStorage.getItem("userId")}`,{
                headers: {
                  token: localStorage.getItem("token")
                }
            })
            .then(checkedout => {
                console.log('successfully checked out')
                this.$store.dispatch("notif",{
                    type: "success",
                    message: `Thank you for purchasing, you paid $${this.totalPrice}`
                })
                this.$store.dispatch("getUserCart", {
                    userId: localStorage.getItem("userId")
                })
                // this.$router.push(`/myCart/${localStorage.getItem("userId")}`)
            })  
            .catch(err => {
                console.log(err)
            })
      }
  },
};
</script>

<style scoped>
h5 {
  font-size: 1.3rem;
}

#cancel-button {
  border: 1px black solid;
  ransition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.4s ease-in;
}

#cancel-button:hover {
  background-color: rgb(206, 0, 0);
  color: white;
}

#cancel {
  color: black;
  font-weight: 3px;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

#cancel:hover {
  color: white;
}

#total {
    font-size: 1.5rem;
    font-weight: bold;
}

#last-row {
    background-color: rgb(241, 241, 241);
}

#checkout {
    border: black solid 1px;
    width: 30rem;
}

#checkout-text {
    color: black;
    -moz-transition: all 0.2s ease-in;
    -o-transition: all 0.2s ease-in;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
}

#checkout-text:hover {
    color: white;
}


#checkout-button {
    border: black solid 1px;
    width: 30rem;
    margin-top: 5rem;
    margin-bottom: 10rem;
    margin-left: 25.5rem;

    -moz-transition: all 0.2s ease-in;
    -o-transition: all 0.2s ease-in;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
}

#checkout-button:hover {
    background-color: black;
}


#shopnow-text {
    color: black;
    
    -moz-transition: all 0.2s ease-in;
    -o-transition: all 0.2s ease-in;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
}

#shopnow-text:hover {
    color: white;
}


#shopnow-button {
    border: black solid 1px;
    width: 20rem;
    /* margin-top: 5rem; */
    margin-bottom: 10rem;
    margin-left: 31.2rem;

    -moz-transition: all 0.2s ease-in;
    -o-transition: all 0.2s ease-in;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
}

#shopnow-button:hover {
    background-color: black;
}

#empty-cart {
    margin-top: 15rem;
}

</style>
