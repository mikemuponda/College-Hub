<template>
  <div style="width: 100%; background: #eee; padding-bottom: 20px;">
    <div class="container-fluid" style="margin-bottom: 20px;">
      <div class="row">
        <div class="col-md-2 dashboard-greeting-display">
          <greetingColumn/>
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
        <div class="col-md-3">
          <defaultAdsColumn/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import greetingColumn from '@/components/defaultGreetingColumn'
import Search from '@/components/houseSearch'
import defaultAdsColumn from '@/components/defaultAdsColumn'
export default {
  middleware: 'auth',
  components: {
    Search: Search,
    greetingColumn: greetingColumn,
    defaultAdsColumn: defaultAdsColumn
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
