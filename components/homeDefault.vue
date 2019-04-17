<template>
  <div style="width: 100%">
    <div class="section">
      <div class="container-fluid">
        <div class="row nopadding">
          <div class="col-md-12" style="text-align: center;">
            <h3 class="section-title">Looking for Accomodation?</h3>
            <h2 class="section-subtitle-grey">Get started finding accomodation now</h2>
          </div>
        </div>
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
        <div style="width: 100%;" v-else>
          <div class="row nopadding" >
            <div class="col-md-4" style="text-align: center;">
              <h2
                class="section-subtitle-grey"
                v-if="currentLocation != null"
              >Find Accomodation in {{currentLocation}}</h2>
              <div style="width: 100%;">
                <div class="section search-form-sec">
                  <div class="container">
                    <form
                      action="#"
                      method="post"
                      novalidate="novalidate"
                      style="padding: 0 0.8rem 0 0.8rem;"
                    >
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="row">
                            <div class="col-lg-8 col-md-8 col-sm-12 p-0">
                              <select id="suburb" class="form-control search-slt" v-model="Accommodation.suburb">
                                <option :value="null">Select Suburb</option>
                                <option :value="suburb" v-for="suburb in suburbs" :key="suburb">{{suburb}}</option>
                              </select>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12 p-0">
                              <button type="button" class="default-button wrn-btn" @click="Search()">Search</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8">
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
                      <p class="time-estimate">
                        <i class="fas fa-clock"></i> Estimated: 25 minutes to The University of Zimbabwe
                      </p>
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
                        <span v-else style="font-size: 12px; color: #606060;">{{house.priceMethod}}</span>
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
</template>

<script>
import defaultAdsColumn from '@/components/defaultAdsColumn'
import axios from 'axios'
export default {
  components: {
    defaultAdsColumn: defaultAdsColumn
  },
  data() {
    return {
      houses: [],
      errors: [],
      currentLocation: null,
      suburbs: [],
      fullLocale: null,
      Accommodation: {
        suburb: '',
        city: ''
      }
    }
  },
  methods: {
    displaySuburbs() {
      this.suburbs = []
      if (this.currentLocation == 'Harare')
        this.suburbs = this.fullLocale.Zimbabwe.city.Harare.suburbs
      else if (this.currentLocation == 'Bulawayo')
        this.suburbs = this.fullLocale.Zimbabwe.city.Bulawayo.suburbs
      else if (this.currentLocation == 'Gweru')
        this.suburbs = this.fullLocale.Zimbabwe.city.Gweru.suburbs
      else if (this.currentLocation == 'Mutare')
        this.suburbs = this.fullLocale.Zimbabwe.city.Mutare.suburbs
      else if (this.currentLocation == 'Masvingo')
        this.suburbs = this.fullLocale.Zimbabwe.city.Masvingo.suburbs
      else if (this.currentLocation == 'Marondera')
        this.suburbs = this.fullLocale.Zimbabwe.city.Marondera.suburbs
      else if (this.currentLocation == 'Chinhoyi')
        this.suburbs = this.fullLocale.Zimbabwe.city.Chinhoyi.suburbs
      else if (this.currentLocation == 'Bindura')
        this.suburbs = this.fullLocale.Zimbabwe.city.Bindura.suburbs
      else if (this.currentLocation == 'Gwanda')
        this.suburbs = this.fullLocale.Zimbabwe.city.Gwanda.suburbs
      else if (this.currentLocation == 'Lupane')
        this.suburbs = this.fullLocale.Zimbabwe.city.Lupane.suburbs
      else if (this.currentLocation == 'Zvishavane')
        this.suburbs = this.fullLocale.Zimbabwe.city.Zvishavane.suburbs
      else this.suburbs = this.fullLocale.Zimbabwe.city.Harare.suburbs
    },
    Search(){
      this.Accommodation.city = this.currentLocation
      window.location.href = '/houses/find/?city=' + this.Accommodation.city + '&suburb=' + this.Accommodation.suburb
    }
  },
  async mounted() {
    var housesArr = null
    try {
      if (
        (housesArr = await this.$store.dispatch('getHouses', {
          id: 'allhouses'
        }))
      )
        if (housesArr == '404')
          this.errors.push('Houses could not be retrieved')
        else {
          var index = null
          var houses = housesArr.data
          for (index in houses) {
            if (houses[index].status == 'Active')
              this.houses.push(houses[index])
          }
        }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          var API =
            'api/maps/api/geocode/json?latlng=' +
            position.coords.latitude +
            ',' +
            position.coords.longitude +
            '&key=' +
            process.env.googleMapsKey
          axios
            .get(API)
            .then(response => {
              this.currentLocation =
                response.data.results[
                  response.data.results.length - 3
                ].formatted_address
              this.currentLocation = this.currentLocation.split(', ')
              if (this.currentLocation.length)
                this.currentLocation = this.currentLocation[
                  this.currentLocation.length - 2
                ]
              if (this.currentLocation.includes('/')) {
                this.currentLocation = this.currentLocation.split('/')
                this.currentLocation = this.currentLocation[
                  this.currentLocation.length - 1
                ]
              }
            })
            .catch(e => {
              this.errors.push(e)
            })
        })
      }else{
        await axios.get('api2/', function(response) {
            this.currentLocation = response.city
        }, "jsonp");
      }

      var locale = await this.$store.dispatch('getAllLocales')
      this.fullLocale = locale.data[0]
      this.cities = Object.getOwnPropertyNames(this.fullLocale.Zimbabwe.city)
      this.cities.pop()
      this.displaySuburbs()
    } catch (e) {
      this.errors.push(e.message)
    }
  }
}
</script>