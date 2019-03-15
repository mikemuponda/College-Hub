<template>
  <div style="width: 100%; background: #eee; padding-bottom: 20px;">
    <div class="container-fluid" style="margin-bottom: 20px;">
      <div class="container">
        <div class="row">
          <div class="col-md-2 dashboard-greeting-display">
            <NuxtLink
              :to="{path: '/profile/' + user.username}"
              title="Profile"
              style="color: #606060;"
            >
              <div class="user-profile">
                <div class="profile-image">
                  <div
                    class="ratio img-responsive img-circle"
                    style="background-image: url(/profile-image/user.jpeg);"
                  ></div>
                </div>
                <br>
                {{user.firstname}} {{user.lastname}}
              </div>
            </NuxtLink>
          </div>
          <div class="col-md-7">
            <div class="container">
              <div class="row default-user-panel" style="margin-top: 5px;">
                <div style="margin-top: 20px; width: 100%;">
                  <Search/>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">Ads Will Come here</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/houseSearch'
export default {
  middleware: 'auth',
  components: {
    Search: Search
  },
  head() {
    return {
      title: 'Collegehub | Find a house'
    }
  },
  data() {
    return {
      user: '',
      errors: ''
    }
  },
  methods: {},
  created() {
    this.user = this.$store.state.authUser
    this.user = this.user.user
  }
}
</script>
