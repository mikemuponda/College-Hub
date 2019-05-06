<template>
	<div style="width:100%; margin-top: 80px;">
		<section id="about" class="pb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="item-box">
              <h1 class="heading-two">Blog</h1>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 col-sm-8 col-xs-8">
            <div class="item-box" style="margin-top: 10px;">
              <div class="row">
                <div class="col-md-12">
                  Hello World
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-4 col-xs-4">
            <div style="margin-top: 10px"><defaultAdsColumn/></div>
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
  head() {
    return {
      title: 'Blog | Collegehub Zimbabwe',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Collegehub is the only service in Zimbabwe where university students get easy access to accomodation, restaurants, listings of upcoming events, a marketplace for buying and selling and can travel with great convenience using the taxi finder platform.'
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://www.collegehub.co.zw/blog/'
        }
      ],
    }
	},
	mounted() {
    this.$nextTick(() => { this.$nuxt.$loading.start() })
    this.$nextTick(() => { setTimeout(() => this.$nuxt.$loading.finish(), 400) })
  },
}
</script>
