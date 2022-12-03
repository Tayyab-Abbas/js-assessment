<template>
  <div class="container">
  <div class="loginScreen">
  <div class="login-body">
    <div class="card-cover">
      <form @submit.prevent="onFormSubmit">
        <div class="Screen-card p-4 p-sm-3 ">
        <div class="head-title">
              <h2>Login</h2>
            </div>
          <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="contacts.email" id="email" name="email" class="form-control"
                  :class="{ 'is-invalid': isValid && $v.contacts.email.$error }" />
              
              <div v-if="isValid && $v.contacts.email.$error" class="invalid-feedback">
                  <span v-if="!$v.contacts.email.required">Email is required</span>
                  <span v-if="!$v.contacts.email.email">Email is not valid</span>
              </div>
          </div>

          <div class="form-group">
              <label>Password</label>
              <input type="password" v-model="contacts.password" id="password" name="password" class="form-control"
                  :class="{ 'is-invalid': isValid && $v.contacts.password.$error }" />
              <div v-if="isValid && $v.contacts.password.$error" class="invalid-feedback">
                  <span v-if="!$v.contacts.password.required">Password field is required</span>
              </div>
          </div>
          <div class="form-group card-button">
              <button class="btn btn-primary btn-block submit-button">Submit</button>
          </div>
          <div class="screen-Link">
                <p>Do you have an account? <span role="button" @click="signUp">Sign Up</span></p>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
  </div>
</template>

<script>
  import { required, email } from "vuelidate/lib/validators";
  import '../styles/global.css'

  export default {
    name: 'LoginScreen',
      data() {
          return {
              contacts: {
                  email: "",
                  password: "",
              },
              token:'xyz',
              isValid: false
          };
      },
      validations: {
          contacts: {
              email: {
                  required,
                  email
              },
              password: {
                  required,
              },
          }
      },
      methods: {
          onFormSubmit() {              
              this.isValid = true;

              this.$v.$touch();
              if (this.$v.$invalid) {
                  return;
              }
              this.axios.post('http://3.232.244.22/api/login', this.contacts,{headers: {"Content-type": "application/json","Authorization": `Bearer ${this.tokenAvailable}`}}).then((response) => {
                //   this.resetForm();
                console.log(response.data);
                if(response.data.success==true)
                 {window.localStorage.setItem('accessToken', response.data.user.token)
                  this.$router.push('/');
                  } 
                  else{
                    console.log("Api failed");
                    window.localStorage.setItem('accessToken', 'null')

                  }
              })
          },
          signUp(){
              this.$router.push('/register');
            }
          
      },
  };
</script>


<style lang="css">
  .container {
      max-width: 500px !important; 
      text-align: left;
      margin: 0 auto;
  }
  label {
      font-weight: 600;
  }
</style>