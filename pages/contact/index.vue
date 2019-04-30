<template>
  <div style="width: 100%; margin-top: 80px;">
    <section id="contact" class="pb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="item-box">
              <h1 class="heading-two">Contact Us</h1>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 col-sm-8 col-xs-8">
            <div style="width: 100%;">
              <form method="post" style="margin-top: 50px;" autocomplete="on">
                <div class="row alert alert-danger" v-if="errors.length">
                  <div class="col-md-12">
                    <ul style="color: #000000;">
                      <li
                        v-for="(error, index) in errors"
                        :item="error"
                        :index="index"
                        :key="error"
                      >{{ error }}</li>
                    </ul>
                  </div>
                </div>
                <div class="row alert alert-success" v-if="sent">
                  <div class="col-md-12">
                    Your message has successfully been sent. We will reply you as soon as possible.
                  </div>
                </div>
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
                        required
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
                        required
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
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <button
                        class="default-button"
                        value="Send Message"
                        style="cursor: pointer; text-align: center;"
                        v-on:click.prevent="send"
                      >Send</button>
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
                      <div style="width: 10%; margin-left: 10%; float: left;">
                        <p style="font-size: 12px; font-weight: 500;">Email</p>
                      </div>
                      <div style="width: 70%; float: left;">
                        <p style="font-size: 12px; padding-left: 20px;">hello@collegehub.co.zw</p>
                      </div>
                    </div>
                    <hr style="width: 80%;">
                    <div
                      class="row prof-blok"
                      style="padding-bottom: 0px; padding-top: 0px; margin-bottom: 0px; margin-top: 0px;"
                    >
                      <div style="width: 10%; margin-left: 10%; float: left;">
                        <p style="font-size: 12px; font-weight: 500;">Mobile</p>
                      </div>
                      <div style="width: 70%; float: left;">
                        <p style="font-size: 12px; padding-left: 20px;">+263 778 011 367</p>
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
            <div style="margin-top: 50px"><defaultAdsColumn/></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import defaultAdsColumn from '@/components/defaultAdsColumn'
export default {
  components: {
    defaultAdsColumn: defaultAdsColumn
  },
  data() {
    return {
      contactForm: {
        name: '',
        email: '',
        phone: '',
        message: ''
      },
      errors: [],
      sent: null,
      markers: [{ position: { lat: -17.82422, lng: 31.049363 } }]
    }
  },
  methods: {
    send: async function(e) {
      try {
        if (await this.$store.dispatch('contact', this.contactForm)){
          this.sent = true
          this.contactForm.name = null
          this.contactForm.email = null
          this.contactForm.phone = null
          this.contactForm.message = null
        }
      } catch (e) {
        this.errors.push(e.message)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.$nextTick(() => {
      setTimeout(() => this.$nuxt.$loading.finish(), 400)
    })
  },
  head() {
    return {
      title: 'Contact Us | Collegehub Zimbabwe',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Contact us for further assistance or Information. The team at Collegehub Zimbabwe is here to assist. We provide the only service in Zimbabwe where university students get easy access to accomodation, restaurants, listings of upcoming events, a marketplace for buying and selling and can travel with great convenience using the taxi finder platform. Hearing from our users would be great.'
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://www.collegehub.co.zw/contact/'
        }
      ],
    }
  }
}
</script>
