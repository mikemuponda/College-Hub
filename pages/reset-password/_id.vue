<template>
  <div style="width: 100%;">
    <div class="container">
      <div style="margin: 20px 0 20px 0; border-radius: 1px;">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <div class="col-md-12 login-card">
              <form @submit.prevent="resetPassword">
                <div class="col-lg-12 logo-capsul">
                  <h2 class="heading">Reset Password</h2>
                </div>
                <div class="row">
                  <div v-if="notification.length" class="col-md-12 alert alert-success">
                    <p>{{notification}}</p>
                  </div>
                  <div class="col-md-12" v-else>
                    <div v-if="errors.length" class="col-lg-12 logo-capsul">
                      <ul class="error" style="color: red;">
                        <li
                          v-for="(error, index) in errors"
                          :item="error"
                          :index="index"
                          :key="error"
                        >{{ error }}</li>
                      </ul>
                    </div>
                    <br>
                    <div style="clear:both;"></div>
                    <div class="group">
                      <input
                        v-model="password"
                        type="password"
                        name="password"
                        autocomplete="off"
                        id="password"
                        required
                      >
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label for="password">
                        <i class="fa fa-lock input-ikon"></i>
                        <span class="span-input">Password</span>
                      </label>
                    </div>
                    <br>
                    <div style="clear:both;"></div>
                    <div class="group">
                      <input
                        v-model="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        autocomplete="off"
                        id="confirmPassword"
                        required
                      >
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label for="confirmPassword">
                        <i class="fa fa-lock input-ikon"></i>
                        <span class="span-input">Confirm Password</span>
                      </label>
                    </div>
                    <button type="submit" class="default-button">Reset</button>
                    <br>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      errors: [],
      password: '',
      notification: '',
      confirmPassword: ''
    }
  },
  methods: {
    resetPassword: async function(e) {
      this.notification = ''
      if (!this.password) {
        this.errors.push('Please enter a password')
      }
      if (this.password != this.confirmPassword) {
        this.errors.push('Passwords do not match')
      }
      if (!this.errors.length) {
        try {
          await this.$store.dispatch('resetPassword', {
            id: this.id,
            password: this.password
          })
          this.errors = []
          this.notification = 'Your password has successfully been reset.'
        } catch (e) {
          this.errors.push(e.message)
        }
      }
    }
  }
}
</script>