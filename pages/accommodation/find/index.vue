<template>
  <div style="width: 100%; background: #eee; padding-bottom: 20px;">
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
                        v-model="Form.city"
                        @change="displayCityData()"
                        style="border-radius: 4px;"
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
                        @change="displayByUniversity()"
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
                        @change="displayBySuburb()"
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
          <div class="container">
            <div class="row default-user-panel" style="margin-top: 5px;">
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
                  <div class="col-md-12" style="width: 100%;">
                    <div class="taxiMapDisplay" style="width: 100%; margin-bottom: 20px;">
                      <no-ssr>
                        <google-map
                          :center="mapCenter"
                          :zoom="11"
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

                    <div class="row recommended-card" v-for="(house, index) in houses" :key="index">
                      <NuxtLink
                        :to="'/accommodation/view/' + house._id"
                        :title="house.title"
                        style="width: 100%; color: #000;"
                      >
                        <div class="row">
                          <div class="col-md-4">
                            <no-ssr>
                              <b-carousel
                                :id="house._id"
                                :interval="0"
                                controls
                                indicators
                                background="#ababab"
                                img-width="100%"
                                img-height="100%"
                                style="text-shadow: 1px 1px 2px #333;"
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
                          <div class="col-md-5">
                            <h3 class="section-subtitle">{{house.title}}</h3>
                            <p class="section-small-text">{{house.suburb}}, {{house.city}}</p>
                            <p class="section-description">{{house.description}}</p>
                          </div>
                          <div class="col-md-3 amenities">
                            <h3 class="section-subtitle" style="font-size: 14px;">
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
                            <br>
                            <div class="row nopadding" style="width: 100%">
                              <div class="col-md-12 nopadding">
                                <p class="section-small-text">
                                  UZ (10 minutes)
                                  <i class="fas fa-graduation-cap"></i>
                                </p>
                                <p class="section-small-text" v-if="house.amenities.beds">
                                  {{house.bedroomcount}} Bedrooms
                                  <i class="fas fa-bed"></i>
                                </p>
                                <p class="section-small-text" v-if="house.amenities.essentials">
                                  Essentials
                                  <i class="fas fa-briefcase"></i>
                                </p>
                                <p class="section-small-text" v-if="house.amenities.wifi">
                                  Wifi
                                  <i class="fas fa-wifi"></i>
                                </p>
                                <p class="section-small-text" v-if="house.amenities.desks">
                                  Desks
                                  <i class="fas fa-table"></i>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </NuxtLink>
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
      fullLocale: null,
      cities: null,
      suburbs: null,
      universities: null,
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
      this.searchByPrice()
    }
  },
  methods: {
    onchange() {},
    displayCityData() {
      this.suburbs = []
      if (this.Form.city == 'Harare') {
        this.suburbs = this.fullLocale.Zimbabwe.city.Harare.suburbs
        this.universities = this.fullLocale.Zimbabwe.city.Harare.universities
      } else if (this.Form.city == 'Bulawayo') {
        this.suburbs = this.fullLocale.Zimbabwe.city.Bulawayo.suburbs
        this.universities = this.fullLocale.Zimbabwe.city.Bulawayo.universities
      } else if (this.Form.city == 'Gweru') {
        this.suburbs = this.fullLocale.Zimbabwe.city.Gweru.suburbs
        this.universities = this.fullLocale.Zimbabwe.city.Gweru.universities
      } else if (this.Form.city == 'Mutare') {
        this.suburbs = this.fullLocale.Zimbabwe.city.Mutare.suburbs
        this.universities = this.fullLocale.Zimbabwe.city.Mutare.universities
      } else if (this.Form.city == 'Masvingo') {
        this.suburbs = this.fullLocale.Zimbabwe.city.Masvingo.suburbs
        this.universities = this.fullLocale.Zimbabwe.city.Masvingo.universities
      } else if (this.Form.city == 'Marondera') {
        this.suburbs = this.fullLocale.Zimbabwe.city.Marondera.suburbs
        this.universities = this.fullLocale.Zimbabwe.city.Marondera.universities
      } else if (this.Form.city == 'Chinhoyi') {
        this.suburbs = this.fullLocale.Zimbabwe.city.Chinhoyi.suburbs
        this.universities = this.fullLocale.Zimbabwe.city.Chinhoyi.universities
      } else if (this.Form.city == 'Bindura') {
        this.suburbs = this.fullLocale.Zimbabwe.city.Bindura.suburbs
        this.universities = this.fullLocale.Zimbabwe.city.Bindura.universities
      } else if (this.Form.city == 'Gwanda') {
        this.suburbs = this.fullLocale.Zimbabwe.city.Gwanda.suburbs
        this.universities = this.fullLocale.Zimbabwe.city.Gwanda.universities
      } else if (this.Form.city == 'Lupane') {
        this.suburbs = this.fullLocale.Zimbabwe.city.Lupane.suburbs
        this.universities = this.fullLocale.Zimbabwe.city.Lupane.universities
      } else if (this.Form.city == 'Zvishavane') {
        this.suburbs = this.fullLocale.Zimbabwe.city.Zvishavane.suburbs
        this.universities = this.fullLocale.Zimbabwe.city.Zvishavane.universities
      } else {
        this.suburbs = this.fullLocale.Zimbabwe.city.Harare.suburbs
        this.universities = this.fullLocale.Zimbabwe.city.Harare.universities
      }
      this.displayBySuburb()
      this.Form.suburb = null
      this.Form.university = null
    },
    displayBySuburb() {
      this.searchByCity()
      if (this.Form.suburb && this.Form.suburb != 'null' && this.Form.suburb != null && this.Form.suburb != 'allsuburbs') {
        var index,
          tempArr = []
        for (index in this.houses) {
          if (this.houses[index].suburb == this.Form.suburb) {
            tempArr.push(this.houses[index])
          }
        }
        this.houses = tempArr
      }
      
      if (this.houses.length < 1) {
        this.errors = []
        this.errors.push('Currently no houses in ' + this.Form.suburb + ' are listed')
      }
    },
    displayByUniversity() {
      this.displayBySuburb()
      if (this.Form.university && this.Form.university != 'null' && this.Form.university != null) {
        var index, tempArr = []
        for (index in this.houses) {
          if (this.houses[index].universities.includes(this.Form.university)) {
            tempArr.push(this.houses[index])
          }
        }
      }
      this.houses = tempArr
      if (!this.houses.length) {
        this.errors = []
        this.errors.push('Currently no houses close to ' + this.Form.university + ' from ' + this.Form.suburb + ' are listed. Try choosing a different suburb')
      }
    },

    async searchByCity() {
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
        if (!this.houses.length) {
          this.errors.push('Currently no houses in ' + this.Form.city + ' are listed')
        } else {
          this.mapCenter = this.houses[0].position
        }
      }
    },
    async searchByPrice() {
      this.displayBySuburb()
      var tempHouses = this.houses
      this.houses = []
      var index
      for (index in tempHouses) {
        if (parseInt(tempHouses[index].priceValue) <= this.Form.Price) {
          this.houses.push(tempHouses[index])
        }
      }
      if (!this.houses.length) {
        this.errors = []
        this.errors.push('Available houses in ' + this.Form.city + ' are all above $' + this.Form.Price)
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
    var locale = await this.$store.dispatch('getAllLocales')
    this.fullLocale = locale.data[0]
    this.cities = Object.getOwnPropertyNames(this.fullLocale.Zimbabwe.city)
    this.cities.pop()
    this.Form.city = 'Harare'
    this.Form.suburb = 'allsuburbs'
    this.houses = this.allHousesGlobal
    this.displayCityData()
    
    if (this.$route.query.city && this.$route.query.city != null) {
      if (this.cities.includes(this.$route.query.city)) {
        this.Form.city = this.$route.query.city
      }
    }
    if (this.$route.query.suburb && this.$route.query.suburb != null) {
      if (this.suburbs.includes(this.$route.query.suburb)) {
        this.Form.suburb = this.$route.query.suburb
        this.displayCityData()
      }else if(this.$route.query.suburb == 'allsuburbs'){
        this.Form.suburb = this.$route.query.suburb
      }
    }
    if (this.$route.query.university && this.$route.query.university != null) {
      this.Form.university = this.$route.query.university
    }
    
    this.$nextTick(() => {setTimeout(() => this.$nuxt.$loading.finish(), 0)})
  },
  async asyncData({ store, params, context }) {
    if (process.server) {
      const allHousesGlobal = await store.dispatch('getAllHousesAsync')
      return {
        allHousesGlobal: allHousesGlobal.data
      }
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
@media only screen and (min-width: 756px) {
  .housefilterbutton {
    display: none;
  }
  .adsColumn {
    display: none;
  }
}

@media only screen and (max-width: 756px) {
  .adsOnPCOnly {
    display: none;
  }
}
</style>

