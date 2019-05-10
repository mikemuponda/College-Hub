<template>
  <div style="width:100%; margin-top: 80px;">
    <section id="about" class="pb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="item-box">
              <h1 class="heading-two">Welcome to our Blog</h1>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 col-sm-8 col-xs-8">
            <div class="item-box" style="margin-top: 10px;">
              
              <div
                class="row article"
                v-for="(post, index) in articles"
                :item="post"
                :index="index"
                :key="post._id"
                :title="post.title"
              >
                <div class="col-md-4">
                  <img
                    :src="post.image.path"
                    class="img-fluid rounded mb-3 mb-md-0"
                    data-holder-rendered="true"
                    :alt="post.title"
                  >
                </div>
                <div class="col-md-8">
                  <h3 style="font-size: 18px;">{{post.title}}</h3>
                  <p style="font-size: 14px;">{{post.description}}</p>
                  <Nuxt-link class="btn btn-primary" :to="'/blog/' + post.slug">Read More</Nuxt-link>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <nav aria-label="Page navigation  example">
                    <ul class="pagination pagination-lg justify-content-center">
                      <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1">Previous</a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">1</a>
                      </li>
                      <!-- <li class="page-item">
                        <a class="page-link" href="#">2</a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">3</a>
                      </li> -->
                      <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                      </li>
                    </ul>
                  </nav>
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
  asyncData({ store, params, context }){
    var articles = []
    var article = {
      _id: 1,
      title: '“Design creates culture, culture shapes values and values determine the future” Robert L Peters',
      image: {path: '/img/collegehub-creative.png' },
      description: 'Welcome to Collegehub Zimbabwe an online service for your daily convenience, from accommodation, taxi, restaurants and buying and selling we got you covered.',
      slug: 'article/design-creates-culture'
    }
    articles.push(article)
    return {
      articles: articles,
    }
  },
  head() {
    return {
      title: "Blog | Collegehub Zimbabwe",
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
          href: "https://www.collegehub.co.zw/blog/"
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

