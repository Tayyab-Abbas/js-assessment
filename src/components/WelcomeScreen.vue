<template>
  <div class="container">
  <div class="loginScreen">
  <div class="login-body">


    <div class="dropdown" v-if="tokenAvailable!='null'">
  <button class="dropbtn">Profile</button>
  <div class="dropdown-content">
  <a href="#" @click="logoutUser">Logout</a>
  </div>
   </div>


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

<CreateTodoScreen
v-if="tokenAvailable!='null'"
></CreateTodoScreen>
  </div>
  </div>
  </div>
</template>

<script>
import CreateTodoScreen from './CreateTodoScreen.vue'
import TodoList from './TodoList.vue'
export default {
  name: 'WelcomeScreen',
  components:{CreateTodoScreen,TodoList},
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
    logoutUser(){
      window.localStorage.setItem('accessToken', null);
      this.tokenAvailable="null";
      this.$router.push('/');
            }
  },
  mounted: function (){
    let tokenAvailable=window.localStorage.getItem('accessToken');
    this.tokenAvailable = tokenAvailable;
    console.log(this.tokenAvailable)

  },
  // watch: {
  //   // whenever question changes, this function will run
  //   tokenAvailable(newtokenAvailable, oldtokenAvailable) {
  //     if (newtokenAvailable==null) {
  //       this.tokenAvailable=null;
  //     }
  //     if (oldtokenAvailable==null) {
  //       console.log(this.tokenAvailable)
  //     }
  //   }
  // },
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
.dropbtn {
  background-color: peachpuff;
  color: black;
  padding: 16px;
  font-size: 20px;
  border: none;
  cursor: pointer;
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
  right: 0;
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

.dropdown-content a:hover {background-color: peachpuff;}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: white;
}
</style>
