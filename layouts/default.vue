<template>
  <div>
    <t-header/>
    <nuxt/>
    <t-footer/>
  </div>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'

export default {
  components: {
    't-header': Header,
    't-footer': Footer
  }
}
</script>