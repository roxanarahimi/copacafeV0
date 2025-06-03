<template>
  <div id="products" class=" scrollElement row px-0 mx-0 justify-content-center" style="padding-top: 70px">
    <div class="col-12 text-center mb-5" style="height: 106px">
      <div class="rounded-3 d-inline-block p-1 my-border">
        <h1 class="my-bg d-inline-block mx-auto p-4 rounded-3 mb-0">محصولات کوپاکافه</h1>
      </div>
    </div>
    <div class="col-lg-11 px-0 mx-0 align-self-start">
      <div class="row  px-0 mx-0 flex-row-reverse" style="min-height: 70vh">
        <div class="col-lg-7 px-2 px-lg-0 ">
          <div class="row px-0 mx-0 " v-if="productsCats">
            <div class="row px-0 mx-0 flex-row-reverse mb-5">
              <div class="col-lg-12 p-0 d-flex justify-content-between mb-4 px-lg-4 mb-lg-0">
                <div v-for="(item,index) in productsCats" :key="index" class="category my-border mx-1 mx-lg-0">
                  <div :id="'cat'+index" class="w-100 h-100 rounded category-inner" :title="item.title"
                       :class="{'category-active': index == 0} " @click="categoryToggle(item,index)">
                    <!--                    <i class="bi bi-cup-hot"></i>-->
                    {{ item.title }}
                  </div>
                </div>
              </div>
              <!--              <div class="col-lg-5 d-grid">-->
              <!--                <p class="align-self-end m-0 active-category">{{ categoryTitle }}</p>-->
              <!--              </div>-->
            </div>
          </div>
          <div class="products-container">
            <div v-if="products" class="px-0 mx-0 products-inner">
              <div v-for="(item,index) in products" :key="index" class="col-6 col-lg-4 px-1 px-lg-4  mb-4">
                <div class="card rounded-4 cursor-pointer product-card h-100" :id="'product'+index"
                     :class="{'product-active': index == 0}" @click="productToggle(item,index)">
                  <div class="card-body pt-lg-5">
                    <div class="product-card-img card-img mb-3">
                      <div class="img1">
                        <div v-show="!item.image1Loaded" class="w-100 position-relative">
                          <img src="/img/copacafe.png" class="w-100" alt="copacafe">
                          <img src="/img/loader.svg" class="w-100 loader">
                        </div>
                        <img :id="'product_'+item.id+'_image1'" class="img-fluid" alt=""
                             :src="url+item.thumb1"
                             v-show="item.image1Loaded && item.image1Loaded === true"
                             @load="onImageLoad(item,1)"
                             style="display: none;">
                      </div>
                      <div v-if="item.thumb2" class="img2 d-none">
                        <div v-show="!item.image2Loaded" class="w-100 position-relative">
                          <img src="/img/copacafe.png" class="w-100" alt="copacafe">
                          <img src="/img/loader.svg" class="w-100 loader">
                        </div>
                        <img :id="'product_'+item.id+'_image2'" class="img-fluid" alt=""
                             :src="url+item.thumb2"
                             v-show="item.image2Loaded && item.image2Loaded === true"
                             @load="onImageLoad(item,2)"
                             style="display: none;">
                      </div>
                      <!--                      <img v-if="item.image2" :src="url+item.image2" class="img2 img-fluid d-none" alt="">-->

                    </div>
                    <div class="card-title  fill-grid">
                      <p class="mb-lg-2 align-self-start">{{ item.title }}</p>
                      <small class="align-self-end">{{ item.subTitle }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5">
          <div v-if="product" class="card border-0 rounded-4  mt-lg-5 pt-lg-4">
            <div class="card-body text-center">
              <div class="card-img text-center ">
                <!--                <img id="active-product-img" :src="url+product.image1" class="img-fluid" alt="">-->
                <div class="text-center">
                  <div v-show="!activePImage1Loaded" class="w-100 position-relative">
                    <img src="/img/copacafe.png" class="w-100" alt="copacafe">
                    <img src="/img/loader.svg" class="w-100 loader">
                  </div>
                  <img id="active-product-img" class="img-fluid" alt=""
                       :src="url+product.image1"
                       v-show="activePImage1Loaded"
                       @load="activePImage1Loaded=true"
                       style="display: none;">
                </div>
              </div>
              <div class="d-flex justify-content-center mb-3">
                <div id="active-product-img-1" class="card mx-2 cursor-pointer active-product-img-active p-1 "
                     @click="activeProductImgToggle(1)" style="width: 100px">
                  <div class="card-img">
                    <img :src="url+product.thumb1" class="w-100" alt="">
                  </div>
                </div>
                <div v-if="product.thumb2" id="active-product-img-2" class="card mx-2 cursor-pointer p-1"
                     @click="activeProductImgToggle(2)" style="width: 100px">
                  <div class="card-img">
                    <img :src="url+product.thumb2" class="w-100" alt="">
                  </div>
                </div>
              </div>
              <div class="card-title text-start mx-auto" style="max-width: fit-content">
                <h3>{{ product.title }}</h3>
                <h5>{{ product.subTitle }}</h5>
                <p>
                  {{ product.text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed, onBeforeMount, onMounted, ref} from "vue";

export default {
  name: "Products",
  setup() {
    const store = useStore();
    const url = store.state.panelUrl;
    const productsCats = computed(() => store.state.productsCats);
    const products = ref([]);
    const product = ref({});
    const activePImage1Loaded = ref(false);


    const getCategories = async () => {
      try {
        await store.dispatch('getProductCats');
        console.log(productsCats.value)
        if (productsCats.value && productsCats.value.length > 0) {
          products.value = productsCats.value[0].products;
          product.value = productsCats.value[0].products[0];
          // preload();
        } else {
          throw new Error('No categories found');
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    onMounted(() => {
      getCategories();
    });
    const categoryToggle = (category, index) => {
      products.value = null;
      document.querySelector('.category-active')?.classList.remove('category-active');
      document.querySelector('#cat' + index)?.classList.add('category-active');
      products.value = category.products;
      if (category.products.length) {
        setTimeout(() => {
          productToggle(category.products[0], 0);
        }, 300)
      } else {
        product.value = null;
      }

    }
    const productToggle = (item, index) => {
      activePImage1Loaded.value = false;
      document.querySelector('.product-active')?.classList.remove('product-active');
      document.querySelector('#product' + index)?.classList.add('product-active');
      product.value = item;
      activeProductImgToggle(1)
    }
    const activeProductImgToggle = (index) => {
      document.querySelector('.active-product-img-active ')?.classList.remove('active-product-img-active');
      document.querySelector('#active-product-img-' + index)?.classList.add('active-product-img-active');
      if (product.value !== null) {
        document.querySelector('#active-product-img')?.setAttribute('src', url + product.value['image' + index]);
      }
    }

    const onImageLoad = (product, i) => {
      if (i == 1) {
        product.image1Loaded = true;
        // product.image2Loaded = false;
      } else {
        if (product.image2)
          product.image2Loaded = true;
        // product.image1Loaded = false;
      }


    }
    const preload = () => {
      for (let i = 1; i < productsCats.value.length; i++) {
        productsCats.value[i].products.forEach(p => {
          const thmb = new Image();
          thmb.src = url + p.thumb1;
          if (p.image2) {
            const thmb2 = new Image();
            thmb2.src = url + p.thumb2;
          }
        });
      }
      for (let i = 1; i < productsCats.value.length; i++) {
        productsCats.value[i].products.forEach(p => {
          const img = new Image();
          img.src = url + p.image1;
          if (p.image2) {
            const img2 = new Image();
            img2.src = url + p.image2;
          }
        });
      }
    }
    return {
      products, productsCats, getCategories, store, url,
      categoryToggle, productToggle, product, activeProductImgToggle,
      onImageLoad, activePImage1Loaded, preload
    }
  }
}
</script>

<style scoped>
.product-card-img:hover .img1 {
  display: none !important;
}

.product-card-img:hover .img2 {
  display: block !important;
}
</style>