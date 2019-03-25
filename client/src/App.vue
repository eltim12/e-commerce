<template>
  <div id="app">
    <navbar></navbar>
    <brand></brand>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/navbar.vue';
import Brand from '@/components/brand.vue';

export default {
  components: {
    navbar: Navbar,
    brand: Brand,
  },
  name: 'app',
};
</script>
