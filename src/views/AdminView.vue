<template>
  <div class="admin-page">
    <h1>Admin</h1>
    <button @click="openAddProductModal">Add Product</button>

    <div class="search-filter">
      <input v-model="searchQuery" placeholder="Search by name" />
      <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
      <select v-model="priceSortOrder">
        <option value="">Sort by Price</option>
        <option value="asc">Lowest to Highest</option>
        <option value="desc">Highest to Lowest</option>
      </select>
    </div>

    <div v-if="loading" class="loading">Loading...</div>
    <table v-else>
      <thead>
        <tr>
          <th @click="sortBy('prodID')">ID</th>
          <th @click="sortBy('prodName')">Name</th>
          <th @click="sortBy('quantity')">Quantity</th>
          <th @click="sortBy('amount')">Amount</th>
          <th @click="sortBy('Category')">Category</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in sortedFilteredProducts" :key="product.prodID">
          <td>{{ product.prodID }}</td>
          <td>{{ product.prodName }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.amount }}</td>
          <td>{{ product.Category }}</td>
          <td><img :src="product.prodUrl" alt="" width="50"></td>
          <td>
            <button @click="editProduct(product)">Update</button>
            <button @click="handleDeleteProduct(product.prodID)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <AppModal v-if="showAddProductModal || showEditProductModal">
      <template #header>
        <h2>{{ isEditing ? 'Update Product' : 'Add Product' }}</h2>
      </template>
      <template #body>
        <form @submit.prevent="isEditing ? handleUpdateProduct() : handleAddProduct()">
          <div class="form-group">
            <label for="prodName">Name:</label>
            <input type="text" v-model="form.prodName" required>
          </div>
          <div class="form-group">
            <label for="quantity">Quantity:</label>
            <input type="number" v-model="form.quantity" required>
          </div>
          <div class="form-group">
            <label for="amount">Amount:</label>
            <input type="text" v-model="form.amount" required>
          </div>
          <div class="form-group">
            <label for="category">Category:</label>
            <input type="text" v-model="form.Category" required>
          </div>
          <div class="form-group">
            <label for="prodUrl">Image URL:</label>
            <input type="text" v-model="form.prodUrl" required>
          </div>
          <div class="modal-actions">
            <button type="submit">{{ isEditing ? 'Update' : 'Add' }}</button>
            <button type="button" @click="closeModal">Cancel</button>
          </div>
        </form>
      </template>
    </AppModal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AppModal from '@/components/AppModal.vue'

export default {
  components: { AppModal },
  data() {
    return {
      form: {
        prodID: null,
        prodName: '',
        quantity: '',
        amount: '',
        Category: '',
        prodUrl: ''
      },
      showAddProductModal: false,
      showEditProductModal: false,
      isEditing: false,
      searchQuery: '',
      selectedCategory: '',
      priceSortOrder: ''
    }
  },
  computed: {
    ...mapState(['products', 'loading', 'categories']),
    sortedFilteredProducts() {
      let filtered = this.products.filter(product => {
        return (
          (this.selectedCategory === '' || product.Category === this.selectedCategory) &&
          product.prodName.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      })

      if (this.priceSortOrder) {
        filtered.sort((a, b) => {
          const aPrice = parseFloat(a.amount)
          const bPrice = parseFloat(b.amount)
          return this.priceSortOrder === 'asc' ? aPrice - bPrice : bPrice - aPrice
        })
      } else {
        filtered.sort((a, b) => {
          if (a.prodName < b.prodName) return -1
          if (a.prodName > b.prodName) return 1
          return 0
        })
      }

      return filtered
    }
  },
  methods: {
    ...mapActions(['fetchProducts', 'addProduct', 'updateProduct', 'deleteProduct']),
    openAddProductModal() {
      this.form = {
        prodID: null,
        prodName: '',
        quantity: '',
        amount: '',
        Category: '',
        prodUrl: ''
      }
      this.showAddProductModal = true
      this.isEditing = false
    },
    editProduct(product) {
      this.form = { ...product }
      this.showEditProductModal = true
      this.isEditing = true
    },
    closeModal() {
      this.showAddProductModal = false
      this.showEditProductModal = false
    },
    async handleAddProduct() {
      if (this.isFormValid()) {
        await this.addProduct(this.form)
        this.closeModal()
      }
    },
    async handleUpdateProduct() {
      if (this.isFormValid()) {
        await this.updateProduct(this.form)
        this.closeModal()
      }
    },
    async handleDeleteProduct(id) {
      if (confirm('Are you sure you want to delete this product?')) {
        await this.deleteProduct(id)
      }
    },
    isFormValid() {
      return this.form.prodName && this.form.quantity && this.form.amount && this.form.Category && this.form.prodUrl
    }
  },
  mounted() {
    this.fetchProducts()
  }
}
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid #ddd;
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  cursor: pointer;
}

button {
  margin: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: black;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: grey;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input[type="text"], input[type="number"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
