<template>
  <div class="mainHeader" v-bind:class="[ scrolled ? 'scrolled' : 'non-scrolled' ]" v-on:scroll="handleScroll()">
    <div class="nav" style="padding-bottom: 5px; float: left;">
      <nav
        class=""
        style="margin-left: 10px;"
      >
        <NuxtLink
          :to="'/'"
          class="navbar-brand"
          title="College Hub"
          style="margin-top: 15px; font-weight: 350; font-size: 16px; color: #8B008B; text-shadow: 0.5px 0.5px 1px #333;"
        >
          <img
            src="/logo.png"
            title="Home"
            alt="Home"
            style="height: 50px; margin-top: 0px; margin-left: 10px;"
          >&nbsp;COLLEGEHUB
        </NuxtLink>
      </nav>
    </div>
    <div class="Nav-Desktop">
      <NuxtLink :to="'/'" title="Home" id="Home" class="nav-link" v-bind:class="[ scrolled ? 'nav-link-dt-scrolled' : 'nav-link-dt-non-scrolled' ]">
        <span>Home</span>
      </NuxtLink>
      <NuxtLink :to="'/about'" title="About Us" id="about" class="nav-link" v-bind:class="[ scrolled ? 'nav-link-dt-scrolled' : 'nav-link-dt-non-scrolled' ]">
        <span>About Us</span>
      </NuxtLink>
      <NuxtLink :to="'/services'" title="Services" id="services" class="nav-link" v-bind:class="[ scrolled ? 'nav-link-dt-scrolled' : 'nav-link-dt-non-scrolled' ]">
        <span>Services</span>
      </NuxtLink>
      <NuxtLink :to="'/team'" title="Team" id="team" class="nav-link" v-bind:class="[ scrolled ? 'nav-link-dt-scrolled' : 'nav-link-dt-non-scrolled' ]">
        <span>Team</span>
      </NuxtLink>
      <NuxtLink :to="'/blog'" title="Blog" id="Blog" class="nav-link" v-bind:class="[ scrolled ? 'nav-link-dt-scrolled' : 'nav-link-dt-non-scrolled' ]">
        <span>Blog</span>
      </NuxtLink>
      <NuxtLink :to="'/contact'" title="Contact" id="Contact" class="nav-link" v-bind:class="[ scrolled ? 'nav-link-dt-scrolled' : 'nav-link-dt-non-scrolled' ]">
        <span>Contact</span>
      </NuxtLink>
      <NuxtLink v-if="!$store.state.authUser && page != '/'" :to="'/'" title="Login" id="Login" class="nav-link" v-bind:class="[ scrolled ? 'nav-link-dt-scrolled' : 'nav-link-dt-non-scrolled' ]">
        <span>Login</span>
      </NuxtLink>
      <NuxtLink
        v-if="!$store.state.authUser"
        :to="'/create-account'"
        title="Create Account"
        id="Create"
        class="nav-link" v-bind:class="[ scrolled ? 'nav-link-dt-scrolled' : 'nav-link-dt-non-scrolled' ]"
        style="background-color: rgba(258, 258, 258, 0.2);"
      >
        <span>Create Account</span>
      </NuxtLink>
    </div>
    <div class="Nav-Mobile">
      <no-ssr>
        <Slide right noOverlay>
          <NuxtLink :to="'/'" title="Home" id="Home" class="nav-link">
            <span>Home</span>
          </NuxtLink>
          <NuxtLink :to="'/about'" title="About Us" id="about" class="nav-link">
            <span>About Us</span>
          </NuxtLink>
          <NuxtLink :to="'/services'" title="Services" id="services" class="nav-link">
            <span>Services</span>
          </NuxtLink>
          <NuxtLink :to="'/team'" title="Team" id="team" class="nav-link">
            <span>Team</span>
          </NuxtLink>
          <NuxtLink :to="'/blog'" title="Blog" id="Blog" class="nav-link">
            <span>Blog</span>
          </NuxtLink>
          <NuxtLink :to="'/contact'" title="Contact" id="Contact" class="nav-link">
            <span>Contact</span>
          </NuxtLink>
          <NuxtLink
            v-if="!$store.state.authUser && page != '/'"
            :to="'/'"
            title="Login"
            id="Login"
            class="nav-link"
          >
            <span>Login</span>
          </NuxtLink>
          <NuxtLink
            v-if="!$store.state.authUser"
            :to="'/create-account'"
            title="Create Account"
            id="Create"
            class="nav-link"
          >
            <span>Create Account</span>
          </NuxtLink>
        </Slide>
      </no-ssr>
    </div>
  </div>
</template>

<style>
.mainHeader{
  width: 100%;
  position: fixed;
  top: 0px;
  margin-top: 0px;
  z-index: 10000;
  font-variant: small-caps;
}

.non-scrolled{
  background-color: rgba(258, 258, 258, 0.3);
  color: #fff;
  transition: 0.3s;
}
.scrolled{
  background-color: #fff;
  color: #000;
  border-bottom: 0.5px solid #ccc;
  transition: 0.3s;
}
.Nav-Desktop{
  float: left;
  margin-top: 25px;
  float: right;
  margin-right: 20px;
}
.Nav-Desktop .nav-link{
  float: left;
  background-size: 100% 200%; 
  transition: background-position .3s ease-in-out, color .3s ease-in-out;
  font-size: 16px;
}
.nav-link-dt-non-scrolled{
  color: #fff;
}
.nav-link-dt-scrolled{
  color: #000;
}
.nav-link-dt-non-scrolled:hover, .nav-link-dt-non-scrolled:focus{
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.0) 50%, rgba(258, 258, 258, 0.2) 50%);
  background-position: 0 100%;
  color: #fff;
}
.nav-link-dt-scrolled:hover, .nav-link-dt-scrolled:focus{
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.0) 50%, rgba(0, 0, 0, 0.2) 50%);
  background-position: 0 100%;
  color: #000;
}
@media only screen and (max-width: 872px) {
  .Nav-Desktop {
    display: none;
  }
}
@media only screen and (min-width: 872px) {
  .Nav-Mobile {
    display: none;
  }
}
</style>

<script>
export default {
  data () {
    return {
      scrolled: false,
      page: null
    };
  },
  methods: {
    handleScroll () {
      this.scrolled = window.scrollY > 0;
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll);
    this.page = this.$route.path
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>


