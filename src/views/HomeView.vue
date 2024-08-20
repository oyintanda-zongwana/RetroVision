<template>
  <div class="container">
    <div class="row">
      <h2 class="display-2 retro-logo">Retro Vision</h2>
    </div>
    <div class="row">
      <h2 class="display-4 retro-slogan">Where Every Game is a Classic.</h2>
    </div>
    <div class="row">
      <h4 class="display-6 retro-header">Recent products</h4>
    </div>
    <div class="row gap-2 justify-content-center" v-if="recentProducts">
      <Card v-for="product in recentProducts" :key="product.productID">
        <template #cardHeader>
          {{ product.productURL }}
          <img :src="product.prodURL" loading="lazy" class="img-fluid retro-img" :alt="product.prodName">
        </template>
        <template #cardBody>
          <h5 class="card-title retro-card-title">{{ product.prodName }}</h5>
          <p class="lead retro-card-description">{{ product.prodDescription }}</p>
          <p class="lead"><span class="text-success retro-amount">Amount</span>: R{{ product.amount }}</p>
        </template>
      </Card>
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import Spinner from '@/components/Spinner.vue'
export default {
  name: 'HomeView',
  components: {
    Card,
    Spinner
  },
  computed: {
    recentProducts() {
      return this.$store.state.recentProducts
    }
  },
  mounted() {
    this.$store.dispatch('recentProducts')
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInFromLeft {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideInFromRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes pulseShadow {
  0% { text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); }
  50% { text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.8); }
  100% { text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); }
}

.retro-logo {
  font-size: 3rem;
  color: #c44f4f; /* Retro red color */
  text-shadow: 2px 2px #000; 
  font-family: 'VT323', cursive; /* Gamer-style font */
  animation: fadeIn 2s ease-in-out, pulseShadow 2s infinite;
}

.retro-slogan {
  font-size: 1.5rem;
  color: #d2994e; /* Gray color for the slogan */
  text-shadow: 1px 1px #ddd; /* Slight shadow for emphasis */
  font-family: 'VT323', monospace; 
  animation: slideInFromLeft 1.5s ease-out;
}

.retro-header {
  color: #333; 
  font-family: 'VT323', monospace;
  animation: slideInFromRight 1.5s ease-out;
}

.retro-card-title {
  font-size: 1.25rem;
  color: #333;
}

.retro-card-description {
  color: #555;
}

.retro-amount {
  font-weight: bold;
}
</style>
