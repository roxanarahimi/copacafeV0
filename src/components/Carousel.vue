<template>
  <div id="carousel" class="scrollElement">
    <div id="slider" class="carousel carousel-dark slide h-100"  data-bs-ride="carousel" data-bs-pause="false">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#slider" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#slider" data-bs-slide-to="1" aria-label="Slide 2"></button>
      </div>
      <div class="carousel-inner h-100">
   <div v-for="(item,index) in info" :key="index" class="carousel-item h-100" :class="{'active':index==0}" data-bs-interval="3000"  >
          <div class="row d-none d-lg-flex flex-row-reverse h-100">
            <div class="col-lg-8 h-100 d-grid pe-4">
              <img :src="item.image" class="img-fluid d-block align-self-end me-auto pe-lg-4" alt="">
            </div>
            <div class="col-lg-4 d-grid ps-4 slide-txt-lg">
              <div class="align-self-center text-light pb-5 fw-bolder mt-4">
                <p class="ps-4" style="font-size: 55px">{{ item.caption }}</p>
                <p class="ps-4"  style="font-size: 45px">{{ item.txt }}</p>
              </div>

            </div>
          </div>
          <div class="row align-self-center d-lg-none h-100 p-2 slide-txt-sm">
            <div class="col-12 d-grid px-3">
              <img :src="item.image" class="img-fluid align-self-center">
            </div>
            <div class="col-12 d-grid px-4">
              <div class="carousel-text text-center align-self-end text-light  fw-bolder mt-4 mb-5 pb-5" >
                <p style="font-size: 45px">{{ item.caption }}</p>
                <p style="font-size:40px">{{ item.txt }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#slider" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#slider" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  setup() {
    const info = [
      { image: '/img/slide1.png', caption:'کوپاکافه',txt:'طعم واقعی قهوه'},
      { image: '/img/slide2.png', caption:'کوپاکافه',txt:'تنوع و کیفیت'},
    ];

    return {
      info
    }
  }
}
</script>

<style scoped>
.carousel-control-prev, .carousel-control-next{
  width:25px !important;
  margin: 5px !important;
}
.carousel-control-next-icon, .carousel-control-prev-icon{
  filter: invert(0.5) grayscale(100) !important;
}
.carousel-dark .carousel-indicators [data-bs-target] {
   background-color: rgba(0, 0, 0, 0.15) !important;
}

</style>