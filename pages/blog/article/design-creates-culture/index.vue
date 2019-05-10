<template>
  <div style="width:100%; margin-top: 80px;">
    <section id="about" class="pb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-8 col-xs-8">
            <div class="item-box" style="margin-top: 10px;">
							<div class="row">
								<div class="col-lg-12" style="padding: 0 30px 0 30px;">
									<h1 class="subtitle" style="color: #000; text-align: left; word-spacing: 1px;">{{article.title}}</h1>
									<hr>
									<p style="padding: 0px; margin: 0px;">by {{article.author}} </p>
									<p style="padding: 0px; margin: 0px;">{{ dateConversion(article.createdAt) }}</p>
									<hr>

									<img
										:src="article.image.path"
										class="img-fluid rounded"
										data-holder-rendered="true"
										:alt="article.title"
									>

									<hr>

									<!-- Post Content -->
									<p class="lead">{{ article.description }}</p>
									<p class="lead" style="font-size: 16px;">
										Robert L Peters' statement fits well into our system at Collegehub. The website was designed in a
										unique way to offer the best user experience and to cater for the major concerns of
										our clients. At College hub we value team work, we believe in our uniqueness and that
										we are unlimited in our potential if we combine our strengths and tackle a problem.
										We value greatly the idea of team work and we hope to see it cascade down to our users
										and partners. We appreciate diversity at Collegehub and we provide an environment
										where our colleagues, partners and clients can fully express their true self and flourish.
										Therefore at Collegehub we hope to share our values of diversity, unity, teamwork with
										our clients and together create a future full of endless possibilities.
									</p>
									<p class="lead" style="font-size: 16px;">
										College hub was found in December 2018 and what drove our founders to creating this
										platform was the struggle, college students had to go through in order to secure external
										accommodation. We saw an very challenging situation for students and came up with a plan
										to tackle this problem for the student and that gave birth to collegehub.During the crafting
										of this intervention method we realized that students also struggled with other things,
										communication between different faculties, buying and selling wasn’t easy and efficient on
										campus, finding a taxi, among other things and we made it our goal to bring these services
										on one site.
									</p>
									<p class="lead" style="font-size: 16px;">
										Our goal is to remove the burden from the student and carry it on their behalf. We appreciate
										how time is limited and we want to help the students access these services in an easy and
										efficient manner. Welcome once again Hubbers, we promise you a smooth journey with us and we
										have your back all the way.
									</p>
									<div class="comments">
										<no-ssr>
											<vue-disqus shortname="collegehub-zimbabwe" :identifier="article.slug" :url="article.currenturl"></vue-disqus>
										</no-ssr>
									</div>
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
import defaultAdsColumn from "@/components/defaultAdsColumn";
export default {
  components: {
    defaultAdsColumn: defaultAdsColumn
  },
  mounted() {
    this.$nextTick(() => { this.$nuxt.$loading.start() })
    
    this.$nextTick(() => { setTimeout(() => this.$nuxt.$loading.finish(), 400)})
	},
	methods: {
		dateConversion(stringDate) {
      var dateFormat = require('dateformat')
      var mydate = new Date(stringDate)
      if (!isNaN(mydate.getTime()))
        return dateFormat(mydate, 'dddd, mmmm dS, yyyy, h:MM TT')
      else return 'unknown'
    }
	},
  asyncData({ store, params, context }){
    var article = {
        title: '“Design creates culture, culture shapes values and values determine the future” - Robert L Peters',
        author: 'Bright Zenda',
        description: 'Welcome to Collegehub Zimbabwe an online service for your daily convenience, from accommodation, taxi, restaurants and buying and selling we got you covered.',
        image: {path: '/img/collegehub-creative.png' },
        slug: 'article/design-creates-culture',
        createdAt: '2019-05-09T23:06:26.031Z',
        updatedAt: '2019-05-09T23:06:26.031Z',
        currenturl: 'https://www.collegehub.co.zw/blog/article/design-creates-culture',
      }
    return {
      article: article,
    }
  },
  head() {
    return {
      title: "Design creates culture | Collegehub Zimbabwe",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Welcome to our blog. We have some nice reads for you. Collegehub is the only service in Zimbabwe where university students get easy access to accomodation, restaurants, listings of upcoming events, a marketplace for buying and selling and can travel with great convenience using the taxi finder platform."
        }
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: "https://www.collegehub.co.zw/blog/article/design-creates-culture"
        }
      ]
    }
  }
}
</script>

<style scoped>
.article {
  padding: 10px 0px 10px 0px;
  -webkit-box-shadow: 2px 3px 5px 1px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 2px 3px 5px 1px rgba(0, 0, 0, 0.5);
  box-shadow: 2px 3px 5px 1px rgba(0, 0, 0, 0.5);
  margin: 0px 10px 10px 10px;
  border-radius: 4px;
}
</style>

