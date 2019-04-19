<template>
  <div style="width: 100%;">
    <div v-if="!$store.state.authUser">
      <Login/>
    </div>

    <div style="width: 100%;" v-else>
      <userDashboard/>
    </div>
    
  </div>
</template>

<script>
import login from '@/components/login'
import userDashboard from '@/components/userDashboard'

export default {
  components: {
    Login: login,
    userDashboard: userDashboard,
  },
  head() {
    return {
      title: 'Collegehub | Home',
    }
  }
}
</script>