<template>
  <div style="width:100%; margin-top: 80px;">
    <section id="about" class="pb-4">
      <div class="container">
      
        <div class="row">
          <div class="col-md-12" style="text-align: center; margin-top: 2%; margin-bottom: 3%;">
            <h2
              class="title"
            >Welcome to our Blog</h2>
          </div>
        </div>
      
        <div class="row">
          <div class="col-md-8 col-sm-8 col-xs-8">
            <div class="container">
              <div
                class="row recommended-card article"
                v-for="(article, index) in articles"
                :key="index"
              >
                <NuxtLink
                  :to="'/blog/article/'"
                  :title="'Read Article'"
                  style="width: 100%; color: #000;"
                >
                  <div class="row">
                    <div class="col-md-12">
                      <h4 class="text-center">{{article.title}}</h4>
                      <p>{{article.body}}</p>
                      <button class="btn btn-primary float-right">Read more...</button>
                    </div>
                  </div>
                </NuxtLink>
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
            <div style="margin-top: 10px">
              <defaultAdsColumn/>
            </div>
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
  head() {
    return {
      title: "Blog | Collegehub Zimbabwe",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Collegehub is the only service in Zimbabwe where university students get easy access to accomodation, restaurants, listings of upcoming events, a marketplace for buying and selling and can travel with great convenience using the taxi finder platform."
        }
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: "https://www.collegehub.co.zw/blog/"
        }
      ]
    };
  },

  data() {
    return {
      articles: [
        {
          title: "“Design creates culture, culture shapes values and values determine the future” Robert L Peters",
          body: "Welcome to Collegehub Zimbabwe an online service for your daily convenience, from accommodation, taxi, restaurants and buying and selling we got you covered. In this blog I’m going to take you..."
        },
        {
          title: "“Design creates culture, culture shapes values and values determine the future” Robert L Peters",
          body: "Welcome to Collegehub Zimbabwe an online service for your daily convenience, from accommodation, taxi, restaurants and buying and selling we got you covered. In this blog I’m going to take you......"
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
    });
    this.$nextTick(() => {
      setTimeout(() => this.$nuxt.$loading.finish(), 400);
    });
  }
};
</script>

<style scoped>
.article {
  background: #fff;
  margin-top: 10px;
  opacity: 0.9;
}
</style>

