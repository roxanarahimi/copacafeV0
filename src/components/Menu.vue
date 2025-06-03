<template>
  <div class="fixed-top  bg-white" style="box-shadow: 0 4px 4px 0 rgba(0,0,0,.03);">
    <nav class="navbar navbar-expand-lg pt-4">
      <div class="container-fluid">

        <div class="navbar-toggler border-0"  data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation" style="z-index: 1000; cursor: pointer">
          <i class="bi bi-list"></i>
        </div>
        <div class="collapse navbar-collapse pt-4" id="navbarScroll">
          <ul class="navbar-nav ms-auto mb-0 my-lg-0 navbar-nav-scroll">
            <li class="nav-item">
              <div class="nav-link" @click="scrollTo('home')">خانه</div>
            </li>
            <li class="nav-item">
              <div class="nav-link"  @click="scrollTo('products')">محصولات</div>
            </li>
          </ul>
          <div class="navbar-brand mx-0 text-center d-block d-none d-lg-inline-block cursor-pointer" @click="scrollTo('home')">
            <img src="/img/logo.png" class="mx-auto" width="150px" alt="">
          </div>
          <ul class="navbar-nav me-auto mb-0 my-lg-0 navbar-nav-scroll">
            <li class="nav-item">
              <div class="nav-link"  @click="scrollTo('about')" >درباره ما</div>
            </li>
            <li class="nav-item">
              <div class="nav-link"  @click="scrollTo('contact')">تماس با ما</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="navbar-brand m-0 text-center d-lg-none w-100 position-absolute top-0 right-0 pt-2 cursor-pointer" @click="scrollTo('home')">
        <img src="/img/logo.png" class="mx-auto" width="100px" alt="">
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Menu",
  setup(){
    const scrollTo = (id)=>{
      if(window.innerWidth<992){
        document.querySelector('.navbar-toggler').click()
      }
      document.querySelector('#'+id).scrollIntoView();
    }

    return{
      scrollTo,
    }
  }
}
</script>

<style scoped>
.nav-link{
  font-size: 16px;
  font-weight: bolder;
  padding-left: 30px !important;
  padding-right: 30px !important;
}
</style>