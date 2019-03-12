<template>
  <div style="width: 100%;">
    <div style="width: 100%;" v-if="!$store.state.authUser">
      <Login/>
    </div>

    <div style="width: 100%;" v-else>
      <userDashboard/>
    </div>
    
    <recommended/>
  </div>
</template>

<script>
import recommended from '@/components/recommended'
import userDashboard from '@/components/userDashboard'
import login from '@/components/login'

export default {
  components: {
    Login: login,
    recommended: recommended,
    userDashboard: userDashboard
  },
  mounted() {
    this.$nextTick(() => {this.$nuxt.$loading.start()})
    this.$nextTick(() => {setTimeout(() => this.$nuxt.$loading.finish(), 400)})
  },
  head() {
    return {
      title: 'Collegehub | Home',
    }
  }
}
</script>