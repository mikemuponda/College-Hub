<template>
  <div>
    <t-header/>
    <div style="width: 100%;">
      <nuxt/>
    </div>
    <t-footer/>
    <div class="mobileMenu">
      <mobileMenu/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
import mobileMenu from '@/components/mobileMenu'

export default {
  components: {
    't-header': Header,
    'mobileMenu': mobileMenu,
    't-footer': Footer
  }
}
</script>

<style>
@media only screen and (min-width: 872px) {
  .mobileMenu {
    display: none;
  }
}
</style>
