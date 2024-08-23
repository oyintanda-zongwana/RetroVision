<template>
    <div class="admin-page">
      <h1>Products Management</h1>
      <button @click="openAddProductModal">Add Product</button>
      
      
      <div class="search-filter">
        <input v-model="searchQuery" placeholder="Search by name" @input="searchProducts">
        <select v-model="selectedCategory" @change="filterProducts">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
        <select v-model="priceSortOrder" @change="sortProducts('amount')">
          <option value="">Sort by Price</option>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
      </div>
  
      
      <div v-if="loading" class="loading">Loading...</div>
      <table v-else>
        <thead>
          <tr>
            <th @click="sortProducts('prodID')">ID</th>
            <th @click="sortProducts('prodName')">Name</th>
            <th @click="sortProducts('quantity')">Quantity</th>
            <th @click="sortProducts('amount')">Amount</th>
            <th @click="sortProducts('Category')">Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.prodID">
            <td>{{ product.prodID }}</td>
            <td>{{ product.prodName }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.amount }}</td>
            <td>{{ product.Category }}</td>
            <td><img :src="product.prodUrl" alt="" width="50"></td>
            <td>
              <button @click="viewProduct(product)">View</button>
              <button @click="editProduct(product)">Edit</button>
              <button @click="deleteProduct(product.prodID)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      
      <AppModal v-if="showAddProductModal || showEditProductModal">
        <template #header>
          <h2>{{ isEditing ? 'Edit Product' : 'Add Product' }}</h2>
        </template>
        <template #body>
          <form @submit.prevent="isEditing ? updateProduct() : addProduct()">
            <div>
              <label for="prodName">Name:</label>
              <input type="text" v-model="form.prodName" required>
            </div>
            <div>
              <label for="quantity">Quantity:</label>
              <input type="number" v-model="form.quantity" required>
            </div>
            <div>
              <label for="amount">Amount:</label>
              <input type="text" v-model="form.amount" required>
            </div>
            <div>
              <label for="category">Category:</label>
              <input type="text" v-model="form.Category" required>
            </div>
            <div>
              <label for="prodUrl">Image URL:</label>
              <input type="text" v-model="form.prodUrl" required>
            </div>
            <button type="submit">{{ isEditing ? 'Update' : 'Add' }}</button>
            <button type="button" @click="closeModal">Cancel</button>
          </form>
        </template>
      </AppModal>
  
    
      <AppModal v-if="showViewProductModal">
        <template #header>
          <h2>Product Details</h2>
        </template>
        <template #body>
          <div v-if="selectedProduct">
            <p>ID: {{ selectedProduct.prodID }}</p>
            <p>Name: {{ selectedProduct.prodName }}</p>
            <p>Quantity: {{ selectedProduct.quantity }}</p>
            <p>Amount: {{ selectedProduct.amount }}</p>
            <p>Category: {{ selectedProduct.Category }}</p>
            <p>Image URL: <img :src="selectedProduct.prodUrl" alt="" width="100"></p>
            <button @click="closeViewProductModal">Close</button>
          </div>
        </template>
      </AppModal>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import { toast } from 'vue3-toastify'
  import 'vue3-toastify/dist/index.css'
  import AppModal from '@/components/AppModal.vue'
  
  export default {
    components: { AppModal },
    data() {
      return {
        products: [],
        filteredProducts: [],
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
        showViewProductModal: false,
        isEditing: false,
        loading: false,
        searchQuery: '',
        selectedCategory: '',
        priceSortOrder: '',
        categories: [],
        selectedProduct: null
      }
    },
    methods: {
      async fetchProducts() {
        this.loading = true
        try {
          const response = await axios.get('https://retrovision-2.onrender.com/products')
          this.products = response.data.results
          this.filteredProducts = this.products
          this.categories = [...new Set(this.products.map(p => p.Category))]
        } catch (e) {
          toast.error(`Failed to fetch products: ${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        } finally {
          this.loading = false
        }
      },
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
      async viewProduct(product) {
        this.selectedProduct = product
        this.showViewProductModal = true
      },
      closeViewProductModal() {
        this.showViewProductModal = false
        this.selectedProduct = null
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
      async addProduct() {
        if (!this.isFormValid()) {
          toast.error('Please fill in all fields', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
          return
        }
  
        try {
          const { msg } = await axios.post('https://retrovision-2.onrender.com/product/add', this.form)
          toast.success(msg, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
          this.fetchProducts()
          this.closeModal()
        } catch (e) {
          toast.error(`Failed to add product: ${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },
      async updateProduct() {
        if (!this.isFormValid()) {
          toast.error('Please fill in all fields', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
          return
        }
  
        try {
          const { msg } = await axios.patch(`https://retrovision-2.onrender.com/product/${this.form.prodID}`, this.form)
          toast.success(msg, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
          this.fetchProducts()
          this.closeModal()
        } catch (e) {
          toast.error(`Failed to update product: ${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },
      async deleteProduct(id) {
        try {
          const { msg } = await axios.delete(`https://retrovision-2.onrender.com/product/${id}`)
          toast.success(msg, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
          this.fetchProducts()
        } catch (e) {
          toast.error(`Failed to delete product: ${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      },
      sortProducts(column) {
        if (column === 'amount') {
          this.filteredProducts.sort((a, b) => {
            if (this.priceSortOrder === 'asc') {
              return parseFloat(a[column]) - parseFloat(b[column])
            } else if (this.priceSortOrder === 'desc') {
              return parseFloat(b[column]) - parseFloat(a[column])
            }
            return 0
          })
        } else {
          this.filteredProducts.sort((a, b) => {
            if (a[column] < b[column]) return -1
            if (a[column] > b[column]) return 1
            return 0
          })
        }
      },
      filterProducts() {
        this.filteredProducts = this.products.filter(product => {
          return (
            (this.selectedCategory === '' || product.Category === this.selectedCategory) &&
            product.prodName.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        })
        this.sortProducts('amount') 
      },
      searchProducts() {
        this.filterProducts() 
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
    color: #fff;
    background-color: #007bff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  button:hover {
    background-color: #0056b3;
  }
  .search-filter {
    margin-bottom: 20px;
  }
  .search-filter input, .search-filter select {
    margin-right: 10px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  .loading {
    text-align: center;
    padding: 20px;
  }
  </style>
  