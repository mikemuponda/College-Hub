<template>
  <div style="width: 100%;">
    <div v-if="!$store.state.authUser" style="width: 100%; margin-top: 130px;">
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
      title: 'Home | Collegehub Zimbabwe',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Collegehub is the only service in Zimbabwe where university students get easy access to accomodation, restaurants, listings of upcoming events, a marketplace for buying and selling and can travel with great convenience using the taxi finder platform.'
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://www.collegehub.co.zw/'
        }
      ],
    }
  }
}
</script>