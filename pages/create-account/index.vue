<template>
  <div style="width: 100%;">
    <div class="container">
      <div class="signup-form">
        <form @submit.prevent="signUpHandler" autocomplete="off">
          <h2 class="heading" style="color: #000000;">Create Account</h2>
          <p>Please fill in this form to create an account!</p>
          <hr>
          <div class="form-group">
            <div class="row">
              <div class="col-md-12 alert alert-danger" v-if="errors.length">
                <ul style="color: #000000;">
                  <li
                    v-for="(error, index) in errors"
                    :item="error"
                    :index="index"
                    :key="error"
                  >{{ error }}</li>
                </ul>
              </div>
              <div v-if="formError" class="col-md-12 alert alert-danger">
                <p class="error">
                  <i>{{ formError }}</i>
                </p>
              </div>
              <div v-if="created" class="col-md-12 alert alert-success">
                <h3 style="font-size: 18px;">Hi, {{Form.first_name}}!</h3>
                <br>
                <p>
                  Your account has successfully been created. We have sent a confirmation email to {{Form.email}}.
                  Please confirm your email and have a wonderful time finding a cozy home for yourself on our website
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 input">
                <input
                  type="text"
                  class="form-control"
                  name="first_name"
                  placeholder="First Name"
                  v-model="Form.first_name"
                  required="required"
                >
              </div>
              <div class="col-md-6 input">
                <input
                  type="text"
                  class="form-control"
                  name="last_name"
                  placeholder="Last Name"
                  v-model="Form.last_name"
                  required="required"
                >
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 input">
                <input
                  type="text"
                  class="form-control"
                  name="username"
                  placeholder="Username"
                  v-model="Form.username"
                  required="required"
                >
              </div>
              <div class="col-md-6 input">
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  placeholder="Email"
                  v-model="Form.email"
                  required="required"
                >
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 input">
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                  v-model="Form.password"
                  required="required"
                >
              </div>
              <div class="col-md-6 input">
                <input
                  type="password"
                  class="form-control"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  v-model="confirm_password"
                  required="required"
                >
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="checkbox-inline">
              <input type="checkbox" required="required"> I accept the
              <NuxtLink :to="'/terms-and-conditions'" title="Terms and Conditions">Terms of use</NuxtLink>&amp;
              <NuxtLink :to="'/privacy-policy'" title="Privacy Policy">Privacy Policy</NuxtLink>
            </label>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-md-2">
                <button type="submit" class="create-account">Sign Up</button>
              </div>
            </div>
          </div>
          <div class="form-group">
            <hr>
            <h2 class="heading" style="color: #000000;">Already have an account?</h2>
            <div class="row">
              <div class="col-md-2">
                <NuxtLink :to="'/'" title="Login">
                  <button class="login-button">Login</button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth-redirect',
  data() {
    return {
      Form: {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: ''
      },
      confirm_password: '',
      errors: [],
      formError: null,
      created: null
    }
  },
  methods: {
    signUpHandler: async function(e) {
      this.errors = []
      this.created = false
      if (!this.Form.first_name) {
        this.errors.push('First Name required.')
      }
      if (!this.Form.last_name) {
        this.errors.push('Last Name required.')
      }
      if (!this.Form.username) {
        this.errors.push('Username required.')
      }
      if (!this.Form.email) {
        this.errors.push('Email required.')
      } else if (!this.validEmail(this.Form.email)) {
        this.errors.push('Please write a valid email')
      }
      if (!this.Form.password) {
        this.errors.push('Please enter a password')
      }
      if (this.Form.password != this.confirm_password) {
        this.errors.push('Passwords do not match')
      }
      if (!this.errors.length) {
        try {
          await this.$store.dispatch('signUp', {
            first_name: this.Form.first_name,
            last_name: this.Form.last_name,
            username: this.Form.username,
            email: this.Form.email,
            password: this.Form.password
          })
          this.Form.last_name = ''
          this.Form.username = ''
          this.Form.password = ''
          this.formError = null
          this.created = true
        } catch (e) {
          this.formError = e.message
        }
      }

      e.preventDefault()
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  }
}
</script>


<style>
.form-control {
  height: 41px;
  background: #f2f2f2;
  box-shadow: none !important;
  border: none;
}
.form-control:focus {
  background: #e2e2e2;
}
.form-control {
  border-radius: 3px;
}
.signup-form {
  margin: 30px auto;
}
.signup-form form {
  color: #999;
  border-radius: 3px;
  margin-bottom: 15px;
  background: #fff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}

.signup-form hr {
  margin: 0 -30px 20px;
}
.signup-form .form-group {
  margin-bottom: 20px;
}
.signup-form input[type='checkbox'] {
  margin-top: 3px;
}
.signup-form .row div:first-child {
  padding-right: 10px;
}
.signup-form .row div:last-child {
  padding-left: 10px;
}

.input {
  margin-bottom: 10px;
}

.signup-form form a {
  color: #3598dc;
  text-decoration: none;
}
</style>
