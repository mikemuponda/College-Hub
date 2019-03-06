<template>
  <div style="width: 100%;">
    <div class="row dashboard-nav">
      <div class="col-md-12">
        <div class="dir">
          <NuxtLink :to="'/'" title="Dashboard">
            <p class="dashboard-text" style="color: #000; margin-left: 10px;">
              <strong>Dashboard</strong>
            </p>
          </NuxtLink>
        </div>
        <div class="user-menu">
          <div class="inner-div">
            <NuxtLink
              :to="'/notifications'"
              title="Notifications"
              style="color: #aaa;"
              class="user-menu-icon"
            >
              <i class="fas fa-bell"></i>
            </NuxtLink>
            <NuxtLink
              :to="'/messages'"
              title="Messages"
              style="color: #aaa;"
              class="user-menu-icon"
            >
              <i class="fas fa-comment"></i>
            </NuxtLink>
            <NuxtLink
              :to="{path: '/profile/' + $store.state.authUser.user.username}"
              title="Profile"
              style="color: #aaa;"
              class="user-menu-icon"
            >
              <i class="fas fa-user"></i>
            </NuxtLink>
            <i
              class="fas fa-sign-out-alt user-menu-icon"
              style="color: #000; cursor: pointer; "
              @click="logout"
              title="Logout"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        this.user = null
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>
