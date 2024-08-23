<template>
    <div class="container-fluid retro-container">
      <div class="row">
        <h2 class="display-2 retro-heading">Products</h2>
      </div>
      <div class="row gap-2 justify-content-center my-2" v-if="products">
        <Card v-for="product in products" :key="product.productID">
          <template #cardHeader>
            <img :src="product.prodUrl" loading="lazy" class="img-fluid retro-image" :alt="product.prodUrl">
          </template>
          <template #cardBody>
            <h5 class="card-title fw-bold retro-title">{{ product.prodName }}</h5>
            <p class="lead"><span class="text-dark fw-bold">Amount</span>: R{{ product.amount }}</p>
            <p class="lead"><span class="text-dark fw-bold">Quantity</span>: {{ product.quantity }}</p>
            <div class="button-wrapper d-md-flex d-block justify-content-between">
              <router-link :to="{ name: 'product', params: { id: product.prodID } }">
                <button class="btn retro-view-btn">View</button>
              </router-link>
              <button class="btn retro-cart-btn">Cart</button>
            </div>
          </template>
        </Card>
      </div>
      <div v-else>
        <Spinner />
      </div>
    </div>
  </template>
  
  <script setup>
  import { useStore } from 'vuex'
  import { computed, onMounted } from 'vue'
  import Spinner from '@/components/Spinner.vue'
  import Card from '@/components/Card.vue'
  const store = useStore()
  const products = computed(
    () => store.state.products
  )
  onMounted(() => {
    store.dispatch('fetchProducts')
  }) 
  </script>
  
  <style scoped>
  .retro-container {
    background-color: #001f3f; 
    color: #ffffff; 
    min-height: 100vh; 
    padding: 20px;
  }
  
  
  .retro-heading {
    font-size: 5.5em;
    font-family: 'VT323', monospace;
    margin: 0;
    color: #5690ca ; 
    text-shadow: 0 0 5px #001f3f, 0 0 10px #dae4ed; 
    animation: flicker 3.5s infinite; 
  }
  
  
 
  .retro-image {
    border: 2px solid #0074d9; 
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  
  .retro-title {
    color: #0d2d3a; 
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  }
  
  
  .retro-view-btn, .retro-cart-btn {
    background-color: #001f3f;
    color: #ffffff;
    border-radius: 5px;
    border: 2px solid #0074d9;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }
  
  .retro-view-btn:hover, .retro-cart-btn:hover {
    background-color: #0074d9;
    color: #ffffff;
    transform: scale(1.05);
  }
  </style>