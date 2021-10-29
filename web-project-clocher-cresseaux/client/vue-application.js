const Home = window.httpVueLoader('./components/Home.vue')
const cats = window.httpVueLoader('./components/cats.vue')
const page2 = window.httpVueLoader('./components/page2.vue')
const page3 = window.httpVueLoader('./components/page3.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/cats', component: cats },
  { path: '/page2', component: page2 },
  { path: '/page3', component: page3 }
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
    async addtocart(catId) {
      try {
      const days = 3 ;
      const id = parseInt(catId);
      const res = await axios.post("/api/panier", {
        id,
        days,
      });
      this.panier.cats.push(res.data);
      } catch(e) {
        router.push('/page3')
        alert('You need to log into your account before choosing a kitten !')
      }
    },

    async removefromcart(catId) {
      const res = await axios.delete("/api/panier/" + catId);
      const index = this.panier.cats.findIndex((a) => a.id === catId);
      this.panier.cats.splice(index, 1);
    },

    async choiceday(catId, days) {
      const res = await axios.put("/api/panier/" + catId, {
        days: days
      })
      this.panier = res.data
    },

    async RegisterClient (Register) { 
      const res = await axios.post("api/register", {
        email: Register.Email,
        password: Register.Password 
      })
    },
    
    async LoginClient (Login){
      const res = await axios.post("api/login", {
        email: Login.Email,
        password: Login.Password 
      })
    },

    async confirm () {
      try {
        await axios.post('/api/panier/confirm')
        this.panier.cats.splice(0,this.panier.cats.length)
        alert("Thank you ! Don't forget to come get your kitties !")
      } catch(e) {
        router.push('/page3')
        alert('Please connect yourself and choose some kitties !')
      }
    },

  }
})
