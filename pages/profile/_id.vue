<template>
  <div style="width: 100%">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 section" style="text-align: center;">
          <div class="alert alert-danger" v-if="error.length > 1">{{error}}</div>
          <div v-else>
            <div class="row">
              <div class="col-md-12">
                <strong>
                  {{userProfile.firstname}} {{userProfile.lastname}}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userProfile: {},
      error: ''
    }
  },
  async beforeCreate() {
    try {
      this.userProfile = await this.$store.dispatch('getProfile', {
        id: this.$route.params.id
      })
      this.userProfile = this.userProfile.data.user
    } catch (e) {
      this.error = e.message
    }
  },
  head() {
    return {
      title:
        'Collegehub | ' +
        this.userProfile.firstname +
        ' ' +
        this.userProfile.lastname,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://www.lekkahub.com/' + this.$route.params.id
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.userProfile.firstname +
            ' ' +
            this.userProfile.lastname +
            "' account on Collegehub. Collegehub provides services that facilate college life."
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            this.userProfile.firstname +
            ' ' +
            this.userProfile.lastname +
            "' account on Collegehub. Collegehub provides services that facilate college life."
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://www.collegehub.co.zw'
        },
        { hid: 'og:image', property: 'og:image', content: '/img/logo.png' }
      ]
    }
  }
}
</script>
