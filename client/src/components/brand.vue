<template>
  <!-- <div class="container"> -->
  <!-- <div class="row left"> -->
  <!-- <div class="col s12 left"> -->
  <router-link to="/">
    <a href>
      <h2 id="vertical-text">Hype-Commerce</h2>
    </a>
  </router-link>
  <!-- </div> -->
  <!-- </div> -->
  <!-- </div> -->
</template>

<script>
export default {
  name: "brand"
};
</script>

<style scoped>
#vertical-text {
  transform: rotate(-90deg);
  transform-origin: left 0;
  margin-top: 35rem;
}
#vertical-text {
  float: left;
  position: fixed;
  /* left:0; */
  /* right: 91rem; */
}

h2 {
  left: 80px;
  color: black;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  font-weight: 500;
}

h2:hover {
  color: grey;
}
</style>
