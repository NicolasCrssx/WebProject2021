<template>
  <div class = "all_cats">
    <h1>Please, meet our lovely cats !</h1>
    <article v-for="cat in cats" :key="cat.id" class = "one_cat">
      <div class="cat-img">
        <div :style="{ backgroundImage: 'url(' + cat.image + ')' }"></div>
      </div>
      <div class="cat-content">
        <div class="cat-title">
          <h2>{{ cat.name }} - {{ cat.age }} Months </h2>
        <div>

            <button v-if="panier.cats.find(a => a.id === cat.id)" @click="removefromcart(cat.id)">Remove from cart</button>
            <button v-else @click="addtocart(cat.id)">Add to the cart</button>

        </div>
        </div>
        <p class = "description_cat">{{ cat.description }}</p>
      </div>
    </article>  
  </div>
</template>

<script>
module.exports = {
  props: {
    cats: { type: Array, default: [] },
    panier: { type: Object }
  },
  data () {
    return {
    }
  },
  methods: {
    addtocart (catId) {
      this.$emit('add-cat', catId)
    },

    removefromcart(catId) {
      this.$emit("remove-cat", catId);
    },
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');

.all_cats {
  display : flex;
  flex-wrap : wrap;
  justify-content : space-evenly;
  align-items: baseline;
  padding : 15px;
  margin : 15px;
}

.one_cat{
  display : flex;
  justify-content : space-evenly;
}

.one_cat .description_cat {
  max-width: 400px;
  width : 100%;
}


h1{
  font-family: 'Raleway', sans-serif;
  text-align: center;
  color: #6a6774;
  margin-bottom:25px;
  width : 100%;
}

h2{
  font-family: 'Raleway', sans-serif;
  text-align: center;
  color: #6a6774;
  text-shadow: #5ff4ff 0.1em 0.1em 0.2em;
}

article {
  display: flex;
  margin-bottom: 15px ;
}

.cat-img {
  flex: 1;
}

.cat-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
  border-radius : 15px;

}

.cat-content {
  flex: 3;
}

.cat-title {
  display: flex;
  justify-content: space-between;
}

textarea {
  width: 100%;
}

button{

  background-color: #b3f5fa;
  font-size: 12px;
  padding : 8px;
  border-radius: 4px;
  border : none;
  box-shadow: 3px 3px 3px #6a6774;
  color : #6a6774;

}

button:hover{

  cursor: pointer;
  color: #fff;
  background-color: #6a6774;
  box-shadow: 3px 3px 3px #b3f5fa;
}



</style>
