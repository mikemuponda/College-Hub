<template>
  <div style="width: 100%; background: #eee; padding-bottom: 20px;">
    <div class="container-fluid" style="margin-bottom: 20px;">
      <div class="container">
        <div class="row">
          <div class="col-md-2 dashboard-greeting-display">
            <NuxtLink
              :to="{path: '/profile/' + userProfile.username}"
              title="Profile"
              style="color: #606060;"
            >
              <div class="user-profile">
                <div class="profile-image">
                  <div
                    v-if="userProfile.profileImage"
                    class="ratio img-responsive img-circle"
                    :title="userProfile.firstname + ' ' + userProfile.lastname"
                    :alt="userProfile.firstname + ' ' + userProfile.lastname"
                    v-bind:style="{
                      backgroundImage: 'url(' + userProfile.profileImage.path + ')'
                    }"
                  ></div>
                  <div
                    v-else
                    class="ratio img-responsive img-circle"
                    style="background-image: url(/profileImages/user.png);"
                    :title="userProfile.firstname + ' ' + userProfile.lastname"
                    :alt="userProfile.firstname + ' ' + userProfile.lastname"
                  ></div>
                </div>
                <br>
                {{userProfile.firstname}} {{userProfile.lastname}}
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
      userProfile: '',
      errors: ''
    }
  },
  methods: {},
  async created() {
    try {
      this.userProfile = await this.$store.dispatch('getProfile', {
        id: this.$store.state.authUser.user.username
      })
      this.userProfile = this.userProfile.data.user
    } catch (e) {
      this.error = e.message
    }
  }
}
</script>
