<template>
  <div style="width: 100%;">
    <div class="container" v-if="!$store.state.authUser">
      <div class="row" style="margin-top: 50px;">
        <div class="col-md-6" style="text-align: center; margin-top: 10%; margin-bottom: 25%;">
          <h1 class="title">College Hub</h1>
          <h2 class="subtitle">Making College Life Simpler</h2>
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
              <div class="col-lg-12 logo-capsul">
                <p>
                  <i>
                    To login, use
                    <strong>demo</strong> as username and
                    <strong>demo</strong> as password.
                  </i>
                </p>
              </div>
              <br>
              <div style="clear:both;"></div>
              <div class="group">
                <input
                  v-model="formUsername"
                  type="text"
                  name="username"
                  autocomplete="off"
                  id="username"
                  required
                >
                <span class="highlight"></span>
                <span class="bar"></span>
                <label for="username">
                  <i class="fa fa-user input-ikon"></i>
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
                <a
                  class="forgot_password_link"
                  href="javascript:void('forgot_password_link');"
                >Forgot you password?</a>
                <br>
                <br>
                <NuxtLink
                  :to="'/create-account'"
                  class="create-account"
                  title="Create Account"
                  id="Create"
                >Create Account</NuxtLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid" v-else>
      <div class="row dashboard-nav">
        <div class="col-md-12">
          <p class="dashboard-text">
            <strong>Dashboard</strong>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 nopadding">
          <div class="ui-card">
            <h2 class="heading-two">{{ $store.state.authUser.username }}</h2>
            <h2 class="subheading-two">Accommodation Seeker</h2>
            <br>
          </div>
          <div class="ui-card">
            <p>
              <NuxtLink to="/secret">UserProfile</NuxtLink>
            </p>
          </div>
        </div>
        <div class="col-md-7">
          <div class="ui-card">
            <p>Houses applied to will come here</p>
          </div>
        </div>
        <div class="col-md-2 nopadding" style="background-color: #eee;">
          <div class="single-notification">
            <p>This is a notification</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <h2 class="subtitle" style="color: #000;">Some very good stuff to come here</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formError: null,
      formUsername: '',
      formPassword: ''
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {
          username: this.formUsername,
          password: this.formPassword
        })
        this.formUsername = ''
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

<style>
.login-card {
  position: relative;
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12);
  z-index: 2;
  padding: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-family: roboto !important;
}
.login-card:after {
  background: linear-gradient(-135deg, rgb(63, 81, 181), rgb(233, 30, 99));
  /* Login Card Arkaplan Rengi */

  background: -webkit-linear-gradient(
    -135deg,
    rgb(63, 81, 181),
    rgb(233, 30, 99)
  );
  /* Login Card Arkaplan Rengi */

  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  opacity: 0.8;
  z-index: 3;
}
.login-card > form {
  z-index: 4;
  position: relative;
  padding: 0px 25px;
  width: 100%;
}
.logo-capsul {
  text-align: center;
  position: relative;
  opacity: 0.8;
}
.logo {
  height: auto;
  padding: 50px 0px;
}
/* form başlangıç stiller ------------------------------- */

.group {
  position: relative;
  margin-bottom: 45px;
}
.group input {
  font-size: 18px;
  padding: 10px 10px 10px 10px;
  display: block;
  width: 100%;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  background: none;
  color: #eee;
}
.group input:focus {
  outline: none;
}
/* LABEL ======================================= */

.group label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 5px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}
/* active durum */

.group input:focus ~ label,
input:valid ~ label {
  top: -20px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}
/* BOTTOM BARS ================================= */

.bar {
  position: relative;
  display: block;
  width: 100%;
}
.bar:before,
.bar:after {
  content: '';
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}
.bar:before {
  left: 50%;
}
.bar:after {
  right: 50%;
}
/* active durum bar */

.group input:focus ~ .bar:before,
.group input:focus ~ .bar:after {
  width: 50%;
}
/* HIGHLIGHTER ================================== */

.highlight {
  position: absolute;
  height: 0%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}
/* active durum */

.group input:focus ~ .highlight {
  -webkit-animation: inputHighlighter 0.3s ease;
  -moz-animation: inputHighlighter 0.3s ease;
  animation: inputHighlighter 0.3s ease;
}
/* form animasyon ================ */

@-webkit-keyframes inputHighlighter {
  from {
    background: rgba(255, 255, 255, 0.7);
  }
  to {
    width: 0;
    background: transparent;
  }
}
@-moz-keyframes inputHighlighter {
  from {
    background: rgba(255, 255, 255, 0.7);
  }
  to {
    width: 0;
    background: transparent;
  }
}
@keyframes inputHighlighter {
  from {
    background: rgba(255, 255, 255, 0.7);
  }
  to {
    width: 0;
    background: transparent;
  }
}
.input-ikon {
  font-size: 25px !important;
  position: relative;
}
.input-sifre-ikon {
  font-size: 22px !important;
  position: relative;
}
.span-input {
  margin-left: 10px;
  position: relative;
  top: -5px;
}
.login-button,
.logout-button,
.create-account {
  background: linear-gradient(-135deg, rgb(63, 81, 181), rgb(233, 30, 99));
  background: -webkit-linear-gradient(
    -135deg,
    rgb(63, 81, 181),
    rgb(233, 30, 99)
  );
  display: block;
  text-align: center;
  text-decoration: none;
  color: #eee;
  font-family: roboto;
  font-weight: 100;
  padding: 10px;
  border-radius: 3px;
  outline: none;
  opacity: 0.8;
  border: none;
  width: 100%;
}
.forgot-and-create {
  margin: 20px 0px;
}
.forgot-and-create a {
  color: #bbb;
  font-size: 12px;
  text-decoration: none;
  font-weight: 100;
  margin-right: 10px;
}

.error {
  color: red;
}

.zaten-hesap-var-link {
  color: #bbb;
  font-size: 14px;
  padding: 20px 0px;
  text-decoration: none;
  display: block;
}
</style>

