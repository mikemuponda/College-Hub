<template>
  <div>
    <t-header/>
    <div style="width: 100%;" v-if="$store.state.authUser">
      <userNav/>
    </div>
    <nuxt/>
    <t-footer/>
  </div>
</template>

<script>
import Header from '@/components/header'
import userNav from '@/components/userNav'
import Footer from '@/components/footer'

export default {
  components: {
    't-header': Header,
    'userNav': userNav,
    't-footer': Footer
  }
}
</script>