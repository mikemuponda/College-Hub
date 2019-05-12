<template>
  <div style="width: 100%; margin-top: 80px;">
    <no-ssr>
      <Chat/>
    </no-ssr>
  </div>
</template>

<script>
import Chat from '@/components/Chat'

export default {
  name: 'app',
  components: {
    Chat
  }
}
</script>