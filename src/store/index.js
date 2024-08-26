import { createStore } from 'vuex';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from '@/router';

const apiURL = 'https://retrovision-2.onrender.com/';

export default createStore({
  state: {
    users: [],
    user: [],
    products: [],
    recentProducts: null,
    product: null,
    categories: [],
    loading: false
  },
  mutations: {
    setUsers(state, value) {
      state.users = value;
    },
    setUser(state, value) {
      state.user = value;
    },
    setProducts(state, value) {
      state.products = value;
    },
    setRecentProducts(state, value) {
      state.recentProducts = value;
    },
    setProduct(state, value) {
      state.product = value;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setLoading(state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get(`${apiURL}users`);
        const { results, msg } = response.data;
        if (results) {
          commit('setUsers', results);
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    },
    async fetchUser({ commit }, id) {
      try {
        const { result, msg } = await (await axios.get(`${apiURL}users/${id}`)).data;
        if (result) {
          commit('setUser', result);
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    },
    async register({ dispatch }, payload) {
      try {
        const { msg, err, token } = await (await axios.post(`${apiURL}users/register`, payload)).data;
        if (token) {
          dispatch('fetchUsers');
          toast.success(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          });
          router.push({ name: 'login' });
        } else {
          toast.error(`${err}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    },
    async updateUser({ dispatch }, userDetails) {
      try {
        await axios.patch(`${apiURL}users/update/${userDetails.userID}`, userDetails);
        dispatch('fetchUsers');
      } catch (e) {
        console.error(`Error updating user: ${e.message}`);
      }
    },
    async deleteUser({ dispatch }, id) {
      try {
        const { msg, err } = await (await axios.delete(`${apiURL}users/delete/${id}`)).data;
        if (msg) {
          dispatch('fetchUsers');
        } else {
          toast.error(`${err}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    },

   
    async fetchProducts({ commit }) {
      commit('setLoading', true);
      try {
        const response = await axios.get(`${apiURL}Products`);
        const { results } = response.data;
        if (results) {
          commit('setProducts', results);
          commit('setCategories', [...new Set(results.map(p => p.Category))]);
        } else {
          router.push({ name: 'login' });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        });
      } finally {
        commit('setLoading', false);
      }
    },
    async fetchProduct({ commit }, id) {
      try {
        const response = await axios.get(`${apiURL}Products/${id}`);
        const product = response.data;  
        if (product) {
          commit('setProduct', product);
        } else {
          toast.error('Product not found', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          });
        }
      } catch (e) {
        toast.error(`Failed to fetch product: ${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    },
    async addProduct({ dispatch }, product) {
      try {
        const { msg } = await (await axios.post(`${apiURL}Products/addProduct`, product)).data;
        if (msg) {
          dispatch('fetchProducts');
          toast.success(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    },
    async updateProduct({ dispatch }, product) {
      try {
        const { msg } = await (await axios.patch(`${apiURL}Products/update/${product.prodID}`, product)).data;
        if (msg) {
          dispatch('fetchProducts');
          toast.success(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    },
    async deleteProduct({ dispatch }, id) {
      try {
        const response = await axios.delete(`${apiURL}Products/delete/${id}`);
        if (response.status === 204) {
       
          dispatch('fetchProducts');
          toast.success('Product deleted successfully', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          });
        } else {
        
          toast.error('Unexpected response from server', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          });
        }
      } catch (e) {
        toast.error(`Failed to delete product: ${e.response?.data?.error || e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    },
    async recentProducts({ commit }) {
      try {
        const { results, msg } = await (await axios.get(`${apiURL}Products/recent`)).data;
        if (results) {
          commit('setRecentProducts', results);
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    }
  },
  getters: {
    filteredProducts(state) {
      return state.products;
    }
  }
});
