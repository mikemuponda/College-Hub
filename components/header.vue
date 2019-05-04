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
      <div class="links">
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
      <div class="profileImage" v-if="$store.state.authUser">
        <img
          v-if="getProfImage($store.state.authUser.user.username)"
          title="Profile and Settings"
          :alt="$store.state.authUser.user.firstname + ' ' + $store.state.authUser.user.lastname"
          :src="$store.state.authUser.user.profileImage.path"
          @click="show = !show"
        />
        <img
          v-else
          title="Profile and Settings"
          :alt="$store.state.authUser.user.firstname + ' ' + $store.state.authUser.user.lastname"
          src="/img/profileImages/user.png"
          @click="show = !show"
        />
      </div>
      <transition name="slide-fade" v-if="$store.state.authUser">
        <div
          class="user-settings item-box"
          style="padding-left: 0px; padding-right: 0px;"
          v-if="show"
        >
          <NuxtLink :to="{path: '/profile/' + $store.state.authUser.user.username}" title="Profile" id="Profile" class="nav-link user-link">
            <div style="float: left; width: 15%;">
              <i class="fas fa-user" style="font-size: 20px; margin-top: 5px;"></i>
            </div>
            <div style="float: left; width: 85%;">
              {{$store.state.authUser.user.firstname}}  {{$store.state.authUser.user.lastname}}
              <p style="font-weight: 400; color: #666;">@{{$store.state.authUser.user.firstname}}</p>
            </div>
          </NuxtLink>
          <NuxtLink :to="'/notifications'" title="Notifications" id="Notifications" class="nav-link user-link">
            <div style="float: left; width: 15%;">
              <i class="fas fa-bell" style="font-size: 15px;"></i>
            </div>
            <div style="float: left; width: 85%;">
              Notifications
            </div>
          </NuxtLink>
          <NuxtLink :to="'/messages'" title="messages" id="messages" class="nav-link user-link">
            <div style="float: left; width: 15%;">
              <i class="fas fa-comment" style="font-size: 15px;"></i>
            </div>
            <div style="float: left; width: 85%;">
              Messages
            </div>
          </NuxtLink>
          <div title="Logout" class="nav-link user-link logout" @click="logout($store.state.authUser.user)">
            <div style="float: left; width: 15%;">
              <i class="fas fa-sign-out-alt" style="font-size: 15px;"></i>
            </div>
            <div style="float: left; width: 85%;">
              Logout
            </div>
          </div>
        </div>
      </transition>
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
  z-index: 10;
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
.nav {
  width: 20%;
}
.Nav-Desktop{
  margin-top: 25px;
  float: left;
  width: 80%;
  height: 48px;
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

.Nav-Desktop .profileImage{
  float: right;
  margin-right: 2.5%;
  width: 50px;
}

.Nav-Desktop .profileImage img{
  border-radius: 50%;
  width: 100%;
}
.Nav-Desktop .profileImage img:hover{
  cursor: pointer;
}

.user-settings{
  width: 200px;
  float: right;
  margin-right: 10px;
  margin-top: 0px;
  border-radius: 2px;
  border: 0.5px solid #aaa;
  color: #000;
  font-size: 12px;
  font-weight: 500;
  padding: 10px;
}

.user-settings .user-link{
  color: #000;
  font-size: 12px;
  font-weight: 500;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
}

.user-settings .user-link:hover{
  background: #eee;
}

.user-settings .logout{
  width: 100%;
}
.user-settings .logout:hover{
  cursor: pointer;
}
</style>

<script>
import io from 'socket.io-client'
export default {
  data () {
    return {
      scrolled: false,
      page: null,
      show: false,
      socket: io(process.env.socketsIO),
      userProfile: {},
      errors: []
    }
  },
  methods: {
    handleScroll () {
      this.scrolled = window.scrollY > 0;
    },
    async getProfImage(username){
      try {
        this.userProfile = await this.$store.dispatch('getProfile', {id: username})
        this.userProfile = this.userProfile.data.user
      }catch(e){
        this.errors.push(e)
      }
      return this.userProfile.profileImage.path
    },
    async logout(user) {
      this.userProfile = user
      try {
        this.socket.emit('ACTIVITY_FEED_LOGOUT', {user: this.userProfile,})
        this.userProfile = null
        await this.$store.dispatch('logout')
        window.location.href = '/'
      } catch (e) {
        this.errors.push(e)
      }
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


