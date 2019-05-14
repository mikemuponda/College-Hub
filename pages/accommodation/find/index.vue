<template>
  <div style="width: 100%; background: #eee; padding-bottom: 20px; margin-top: 80px;">
    <div class="container-fluid" style="margin-bottom: 20px;">
      <div class="row">
        <div class="col-md-3 dashboard-greeting-display">
          <div class="item-box">
            <div class="section search-form-sec">
              <div class="container">
                <form novalidate="novalidate" style="padding: 0 0.8rem 0 0.8rem;">
                  <div class="row" style="margin-top: 5px; margin-bottom: 5px;">
                    <div class="col-md-12 nopadding">
                      <select
                        class="form-control search-slt"
                        style="border-radius: 4px;"
                        v-model="Form.city"
                        @change="search()"
                      >
                        <option :value="null">Select City</option>
                        <option :value="city" v-for="city in cities" :key="city">{{city}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="row" style="margin-top: 5px; margin-bottom: 5px;">
                    <div class="col-md-12 nopadding">
                      <select
                        class="form-control search-slt"
                        style="border-radius: 4px;"
                        v-model="Form.university"
                        @change="byUniversity()"
                      >
                        <option :value="null">Select University</option>
                        <option
                          :value="university"
                          v-for="university in universities"
                          :key="university"
                        >{{university}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="row" style="margin-top: 5px; margin-bottom: 5px;">
                    <div class="col-md-12 nopadding">
                      <select
                        class="form-control search-slt"
                        style="border-radius: 4px;"
                        v-model="Form.suburb"
                        @change="bySuburb()"
                      >
                        <option v-if="Form.suburb && Form.suburb != 'null' && Form.suburb != null && Form.suburb != 'allsuburbs'" :value="Form.suburb">{{Form.suburb}}</option>
                        <option v-else :value="null">Select Suburb</option>
                        <option value="allsuburbs">All Suburbs</option>
                        <option v-for="suburb in suburbs" :value="suburb" :key="suburb">{{suburb}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 nopadding">
                      <no-ssr>
                        <VueSlideBar
                          v-model="priceChange"
                          :min="0"
                          :max="400"
                          :processStyle="slider.processStyle"
                          :lineHeight="slider.lineHeight"
                          :tooltipStyles="{ backgroundColor: 'purple', borderColor: 'purple' }"
                        >
                        </VueSlideBar>
                      </no-ssr>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="container-fluid">
            <div class="row default-user-panel" style="margin-top: 5px; overflow: hidden;">
              <div style="margin-top: 20px; width: 100%;"></div>
              <div class="container-fluid">
                <div class="row" v-if="errors.length">
                  <div class="col-md-12">
                    <div class="alert alert-danger">
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
                </div>
                <div class="row nopadding" v-else>
                  <div class="col-md-6" style="padding-left: 0px; width: 100%;">
                    <div class="taxiMapDisplay" style="width: 100%; height: 460px; margin-bottom: 20px;">
                      <no-ssr>
                        <google-map
                          :center="mapCenter"
                          :zoom="12"
                          style="width: 100%; height: 100%"
                        >
                          <google-marker
                            v-for="m in houses"
                            :key="m._id"
                            :position="m.position"
                            :clickable="true"
                            :icon="{ url: require('@/assets/icons/house-marker.png')}"
                            @click="center=m.position"
                          ></google-marker>
                        </google-map>
                      </no-ssr>
                    </div>
                  </div>
                  <div class="col-md-6 nopadding">
                    <div class="display-scroller">
                      <div class="row recommended-card" style="width: 98%; margin-left: 5px;" v-for="(house, index) in houses" :key="index">
                        <div class="houseDisplayed" @click="redirect('/accommodation/view/' + house._id)" :title="house.title" style="width: 100%; color: #000;">
                          <div class="row">
                            <div class="col-md-4">
                              <no-ssr>
                                <b-carousel
                                  :id="house._id"
                                  :interval="0"
                                  controls
                                  indicators
                                  background="#ffffff"
                                  img-width="100%"
                                  img-height="100%"
                                  class="image-carousel"
                                >
                                  <b-carousel-slide
                                    v-for="(image, index) in house.accommodationImages"
                                    :key="index"
                                    :alt="house.title"
                                    :img-src="image.path"
                                  ></b-carousel-slide>
                                </b-carousel>
                              </no-ssr>
                            </div>
                            <div class="col-md-5 displayMobile">
                              <h3 class="subheading-four">{{house.title}}</h3>
                              <p class="section-small-text">{{house.suburb}}, {{house.city}}</p>
                            </div>
                            <div class="col-md-3 amenities displayMobile" style="text-align: left;">
                              <h3 class="section-subtitle" style="font-size: 12px; padding-top: 0px;">
                                <strong>{{house.priceCurrency}}{{house.priceValue}}/{{house.priceTime}}</strong>
                                <br>
                                <span
                                  v-if="house.priceMethod == 'perHead'"
                                  style="font-size: 12px; color: #606060;"
                                >per Person</span>
                                <span
                                  v-else-if="house.priceMethod == 'perRoom'"
                                  style="font-size: 12px; color: #606060;"
                                >per Room</span>
                                <span
                                  v-else-if="house.priceMethod == 'fullHouse'"
                                  style="font-size: 12px; color: #606060;"
                                >Full House</span>
                                <span
                                  v-else
                                  style="font-size: 12px; color: #606060;"
                                >{{house.priceMethod}}</span>
                              </h3>  
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import greetingColumn from '@/components/defaultGreetingColumn'
import data from '~/locales/zw.json'

export default {
  components: {
    greetingColumn: greetingColumn
  },
  data() {
    return {
      userProfile: '',
      houses: [],
      errors: [],
      priceChange: 0,
      Form: {
        city: null,
        university: null,
        suburb: null,
        Price: null
      },
      locale: {},
      cities: [],
      suburbs: [],
      universities: [],
      maxPrice: null,
      mapCenter: {
        lat: -17.82422,
        lng: 31.049363
      },
      slider: {
        lineHeight: 7,
        processStyle: {
          backgroundColor: 'purple'
        }
      }
    }
  },
  watch: {
    priceChange: function(val) {
      this.priceChange = val
      this.Form.Price = val
      this.byPrice()
    }
  },
  methods: {
    redirect(path) {
      window.location.href = path
    },
    search(){
      this.errors = []
      if(!this.errors || this.errors.length < 1)
        this.cityData()
      if(!this.errors || this.errors.length < 1)
        this.byCity()
    },
    cityData() {
      this.suburbs = []
      this.universities = []
      var index, i
      for(index in this.locale.cities){
        if(this.locale.cities[index].name == this.Form.city){
          this.suburbs = this.locale.cities[index].suburbs
          for(i in this.locale.cities[index].universities){
            this.universities.push(this.locale.cities[index].universities[i].name)
          }
        }
      }
      this.Form.suburb = null
      this.Form.university = null
    },
    byCity() {
      if (this.Form.city != null) {
        this.errors = []
        if (this.Form.city && this.Form.city != 'null' && this.Form.city != null) {
          var index;
          this.houses = []
          for(index in this.allHousesGlobal){
            if(this.allHousesGlobal[index].city == this.Form.city){
              this.houses.push(this.allHousesGlobal[index])
            }
          }
        }
        if (!this.houses || !this.houses.length) {
          this.errors.push('Currently no houses in ' + this.Form.city + ' are listed')
        } else {
          this.mapCenter = this.houses[0].position
        }
      }
    },
    byUniversity() {
      this.byCity()
      if(!this.errors || this.errors.length < 1){
        if (this.Form.university && this.Form.university != 'null' && this.Form.university != null) {
          var index, tempArr = []
          for (index in this.houses) {
            if (this.houses[index].universities.includes(this.Form.university)) {
              tempArr.push(this.houses[index])
            }
          }
          this.houses = tempArr
          if (!this.houses || !this.houses.length) {
            this.errors = []
            this.errors.push('Currently no houses close to ' + this.Form.university + ' from ' + this.Form.suburb + ' are listed. Try choosing a different suburb')
          }
        }
      }
    },
    bySuburb() {
      this.byCity()
      if(!this.errors || this.errors.length < 1){
        if (this.Form.suburb && this.Form.suburb != 'null' && this.Form.suburb != null && this.Form.suburb != 'allsuburbs') {
          var index,
            tempArr = []
          for (index in this.houses) {
            if (this.houses[index].suburb == this.Form.suburb) {
              tempArr.push(this.houses[index])
            }
          }
          this.houses = tempArr
          if (!this.houses || this.houses.length < 1) {
            this.errors = []
            this.errors.push('Currently no houses in ' + this.Form.suburb + ' are listed')
          }
        }
      }
    },
    byPrice() {
      this.byCity()
      if(!this.errors || this.errors.length < 1){
        var tempHouses = this.houses
        this.houses = []
        var index
        for (index in tempHouses) {
          if (parseInt(tempHouses[index].priceValue) <= this.Form.Price) {
            this.houses.push(tempHouses[index])
          }
        }
        if (!this.houses || !this.houses.length) {
          this.errors = []
          this.errors.push('Available houses in ' + this.Form.city + ' are all above $' + this.Form.Price)
        }
      }
    }
  },
  async mounted() {
    this.$nextTick(() => {this.$nuxt.$loading.start()})
    this.priceChange = 100
    if (this.$store.state.authUser) {
      try {
        this.userProfile = await this.$store.dispatch('getProfile', {id: this.$store.state.authUser.user.username})
        this.userProfile = this.userProfile.data.user
      } catch (e) {
        this.error = e.message
      }
    } else {
      this.userProfile = false
    }
    if (this.$route.query.city && this.$route.query.city != null && this.$route.query.city != 'null') {
      this.Form.city = this.$route.query.city
    }
    if (this.$route.query.suburb && this.$route.query.suburb != null && this.$route.query.suburb != 'null') {
      this.Form.suburb = this.$route.query.suburb
    }
    if (this.$route.query.university && this.$route.query.university != null && this.$route.query.university != 'null') {
      this.Form.university = this.$route.query.university
    }
    this.houses = this.allHousesGlobal
    if(this.houses && this.houses.length < 0){
      var houseList = await store.dispatch('getAllHousesAsync')
      this.houses = houseList.data
    }
    
    this.locale = data.locale
    var index
    for(index in this.locale.cities){
      this.cities.push(this.locale.cities[index].name)
    }
    this.cityData()
    this.$nextTick(() => {setTimeout(() => this.$nuxt.$loading.finish(), 0)})
  },
  created(){
    this.Form.city = 'Harare'
    this.Form.suburb = 'allsuburbs'
  },
  async asyncData({ store, params, context }) {
    var x
    if(process.server){
      x = await store.dispatch('getAllHousesAsync')
    }else{
      x = await store.dispatch('getHouses')
    }

    const allHousesGlobal = x
    return {
      allHousesGlobal: allHousesGlobal.data
    } 
  },
  head() {
    return {
      title: 'Find Accommodation | Collegehub Zimbabwe',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Looking for accomodation? Find and compare exclusive accomodation options available at your university. Collegehub offers a world class platform that helps you find accommodation that best meets your needs. Collegehub is the premier service for students in Zimbabwe.'
        }
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://www.collegehub.co.zw/accommodation/find'
        }
      ]
    }
  }
}
</script>

