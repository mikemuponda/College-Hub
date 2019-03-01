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
  head() {
    return {
      title: 'Collegehub | Home',
    }
  }
}
</script>