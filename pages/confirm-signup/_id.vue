<template>
  <div style="width: 100%;">
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
  middleware: 'auth-redirect',
  head() {
    return {
      title: 'Collegehub | Your Account has been confirmed',
    }
  },
  data() {
    return {
      error: null
    }
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
  mounted() {
    this.confirm()
  }
}
</script>


