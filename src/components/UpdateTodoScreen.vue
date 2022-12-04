<template>
    <div class="container">
    <div class="loginScreen">
    <div class="login-body">
      <div class="card-cover">
        <form @submit.prevent="onFormSubmit">
          <div class="Screen-card p-4 p-sm-3 ">
          <div class="head-title">
                <h2>Update Todo</h2>
          </div>
  
            <div class="form-group">
                <label>Title</label>
                <input type="title" v-model="title" id="title" name="title" class="form-control"
                    :class="{ 'is-invalid': isValid && $v.title.$error }" />
                <div v-if="isValid && $v.title.$error" class="invalid-feedback">
                    <span v-if="!$v.title.required">Title field is required</span>
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <input type="description" v-model="description" id="description" name="description" class="form-control"
                    :class="{ 'is-invalid': isValid && $v.description.$error }" />
                <div v-if="isValid && $v.description.$error" class="invalid-feedback">
                    <span v-if="!$v.description.required">Description field is required</span>
                </div>
            </div>
            <div class="form-group card-button">
                <button class="btn btn-primary btn-block submit-button">Submit</button>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  </div>
    </div>
  </template>
  
  <script>
  import { required } from "vuelidate/lib/validators";
  export default {
    name: 'UpdateTodoScreen',
    data() {
            return {
                title:'',
                description:'',
                isValid:false,
                tokenAvailable:'',
            };
        },
        validations: {
            
          title: {
                    required,
                },
          description: {
                    required,
                },
          idTodo:"",

            
        },
        methods:{
        onFormSubmit() {              
                this.isValid = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                this.$router.push('/');
  
                let object={
                  description:this.description,
                  title:this.title
                }
                this.axios.put(`http://3.232.244.22/api/item/${this.idTodo}`, object ,{headers: {"Content-type": "application/json","Authorization": `Bearer ${this.tokenAvailable}`,
        }}).then((response) => {
                  //   this.resetForm();
                    
                    console.log(response.data);
                })
            },
          },
          mounted(){
            let tokenAvailable=window.localStorage.getItem('accessToken');
            this.tokenAvailable = tokenAvailable;
            this.idTodo=this.$router.currentRoute.params.todoId;

          },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .container {
        max-width: 500px !important; 
        text-align: left;
        margin: 0 auto;
    }
    label {
        font-weight: 600;
    }
  </style>
  