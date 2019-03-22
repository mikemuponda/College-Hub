<template>
  <div style="width: 100%;">
    <section id="contact" class="pb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-8 col-xs-8">
            <div class="item-box">
              <h1 class="heading-two">Contact Us</h1>
            </div>
            <div style="width: 100%;">
              <form style="margin-top: 50px;" autocomplete="on">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input
                        type="text"
                        v-model="contactForm.name"
                        name="name"
                        class="form-control"
                        placeholder="Full Name"
                        autocomplete="false"
                        value
                      >
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        v-model="contactForm.email"
                        name="email"
                        class="form-control"
                        placeholder="Email"
                        autocomplete="false"
                        value
                      >
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        v-model="contactForm.phone"
                        name="phone"
                        class="form-control"
                        placeholder="Phone Number"
                        autocomplete="false"
                        value
                      >
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <textarea
                        v-model="contactForm.message"
                        name="message"
                        class="form-control"
                        placeholder="Your Message"
                        style="width: 100%; height: 150px;"
                        autocomplete="false"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input
                        class="default-button"
                        value="Send Message"
                        style="cursor: pointer; text-align: center;"
                      >
                    </div>
                  </div>
                </div>
              </form>
              <div class="row" style="margin-bottom: 50px;">
                <div class="col-md-6">
                  <div
                    style="border-radius: 2px 2px 2px 2px; background: #ffffff; text-align: left; margin-right: 5px; float: left; width: 100%; height: 300px;"
                  >
                    <div
                      class="row prof-blok"
                      style="padding-bottom: 0px; padding-top: 0px; margin-bottom: 0px; margin-top: 30px;"
                    >
                      <div class="md-col-5" style="width: 10%; margin-left: 10%;">
                        <p class="fonts-seven">Email</p>
                      </div>
                      <div class="md-col-6" style="width: 70%;">
                        <p class="fonts-six">hello@collegehub.co.zw</p>
                      </div>
                    </div>
                    <hr style="width: 80%;">
                    <div
                      class="row prof-blok"
                      style="padding-bottom: 0px; padding-top: 0px; margin-bottom: 0px; margin-top: 0px;"
                    >
                      <div class="md-col-5" style="width: 10%; margin-left: 10%;">
                        <p class="fonts-seven">Mobile</p>
                      </div>
                      <div class="md-col-6" style="width: 70%;">
                        <p class="fonts-six">+263778011367</p>
                      </div>
                    </div>
                    <hr style="width: 80%;">
                  </div>
                </div>
                <div class="col-md-6">
                  <div
                    style="border-radius: 2px 2px 2px 2px; background: #ffffff; text-align: left; margin-left: 5px; float: right; width: 100%; height: 300px;"
                  >
                    <no-ssr>
                      <GmapMap
                        :center="{lat: -17.824220, lng: 31.049363}"
                        :zoom="18"
                        map-type-id="terrain"
                        style="width: 100%; height: 100%"
                      >
                        <GmapMarker
                          :key="index"
                          v-for="(m, index) in markers"
                          :position="m.position"
                          :clickable="true"
                          :draggable="true"
                          @click="center=m.position"
                        />
                      </GmapMap>
                    </no-ssr>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4 col-sm-4 col-xs-4">
            <div class="item-box">
              <h2 class="subheading-three">ads and other stuff to come here</h2>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Collegehub | Contact'
    }
  },
  data() {
    return {
      contactForm: {
        name: '',
        email: '',
        phone: '',
        message: ''
      },
      markers: [{ position: { lat: -17.82422, lng: 31.049363 } }]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.$nextTick(() => {
      setTimeout(() => this.$nuxt.$loading.finish(), 400)
    })
  }
}
</script>
