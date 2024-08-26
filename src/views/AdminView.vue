<template>
  <div class="admin-page">

    <section class="users-section">
      <h1>Admin - Users</h1>
      <button class="btn btn-primary" @click="openAddUserModal">Add User</button>

      <div class="search-filter">
        <input v-model="searchQuery" class="search-input" placeholder="Search Users by name" />
      </div>

      <div v-if="loadingUsers" class="loading">Loading Users...</div>
      <table v-else class="admin-table">
        <thead>
          <tr>
            <th @click="sortByUser('userID')">ID</th>
            <th @click="sortByUser('firstName')">First Name</th>
            <th @click="sortByUser('lastName')">Last Name</th>
            <th @click="sortByUser('userAge')">Age</th>
            <th @click="sortByUser('Gender')">Gender</th>
            <th @click="sortByUser('userRole')">Role</th>
            <th @click="sortByUser('emailAdd')">Email</th>
            <th>Profile Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in sortedFilteredUsers" :key="user.userID">
            <td>{{ user.userID }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.userAge }}</td>
            <td>{{ user.Gender }}</td>
            <td>{{ user.userRole }}</td>
            <td>{{ user.emailAdd }}</td>
            <td><img :src="user.userProfile" alt="" class="profile-image"></td>
            <td>
              <button class="btn btn-secondary" @click="editUser(user)">Update</button>
              <button class="btn btn-danger" @click="handleDeleteUser(user.userID)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <AppModal v-if="showAddUserModal || showEditUserModal" class="modal">
        <template #header>
          <h2>{{ isEditing ? 'Update User' : 'Add User' }}</h2>
        </template>
        <template #body>
          <form @submit.prevent="isEditing ? handleUpdateUser() : handleAddUser()">
            <div class="form-group">
              <label for="firstName">First Name:</label>
              <input type="text" v-model="formUser.firstName" required>
            </div>
            <div class="form-group">
              <label for="lastName">Last Name:</label>
              <input type="text" v-model="formUser.lastName" required>
            </div>
            <div class="form-group">
              <label for="userAge">Age:</label>
              <input type="number" v-model="formUser.userAge" required>
            </div>
            <div class="form-group">
              <label for="Gender">Gender:</label>
              <input type="text" v-model="formUser.Gender" required>
            </div>
            <div class="form-group">
              <label for="userRole">Role:</label>
              <input type="text" v-model="formUser.userRole" required>
            </div>
            <div class="form-group">
              <label for="emailAdd">Email:</label>
              <input type="email" v-model="formUser.emailAdd" required>
            </div>
            <div class="form-group">
              <label for="userPass">Password:</label>
              <input type="password" v-model="formUser.userPass" required>
            </div>
            <div class="form-group">
              <label for="userProfile">Profile Image URL:</label>
              <input type="text" v-model="formUser.userProfile" required>
            </div>
            <div class="modal-actions">
              <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update' : 'Add' }}</button>
              <button type="button" class="btn btn-secondary" @click="closeUserModal">Cancel</button>
            </div>
          </form>
        </template>
      </AppModal>
    </section>

   
    <section class="products-section">
      <h1>Admin - Products</h1>
      <button class="btn btn-primary" @click="openAddProductModal">Add Product</button>

      <div class="search-filter">
        <input v-model="searchQueryProduct" class="search-input" placeholder="Search Products by name" />
        <select v-model="selectedCategory" class="category-select">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
        <select v-model="priceSortOrder" class="price-sort-select">
          <option value="">Sort by Price</option>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
      </div>

      <div v-if="loadingProducts" class="loading">Loading Products...</div>
      <table v-else class="admin-table">
        <thead>
          <tr>
            <th @click="sortByProduct('prodID')">ID</th>
            <th @click="sortByProduct('prodName')">Name</th>
            <th @click="sortByProduct('quantity')">Quantity</th>
            <th @click="sortByProduct('amount')">Amount</th>
            <th @click="sortByProduct('Category')">Category</th>
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
            <td><img :src="product.prodUrl" alt="" class="product-image"></td>
            <td>
              <button class="btn btn-secondary" @click="editProduct(product)">Update</button>
              <button class="btn btn-danger" @click="handleDeleteProduct(product.prodID)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <AppModal v-if="showAddProductModal || showEditProductModal" class="modal">
        <template #header>
          <h2>{{ isEditingProduct ? 'Update Product' : 'Add Product' }}</h2>
        </template>
        <template #body>
          <form @submit.prevent="isEditingProduct ? handleUpdateProduct() : handleAddProduct()">
            <div class="form-group">
              <label for="prodName">Name:</label>
              <input type="text" v-model="formProduct.prodName" required>
            </div>
            <div class="form-group">
              <label for="quantity">Quantity:</label>
              <input type="number" v-model="formProduct.quantity" required>
            </div>
            <div class="form-group">
              <label for="amount">Amount:</label>
              <input type="text" v-model="formProduct.amount" required>
            </div>
            <div class="form-group">
              <label for="category">Category:</label>
              <input type="text" v-model="formProduct.Category" required>
            </div>
            <div class="form-group">
              <label for="prodUrl">Image URL:</label>
              <input type="text" v-model="formProduct.prodUrl" required>
            </div>
            <div class="modal-actions">
              <button type="submit" class="btn btn-primary">{{ isEditingProduct ? 'Update' : 'Add' }}</button>
              <button type="button" class="btn btn-secondary" @click="closeProductModal">Cancel</button>
            </div>
          </form>
        </template>
      </AppModal>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AppModal from '@/components/AppModal.vue'