<style>

.height-controller{
  height: 1000px;
}
.houseDisplayed:hover{
  cursor: pointer;
}
@media only screen and (min-width: 872px) {
  .housefilterbutton {
    display: none;
  }
  .adsColumn {
    display: none;
  }
  .height-controller{
    height: 500px;
  }

  .display-scroller .recommended-card{
    height: 110px;
  }

  .display-scroller .recommended-card .image-carousel{
    height: 90px;
    overflow: hidden;
  }

  .display-scroller .display-scroller{
    height: 460px;
    overflow-y: scroll;
    padding: 5px;
    margin: 0px;
  }

  .display-scroller .display-scroller::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  .display-scroller .display-scroller::-webkit-scrollbar{
    width: 9px;
    background-color: #F5F5F5;
  }

  .display-scroller .display-scroller::-webkit-scrollbar-thumb{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: purple;
  }
}

@media only screen and (max-width: 872px) {
  .display-scroller .recommended-card{
    height: 400px;
  }
  .display-scroller .recommended-card .image-carousel{
    height: 300px;
  }
  .display-scroller .displayMobile{
    background: #fff;
    width: 95%;
    margin-left: 15px;
    padding-top: 7px;
  }
  .display-scroller .subheading-four {
    font-size: 15px;
    padding-bottom: 0px;
    margin-bottom: 0px;
    margin-top: 5px;
    font-weight: 420;
  }
  .adsOnPCOnly {
    display: none;
  }
}
</style>

