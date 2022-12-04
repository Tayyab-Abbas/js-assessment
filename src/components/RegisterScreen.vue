
  <template>
    <div class="container">
    <div class="loginScreen">
    <div class="login-body">
      <div class="card-cover">
        <form @submit.prevent="onFormSubmit">
          <div class="Screen-card p-4 p-sm-3 ">
          <div class="head-title">
                <h2>Register</h2>
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
                    <span v-if="!$v.contacts.password.minLength">Maxium 8 characters allowed</span>
                </div>
            </div>
  
            <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" v-model="contacts.password_confirmation" id="password_confirmation" name="password_confirmation"
                    class="form-control" :class="{ 'is-invalid': isValid && $v.contacts.password_confirmation.$error }" />
                <div v-if="isValid && $v.contacts.password_confirmation.$error" class="invalid-feedback">
                    <span v-if="!$v.contacts.password_confirmation.required">Confirm Password field is required</span>
                    <span v-else-if="!$v.contacts.password_confirmation.sameAsPassword">Passwords should be matched</span>
                </div>
            </div>
  
            <div class="form-group card-button">
                <button class="btn btn-primary btn-block submit-button">Submit</button>
            </div>
              <div class="screen-Link">
                <p>Already have an account? <span role="button" @click="loginUser">Login</span></p>
              </div>
          <b-modal :id="infoModal.id" :title="infoModal.title" ok-only ok-variant='danger'  @hide="resetInfoModal">
          <pre>{{infoModal.title}}</pre>
          </b-modal>
          </div>
        </form>
      </div>
    </div>
  </div>
    </div>
  </template>
  
  <script>
    import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
    import '../styles/global.css'
  
    export default {
      name: 'RegisterScreen',
        data() {
            return {
                contacts: {
                    email: "",
                    password: "",
                    password_confirmation: ""
                },
                isValid: false,
              infoModal: {
              id: 'info-modal',
              title: '',
              },
              toasterHit:false,
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
                    minLength: minLength(8)
                },
                password_confirmation: {
                    required,
                    sameAsPassword: sameAs('password')
                }
            }
        },
        methods: {
            onRegister(){
                this.axios.post('http://3.232.244.22/api/register', this.contacts).then((response) => {
                    console.log(response.data);
                    if(response.data.success==true){
                    this.toasterHit=true;
                    this.infoModal.title="Registration successfull, Check email please";
                    this.$root.$emit('bv::show::modal', this.infoModal.id, this.infoModal.title);
                    } 
                }).catch(err => {
              console.log(err);
              window.localStorage.setItem('accessToken', 'null');
              this.toasterHit=false;
              this.infoModal.title="The email has already been taken.";
              this.$root.$emit('bv::show::modal', this.infoModal.id, this.infoModal.title);
              
             
              })

            },
            onFormSubmit() {              
                this.isValid = true;
  
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                this.onRegister();  
            },
            loginUser(){
              this.$router.push('/login');
            },
            resetInfoModal() {
            this.infoModal.title = ''
            if(this.toasterHit){
                this.loginUser()}
            },
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