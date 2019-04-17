<template>
  <div style="width: 100%">
    <div class="container" style="margin-bottom: 20px;">
      <div class="row" style="margin-top: 50px;">
        <div class="col-md-6" style="text-align: center; margin-top: 10%; margin-bottom: 25%;">
          <h1 class="title">Collegehub</h1>
          <h2 class="subtitle">Making College Life Simple</h2>
        </div>
        <div class="col-md-6">
          <div class="col-md-10 login-card">
            <form @submit.prevent="login" autocomplete="off">
              <div class="col-lg-12 logo-capsul">
                <h2 class="heading">Login</h2>
              </div>
              <div v-if="formError" class="col-lg-12 logo-capsul">
                <p class="error">
                  <i>{{ formError }}</i>
                </p>
              </div>
              <br>
              <div style="clear:both;"></div>
              <div class="group">
                <input
                  v-model="formEmail"
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
              <div class="group">
                <input
                  v-model="formPassword"
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
              <button type="submit" class="login-button">Login</button>
              <div class="forgot-and-create tab-menu">
                <NuxtLink
                  :to="'/forgot-password'"
                  class="forgot_password_link"
                  title="Forgot Password"
                >Forgot you password?</NuxtLink>
                <br>
                <br>
                <NuxtLink :to="'/create-account'" title="Create Account">
                  <button class="create-account" style="font-size: 15px;">Create Account</button>
                </NuxtLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid nopadding">
      <div class="row">
        <div class="col-md-12">
          <homeDefault/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import homeDefault from '@/components/homeDefault'

export default {
  components: {
    homeDefault: homeDefault
  },
  data() {
    return {
      formError: null,
      formEmail: '',
      formPassword: '',
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {email: this.formEmail, password: this.formPassword})
        this.formEmail = ''
        this.formPassword = ''
        this.formError = null
      } catch (e) {
        this.formError = e.message
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>

