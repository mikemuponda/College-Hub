<template>
  <div style="width: 100%;">
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
            v-bind:style="{backgroundImage: 'url(' + userProfile.profileImage.path + ')'}"
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
</template>

<script>
export default {
  data() {
    return {
      userProfile: ''
    }
  },
  async created() {
    try {
      this.userProfile = await this.$store.dispatch('getProfile', {id: this.$store.state.authUser.user.username})
      this.userProfile = this.userProfile.data.user
    } catch (e) {
      this.error = e.message
    }
  }
}
</script>
