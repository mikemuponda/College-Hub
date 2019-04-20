<template>
  <div style="width: 100%; background: #eee; padding-bottom: 20px;">
    <div class="container-fluid" style="margin-bottom: 20px;">
      <div class="row">
        <div class="col-md-2 dashboard-greeting-display" v-if="userProfile != false">
          <greetingColumn/>
        </div>
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
                      <select class="form-control search-slt" style="border-radius: 4px;" v-model="Form.university">
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
                      <select class="form-control search-slt" style="border-radius: 4px;" v-model="Form.suburb">
                        <option :value="null">Select Suburb</option>
                        <option
                          :value="suburb"
                          v-for="suburb in suburbs"
                          :key="suburb"
                        >{{suburb}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="row housefilterbutton" style="margin-top: 5px; margin-bottom: 5px;">
                    <div class="col-md-12 nopadding">
                      <button style="border-radius: 4px;" type="button" @click="search()" class="default-button wrn-btn">Filter</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="container-fluid adsOnPCOnly">
              <adsbygoogle/>
            </div>
          </div>
        </div>
        <div class="col-md-7">
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
                        <GmapMap
                          :key="index"
                          v-for="(m, index) in houses"
                          :position="m.position"
                          :center="mapCenter"
                          :zoom="14"
                          map-type-id="terrain"
                          style="width: 100%; height: 100%"
                        >
                          <GmapMarker
                            :key="index"
                            v-for="(m, index) in houses"
                            :position="m.position"
                            :clickable="true"
                            :draggable="true"
                            @click="center=m.position"
                          />
                        </GmapMap>
                      </no-ssr>
                    </div>
                    
                    <div class="row recommended-card" v-for="(house, index) in houses" :key="index">
                      <NuxtLink
                        :to="'/houses/view/' + house._id"
                        :title="house.title"
                        style="width: 100%; color: #000;"
                      >
                        <div class="row">
                          <div class="col-md-4">
                            <img
                              src="/houses/house-one.jpeg"
                              :alt="house.title"
                              :title="house.title"
                              class="recommended-house-image"
                            >
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
        <div class="col-md-3 adsColumn">
          <defaultAdsColumn/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import greetingColumn from '@/components/defaultGreetingColumn'
import defaultAdsColumn from '@/components/defaultAdsColumn'
export default {
  components: {
    greetingColumn: greetingColumn,
    defaultAdsColumn: defaultAdsColumn
  },
  head() {
    return {
      title: 'Collegehub | Find a house'
    }
  },
  data() {
    return {
      userProfile: '',
      errors: [],
      houses: [],
      Form: {
        city: null,
        university: null,
        suburb: null
      },
      fullLocale: null,
      cities: null,
      suburbs: null,
      universities: null,
      locationCookie: null,
      mapCenter: {
        lat: -17.82422,
        lng: 31.049363
      }
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
      this.search()
    },
    async search() {
      if (this.Form.city != null) {
        this.errors = []
        var tempHouses = await this.$store.dispatch('getHousesByCity', {id: this.Form.city})
        this.houses = tempHouses.data
        this.mapCenter = this.houses[0].position
        if (!this.houses.length) {
          this.errors.push(
            'Currently no houses in ' + this.Form.city + ' are listed'
          )
        }
      }
    }
  },
  async mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    if (this.$store.state.authUser) {
      try {
        this.userProfile = await this.$store.dispatch('getProfile', {
          id: this.$store.state.authUser.user.username
        })
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

    if (this.$route.query.city && this.$route.query.city != null) {
      if(this.cities.includes(this.$route.query.city)){
        this.Form.city = this.$route.query.city
      }else{
        this.Form.city = 'Harare'
      }
    }else{
      this.Form.city = 'Harare'
    }
    if (this.$route.query.suburb && this.$route.query.suburb != null) {
      this.Form.suburb = this.$route.query.suburb
    }
    if (this.$route.query.university && this.$route.query.university != null) {
      this.Form.university = this.$route.query.university
    }
    this.displayCityData()
    this.search()
    this.$nextTick(() => {
      setTimeout(() => this.$nuxt.$loading.finish(), 0)
    })
  }
}
</script>

<style>
@media only screen and (min-width: 756px) {
  .housefilterbutton{
    display: none;
  }
  .adsColumn{
    display: none;
  }
}

@media only screen and (max-width: 756px) {
  .adsOnPCOnly{
    display: none;
  }
}
</style>

