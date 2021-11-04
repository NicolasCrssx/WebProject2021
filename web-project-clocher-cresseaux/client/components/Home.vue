<template>
  <div>
    <h1>Home</h1>
  </div>
</template>

<script>
module.exports = {
  props: {
    cats: { type: Array, default: [] },
    panier: { type: Object }
  }
}
</script>


<style scoped>



p
{  
    font-family : 'Raleway', sans-serif;
}
h2
{
    font-family : 'Raleway', sans-serif;
    color: #2c3e50;
    text-align: center;
}

h1 {

  text-align : center ;

}





</style>