<template>
  <div id="app" :key="counter">
    <div class="dropdown" v-if="tokenAvailable!='null'" >
  <button class="dropbtn">Profile</button>
  <div class="dropdown-content">
  <a href="#" @click="logoutUser">Logout</a>
  </div>
   </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
          return {
            tokenAvailable:'null',
            counter:1,
          };
      },
  mounted(){
    let tokenAvailable=window.localStorage.getItem('accessToken');
    this.tokenAvailable = tokenAvailable;
    

  },
  updated() {
    let tokenAvailable=window.localStorage.getItem('accessToken');
    this.tokenAvailable = tokenAvailable;
    
    },
  created() {
      let tokenAvailable=window.localStorage.getItem('accessToken');
    this.tokenAvailable = tokenAvailable;
    
    },
  watch: {
    tokenAvailable(val) {
            if (val) {
              this.counter=this.counter+=1;
            }
            }
    },
  methods:{
    logoutUser(){
      window.localStorage.setItem('accessToken', null);
      this.tokenAvailable="null";
      this.$router.push('/');
   }
  },

  
 
}
</script>

<style>

.dropbtn {
  background-color: maroon;
  border-radius: 20px;
  padding: 16px;
  margin-top: 10px;
  margin-right: 10px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: white;
}

.dropdown {
  position: relative;
  display: inline-block;
  float: right;
  z-index: 2;
}

.dropdown-content {

  display: none;
  position: absolute;
  right: 10px;
  border-radius: 14px;
  background-color: coral;
  min-width: 89px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: peachpuff;
  border-radius: 14px;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: pink;
  color:maroon;
  border: pink ;
}
</style>