export default {
  components: { AppModal },
  data() {
    return {
      formUser: {
        userID: null,
        firstName: '',
        lastName: '',
        userAge: '',
        Gender: '',
        userRole: '',
        emailAdd: '',
        userPass: '',
        userProfile: ''
      },
      showAddUserModal: false,
      showEditUserModal: false,
      isEditing: false,
      searchQuery: '',
    
      formProduct: {
        prodID: null,
        prodName: '',
        quantity: '',
        amount: '',
        Category: '',
        prodUrl: ''
      },
      showAddProductModal: false,
      showEditProductModal: false,
      isEditingProduct: false,
      searchQueryProduct: '',
      selectedCategory: '',
      priceSortOrder: '',
      userSortKey: 'userID',
      productSortKey: 'prodID',
      sortDirection: 'asc'
    }
  },
  computed: {
    ...mapState(['users', 'products', 'loadingUsers', 'loadingProducts']),
    categories() {
      return [...new Set(this.products.map(p => p.Category))]
    },
    sortedFilteredUsers() {
      return this.users
        .filter(user => user.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) || user.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()))
        .sort((a, b) => {
          const key = this.userSortKey
          if (a[key] < b[key]) return this.sortDirection === 'asc' ? -1 : 1
          if (a[key] > b[key]) return this.sortDirection === 'asc' ? 1 : -1
          return 0
        })
    },
    sortedFilteredProducts() {
      return this.products
        .filter(product => product.prodName.toLowerCase().includes(this.searchQueryProduct.toLowerCase()))
        .filter(product => this.selectedCategory ? product.Category === this.selectedCategory : true)
        .sort((a, b) => {
          if (this.priceSortOrder === 'asc') return a.amount - b.amount
          if (this.priceSortOrder === 'desc') return b.amount - a.amount
          return 0
        })
    }
  },
  methods: {
    ...mapActions(['fetchUsers', 'fetchProducts', 'addUser', 'updateUser', 'deleteUser', 'addProduct', 'updateProduct', 'deleteProduct']),
    openAddUserModal() {
      this.showAddUserModal = true
      this.isEditing = false
      this.formUser = { userID: null, firstName: '', lastName: '', userAge: '', Gender: '', userRole: '', emailAdd: '', userPass: '', userProfile: '' }
    },
    openAddProductModal() {
      this.showAddProductModal = true
      this.isEditingProduct = false
      this.formProduct = { prodID: null, prodName: '', quantity: '', amount: '', Category: '', prodUrl: '' }
    },
    editUser(user) {
      this.formUser = { ...user }
      this.showEditUserModal = true
      this.isEditing = true
    },
    editProduct(product) {
      this.formProduct = { ...product }
      this.showEditProductModal = true
      this.isEditingProduct = true
    },
    handleAddUser() {
      this.addUser(this.formUser).then(() => this.closeUserModal())
    },
    handleUpdateUser() {
      this.updateUser(this.formUser).then(() => this.closeUserModal())
    },
    handleDeleteUser(userID) {
      this.deleteUser(userID)
    },
    handleAddProduct() {
      this.addProduct(this.formProduct).then(() => this.closeProductModal())
    },
    handleUpdateProduct() {
      this.updateProduct(this.formProduct).then(() => this.closeProductModal())
    },
    handleDeleteProduct(prodID) {
      this.deleteProduct(prodID)
    },
    closeUserModal() {
      this.showAddUserModal = false
      this.showEditUserModal = false
    },
    closeProductModal() {
      this.showAddProductModal = false
      this.showEditProductModal = false
    },
    sortByUser(key) {
      this.userSortKey = key
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
    },
    sortByProduct(key) {
      this.productSortKey = key
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
    }
  },
  mounted() {
    this.fetchUsers()
    this.fetchProducts()
  }
}
</script>

<style scoped>
.admin-page {
  padding: 20px;
}
.profile-image, .product-image {
  width: 50px;
  height: 50px;
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
