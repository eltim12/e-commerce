<template>
  <div class="container center">
    <div id="welcome" class="dashed-shadow dashed-shadow-text">
      <span class="shadow">Under Retail</span>
    </div>
    <div id="shopnow-button">
      <router-link to="/products" href>
        <h4 id="shopnow-text">SHOP NOW</h4>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
span {
  font-weight: bold;
}

#welcome {
  margin-top: 13rem;
}

body {
  font-family: "Open Sans Condensed", sans-serif;
  font-size: 85pt;
  background-color: #000000;
  text-align: center;
  line-height: 1.2em;
  padding-top: 70px;
}

.dashed-shadow {
  position: relative;
  top: 8px;
  left: 8px;
  display: inline-block;
  color: rgb(184, 184, 184);
}

@keyframes dash-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}
.dashed-shadow:before {
  content: " ";
  display: block;
  position: absolute;
  top: -8px;
  left: -8px;
  bottom: -2px;
  right: -2px;
  z-index: 1;
  background-size: 100%;
  background-image: -moz-linear-gradient(
    45deg,
    white 12.5%,
    rgba(232, 227, 199, 0) 12.5%,
    rgba(232, 227, 199, 0) 37.5%,
    white 37.5%,
    white 62.5%,
    rgba(232, 227, 199, 0) 62.5%,
    rgba(232, 227, 199, 0) 87.5%,
    white 87.5%
  );
  background-image: -webkit-linear-gradient(
    45deg,
    white 12.5%,
    rgba(232, 227, 199, 0) 12.5%,
    rgba(232, 227, 199, 0) 37.5%,
    white 37.5%,
    white 62.5%,
    rgba(232, 227, 199, 0) 62.5%,
    rgba(232, 227, 199, 0) 87.5%,
    white 87.5%
  );
  background-image: linear-gradient(
    45deg,
    white 12.5%,
    rgba(232, 227, 199, 0) 12.5%,
    rgba(232, 227, 199, 0) 37.5%,
    white 37.5%,
    white 62.5%,
    rgba(232, 227, 199, 0) 62.5%,
    rgba(232, 227, 199, 0) 87.5%,
    white 87.5%
  );
  background-size: 6px 6px;
}

.dashed-shadow:hover:before {
  animation: dash-animation 30s infinite linear;
}

.dashed-shadow:after {
  z-index: 2;
  content: attr(data-text);
  position: absolute;
  left: -8px;
  top: -8px;
  color: #b85b3f;
  text-shadow: 3px 3px white;
}

.hello {
  font-family: "Cookie", cursive;
  font-size: 140pt;
}

.sorta-block {
  font-size: 50pt;
  line-height: 1.1em;
  -moz-transform: skew(0, -5deg);
  -ms-transform: skew(0, -5deg);
  -webkit-transform: skew(0, -5deg);
  transform: skew(0, -5deg);
  z-index: 3;
  position: relative;
  margin-top: 20px;
  margin-bottom: 10px;
}

.sorta {
  border-top: 4px solid #b85b3f;
  border-bottom: 4px solid #b85b3f;
  text-transform: uppercase;
  z-index: 3;
  font-style: italic;
}

.hipsterish {
  font-family: "Sancreek", cursive;
  font-size: 70pt;
}

.dashed-shadow-text {
  font-size: 140pt;
  line-height: 0.7em;
}

.shadow {
  font-size: 120pt;
  line-height: 0.8em;
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
    width: 30rem;
    margin-top: 5rem;
    margin-bottom: 10rem;
    margin-left: 25.5rem;

    -moz-transition: all 0.2s ease-in;
    -o-transition: all 0.2s ease-in;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
}

#shopnow-button:hover {
    background-color: black;
}
</style>
