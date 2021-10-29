<template>
  <div class="cart_page">
    <h2>My Cart <button id="confirmbutton" @click="confirm()">Confirm</button> </h2>
    
    <article v-for="cat in cats" :key="cat.id">
      <div v-if="panier.cats.find((a) => a.id === cat.id)" class="cat">
        <div class="cat-img">
          <div :style="{ backgroundImage: 'url(' + cat.image + ')' }">
          </div>
        </div>
        <div class="cat-content">
          <div class="cat-title">
            <h2>{{ cat.name }} - {{ cat.age }} months - </h2>
          </div>
        </div>
        <div class="buttons">
          <button id="deletebutton" @click="removefromcart(cat.id)">Remove</button>
        </div>
        <p>Delay : </p>
        <div class = "select">
          <select name="day" id="quantitySelector" @change="choiceday(cat.id, $event)">
            <option
              v-for="day in days"
              :key="day.id"
              v-bind:value="day"
            >
            {{day}} days
            </option>
          </select>
        </div>      
      </div>
    </article>
  </div>
</template>

<script>
module.exports = {
  props: {
    cats : { type: Array, default: [] },
    panier: { type: Object }
  },
  data() {
    return {
      days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      newQuantity: 0,
    };
  },
  async mounted() {},
  methods: {

    removefromcart(catId) {
      this.$emit("remove-cat", catId);
    },

    choiceday(catId, event) {
      this.newday = event.target.value
      this.$emit("change-day", catId, this.newday);
    },

    confirm () {
      this.$emit('confirm')
    }
  }
};
</script>

<style scoped>

p{

  font-family: 'Raleway', sans-serif;
  color: #6a6774 ;
  font-size: 20px;
  margin-left: 20px;

}

h2{
  font-family: 'Raleway', sans-serif;
  text-align: center;
  color: #6a6774;
}

.cart_page{
  min-height: 100vh;
}

.cat {
  display: flex;
  justify-content: space-evenly;
  margin: 20px;
  width: 90%;
  padding: 20px;
}

.cat-img {
  flex: 1;
}

.cat-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
  border-radius: 15px;
}

.cat-content {
  flex: 3;
}

.cat-title {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px;
}

#quantitySelector {
  margin-left: 10px;
}




select {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background:  #dad0fd;
  background-image: none;
}

.select {
  position: relative;
  display: flex;
  width: 7.5em;
  height: 2.5em;
  line-height: 3;
  background: #dad0fd;
  overflow: hidden;
  border-radius: .25em;
  margin: 10px;
}
select {
  flex: 1;
  padding: 0 .5em;
  color: #6a6774;
  cursor: pointer;
}

.select::after {
  content: '\25BC';
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 1em;
  background:#6a6774;
  color: #fff ;
  cursor: pointer;
  pointer-events: none;
  -webkit-transition: .25s all ease;
  -o-transition: .25s all ease;
  transition: .25s all ease;
}

.select:hover::after {
  color: #dad0fd;
}

p
{
    font-family: 'Raleway', sans-serif;
}

button{

  margin:7px;
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