<template>
  <div>
    <t-header/>
    <nuxt/>
  </div>
</template>

<script>
import Header from '@/components/header'
export default {
  components: { 't-header': Header }
}
</script>
