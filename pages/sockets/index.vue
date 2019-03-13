
<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <no-ssr>
            <Chat/>
          </no-ssr>
        </div>
      </div>
    </div>
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