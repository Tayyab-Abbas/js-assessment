<template>
  <div class="container">
  <div class="loginScreen">
  <div class="login-body">
  <div class="card-cover" v-if="tokenAvailable=='null'">
      <div class="welcome-card p-4 p-sm-3 ">
        <div class="head-title">
              <h2>Welcome to Project</h2>
        </div>
        <br/><br/>
  <div class="tab">
  <button class="tablinks" @click="loginUser">Login</button>
  <button class="tablinks" @click="signUp">Register</button>
  </div>
  </div>
  </div>

<TodoList
v-if="tokenAvailable!='null'"
></TodoList>
  </div>
  </div>
  </div>
</template>

<script>
/* eslint-disable */
import TodoList from './TodoList.vue'
export default {
  name: 'WelcomeScreen',
  components:{TodoList},
  data() {
          return {
            tokenAvailable:'null',
          };
      },
  methods:{
    signUp(){
              this.$router.push('/register');
            },
    loginUser(){
              this.$router.push('/login');
            },
  },
  mounted(){
    let tokenAvailable=window.localStorage.getItem('accessToken');
    this.tokenAvailable = tokenAvailable;
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}

/* Style the buttons that are used to open the tab content */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */

.tab button{
  width: 50%;
}
.tablinks a{
  text-decoration: none;
}

</style>
