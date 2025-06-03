<template>
  <div class="container-fluid px-0">
    <the-menu/>
    <the-carousel />
    <products/>
    <coffee />
    <about/>
    <the-footer />
  </div>
</template>

<script>
// @ is an alias to /src
import TheMenu from '@/components/Menu.vue'
import TheCarousel from '@/components/Carousel.vue'
import Products from '@/components/Products.vue'
import Coffee from '@/components/Coffee.vue'
import About from '@/components/About.vue'
import TheFooter from '@/components/Footer.vue'

export default {
  name: 'HomeView',
  components: {
    TheMenu, TheCarousel, Products, Coffee, About, TheFooter
  }
}
</script>
