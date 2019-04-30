<template>
  <div style="width: 100%; margin-top: 80px;">
    <div class="container">
      <div class="row">
        <div class="section col-md-12 notification-container-box">
          <div v-if="error" class="confirmation-box alert alert-danger">
            <p class="error">
              <i>{{ error }}</i>
            </p>
          </div>
          <div v-else class="confirmation-box alert alert-success">
            <h3
              style="font-size: 20px; text-align: center;"
            >Your email has successfully been confirmed. Have fun!</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.notification-container-box {
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 2px;
  padding-bottom: 50px;
}

.confirmation-box {
  margin-top: 50px;
  margin-bottom: 10px;
  border-radius: 2px;
}
</style>

<script>
export default {
  data() {
    return {
      error: null
    }
  },
  mounted() {
    this.$nextTick(() => {this.$nuxt.$loading.start()})
    this.confirm()
    this.$nextTick(() => {setTimeout(() => this.$nuxt.$loading.finish(), 400)})
  },
  methods: {
    confirm: async function() {
      var id = this.$route.params.id
      try {
        await this.$store.dispatch('emailConfirm', { id: id })
        this.error = null
      } catch (e) {
        this.error = e.message
      }
    }
  },
  created() {
    this.confirm()
  },
  head() {
    return {
      title: 'Confirm Your Account | Collegehub Zimbabwe',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Confirm your account to have access to a range of services that Collegehub provides. Collegehub Zimbabwe offers easy access to accomodation, taxis restaurants, upcoming events, and a marketplace for buying and selling'
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://www.collegehub.co.zw/confirm-signup/'
        }
      ],
    }
  }
}
</script>


