const Home = window.httpVueLoader('./components/Home.vue')

const routes = [
  { path: '/', component: Home }
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    cats: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      cats: []
    }
  },
  async mounted () {
    const res = await axios.get('/api/cats')
    this.cats = res.data
    const res2 = await axios.get('/api/panier')
    this.panier = res2.data
  },
  methods: {

  }
})
