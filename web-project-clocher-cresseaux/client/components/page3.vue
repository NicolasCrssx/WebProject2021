<template>
  <div class = "log_page">
    <h1>Join our community to adopt our cats !</h1>
    <div class="big_form">
      <div class = "form">
        <form @submit.prevent="RegisterClient">
        <h2>Please register</h2>
        <input type="email" v-model="Register.Email" placeholder="Email" required>
        <input type="password" v-model="Register.Password" placeholder="Password" required>
        <button type="submit">Register</button>
        </form>
      </div>
      <div class = "form">
        <form @submit.prevent="LoginClient">
        <h2>Or Login if you already have an account : </h2>
        <input type="email" v-model="Login.Email" placeholder="Email" required>
        <input type="password" v-model="Login.Password" placeholder="Password" required>
        <button type="submit">Login</button>
        </form>
      </div>
    </div>
    <div class="picture_logo">
      <img src="images/home/logo_without.png" alt="Logo_image">
    </div>
  </div>
</template>

<script>

module.exports = {
  props: {
    cats: { type: Array, default: [] },
    panier: { type: Object },
    user: { type: Object },
  },
  data () {
    return {
      Register: {
        Email: '',
        Password: '',
      },
      Login: {
        Email: '',
        Password: '',
      }
    }
  },
  methods: {
      
    RegisterClient() {
      this.$emit('register', this.Register)
    },
    LoginClient() {
      this.$emit('login', this.Login)
    }
  }
}

</script>

<style scoped>

.log_page{
  display : flex;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
}

.log_page .form{
  margin : 10px;
  padding : 15px;
}

.log_page .big_form{
  display : flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.log_page .picture_logo{
  width : 100%;
}

img{
  width : 200px;
  margin : 15px;
  margin-left : 42%;
}

h1{
  font-family: 'Raleway', sans-serif;
  text-align: center;
  color: #6a6774;
  margin-bottom:25px;
}

h2 {
    font-family: 'Raleway', sans-serif;
    color: #6a6774;
    text-align: center;
    text-shadow:  #dad0fd 0.1em 0.1em 0.2em;
}

form {
    text-align : center ;
}

button{

  background-color: #dad0fd;
  font-size: 15px;
  padding : 5px;
  border-radius: 4px;
  height: 3em;
  border : none;
  box-shadow: 3px 3px 3px #6a6774;
  color : #6a6774;

}

button:hover{

  cursor: pointer;
  color: #fff;
  background-color: #6a6774;
  box-shadow: 3px 3px 3px #dad0fd;
}

</style>


