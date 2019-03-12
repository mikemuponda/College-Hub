<template>
  <div style="width: 100%;">
    <div class="container">
      <div style="margin: 20px 0 20px 0; border-radius: 1px;">
        <div class="row">
					<div class="col-md-3"></div>
          <div class="col-md-6">
            <div class="col-md-12 login-card">
              <form @submit.prevent="submitEmail">
                <div class="col-lg-12 logo-capsul">
                  <h2 class="heading">Reset Password</h2>
                </div>
                <div class="row">
                  <div v-if="notification.length" class="col-md-12 alert alert-success">
                    <p>
                      {{notification}}
                    </p>
                  </div>
                  <div class="col-md-12" v-else>
                    <div v-if="error" class="col-lg-12 logo-capsul">
                      <p class="error">
                        <i>{{ error }}</i>
                      </p>
                    </div>
                    <br>
                    <div style="clear:both;"></div>
                    <div class="group">
                      <input
                        v-model="email"
                        type="email"
                        name="email"
                        autocomplete="off"
                        id="email"
                        required
                      >
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label for="email">
                        <i class="fa fa-envelope input-ikon"></i>
                        <span class="span-input">Email</span>
                      </label>
                    </div>
                    <button type="submit" class="default-button">Reset</button>
                    <br>
                    <div class="col-lg-12 logo-capsul">
                      <h2 class="heading">OR</h2>
                    </div>
                    <div class="forgot-and-create tab-menu">
                      <NuxtLink :to="'/'" title="Login">
                        <button class="default-button">Login</button>
                      </NuxtLink>
                      <br>
                      <NuxtLink :to="'/create-account'" title="Create Account">
                        <button class="create-account">Create Account</button>
                      </NuxtLink>
                    </div>
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
  head() {
    return {
      title: 'Collegehub | Forgot Password',
    }
  },
  data() {
    return {
      error: null,
      email: '',
			notification: ''
    }
  },
  mounted() {
    this.$nextTick(() => {this.$nuxt.$loading.start()})
    this.$nextTick(() => {setTimeout(() => this.$nuxt.$loading.finish(), 400)})
  },
  methods: {
    submitEmail: async function(e) {
      try {
        await this.$store.dispatch('forgotPassword', {email: this.email}) 
        this.error = null
        this.notification = 'We have sent an email to ' + this.email + ' Please follow the link in the email to reset your password'
        
      } catch (e) {
        this.error = e.message
      }
    }
  }
}
</script>


