<template>
  <div style="width: 100%">
    <div class="section">
      <div class="container-fluid">
        <div class="row nopadding">
          <div class="col-md-12" style="text-align: center;">
            <h3 class="section-title">Looking for Accomodation?</h3>
            <h2
              class="section-subtitle-grey"
              v-if="currentLocation != null"
            >Get started finding accomodation in {{currentLocation}}</h2>
            <h2 class="section-subtitle-grey" v-else>Get started finding accomodation now</h2>
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
          <div class="row nopadding">
            <div class="col-md-5" style="text-align: center;">
              <div style="width: 100%;">
                <div class="section search-form-sec">
                  <form
                    action="#"
                    method="post"
                    novalidate="novalidate"
                    style="padding: 0 0.8rem 0 0.8rem;"
                  >
                    <div class="row">
                      <div class="col-md-12">
                        <div style="height: 60px;">
                          <label
                            for="accomodationCity"
                            style="float: left; width: 30%; margin-right: 2%; margin-top: 10px;"
                          >Change City:</label>
                          <select
                            id="accomodationCity"
                            class="form-control search-slt"
                            v-model="Accommodation.city"
                            style="float: left; width: 68%;"
                            @change="displaySuburbs()"
                          >
                            <option
                              v-if="currentLocation != null"
                              :value="currentLocation"
                            >{{currentLocation}}</option>
                            <option v-else :value="null">Choose City</option>
                            <option :value="city" v-for="city in cities" :key="city">{{city}}</option>
                          </select>
                        </div>
                        <div style="height: 60px;">
                          <label
                            for="accomodationSuburb"
                            style="float: left; width: 30%; margin-right: 2%; margin-top: 10px;"
                          >Suburb:</label>
                          <select
                            id="accomodationSuburb"
                            class="form-control search-slt"
                            v-model="Accommodation.suburb"
                            style="float: left; width: 68%;"
                          >
                            <option :value="null">Select Suburb</option>
                            <option
                              :value="suburb"
                              v-for="suburb in suburbs"
                              :key="suburb"
                            >{{suburb}}</option>
                          </select>
                        </div>

                        <div>
                          <button
                            type="button"
                            style="border-radius: 2px;"
                            class="default-button wrn-btn"
                            @click="Search()"
                          >Find</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <div class="container">
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

        <div class="row" style="padding-top: 100px;">
          <div class="col-md-12" style="text-align: center;">
            <div class="row">
              <div class="col-md-12">
                <h3 class="section-title">Feeling hungry?</h3>
                <h2 class="section-subtitle-grey">Choose from 13 restaurants close to you</h2>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="container">
                  <img
                    src="/img/collegehub-hamburger.png"
                    style="width: 60%;"
                    title="Find Restaurants"
                    alt="Find Restaurants"
                  >
                </div>
              </div>
              <div class="col-md-6">
                <div class="container">
                  <h2
                    class="section-subtitle-grey"
                    style="color: #000; margin-top: 40px; padding-bottom: 20px;"
                  >Pick a Restaurant</h2>
                  <div class="section search-form-sec">
                    <form
                      action="#"
                      method="post"
                      novalidate="novalidate"
                      style="padding: 0 0.8rem 0 0.8rem;"
                    >
                      <div class="row">
                        <div class="col-md-12">
                          <div style="height: 60px;">
                            <label
                              for="restuarantName"
                              style="float: left; width: 30%; margin-right: 2%; margin-top: 10px;"
                            >Restaurant:</label>
                            <select
                              id="restuarantName"
                              class="form-control search-slt"
                              v-model="Restaurant.name"
                              style="float: left; width: 68%;"
                            >
                              <option :value="null">Choose Restaurant</option>
                              <option value="Chicken Inn">Chicken Inn</option>
                              <option value="Nandos">Nandos</option>
                              <option value="Pizza Inn">Pizza Inn</option>
                            </select>
                          </div>
                          <div style="height: 60px;">
                            <label
                              for="RestaurantMenu"
                              style="float: left; width: 30%; margin-right: 2%; margin-top: 10px;"
                            >Menu:</label>
                            <select
                              id="RestaurantMenu"
                              class="form-control search-slt"
                              v-model="Restaurant.menu"
                              style="float: left; width: 68%;"
                            >
                              <option :value="null">Menu</option>
                              <option value="Burger Menu">Burger Menu</option>
                            </select>
                          </div>

                          <div>
                            <button
                              type="button"
                              style="border-radius: 2px;"
                              class="default-button wrn-btn"
                            >Order</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row" style="padding-top: 10px;">
          <div class="col-md-12" style="text-align: center;">
            <div class="row">
              <div class="col-md-12">
                <h3 class="section-title">Need to go Somewhere?</h3>
                <h2 class="section-subtitle-grey">There are 6 Taxis close to your Location</h2>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="container">
                  <h2 class="section-subtitle-grey" style="color: #000;">Select your destination</h2>
                  <div class="section search-form-sec">
                    <form
                      action="#"
                      method="post"
                      novalidate="novalidate"
                      style="padding: 0 0.8rem 0 0.8rem;"
                    >
                      <div class="row">
                        <div class="col-md-12">
                          <div style="height: 60px;">
                            <label
                              for="taxiFrom"
                              style="float: left; width: 30%; margin-right: 2%; margin-top: 10px;"
                            >From:</label>
                            <select
                              id="taxiFrom"
                              class="form-control search-slt"
                              v-model="Taxi.from"
                              style="float: left; width: 68%;"
                            >
                              <option :value="null">Current Location</option>
                              <option
                                :value="suburb"
                                v-for="suburb in suburbs"
                                :key="suburb"
                              >{{suburb}}</option>
                            </select>
                          </div>
                          <div style="height: 60px;">
                            <label
                              for="taxiTo"
                              style="float: left; width: 30%; margin-right: 2%; margin-top: 10px;"
                            >To:</label>
                            <select
                              id="taxiTo"
                              class="form-control search-slt"
                              v-model="Taxi.to"
                              style="float: left; width: 68%;"
                            >
                              <option :value="null">Select Suburb</option>
                              <option
                                :value="suburb"
                                v-for="suburb in suburbs"
                                :key="suburb"
                              >{{suburb}}</option>
                            </select>
                          </div>

                          <div>
                            <button
                              type="button"
                              style="border-radius: 2px;"
                              class="default-button wrn-btn"
                            >Go</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="container">
                  <div class="taxiMapDisplay">
                    <no-ssr>
                      <GmapMap
                        :center="userCurrentCoord"
                        :zoom="18"
                        map-type-id="terrain"
                        style="width: 100%; height: 100%"
                      >
                        <GmapMarker
                          :key="index"
                          v-for="(m, index) in TaxiMapmarkers"
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
        </div>

        <div class="row" style="padding-top: 100px;">
          <div class="col-md-12" style="text-align: center;">
            <div class="row">
              <div class="col-md-12">
                <h3 class="section-title">Feeling bored?</h3>
                <h2
                  class="section-subtitle-grey"
                  v-if="currentLocation != null"
                >Get a listing of all upcoming events in {{currentLocation}}</h2>
                <h2
                  class="section-subtitle-grey"
                  v-else
                >Get a listing of all upcoming events in your area</h2>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-md-4 dashboard-greeting-display" v-for="x in 9" :key="x">
                  <NuxtLink :to="'/events/view/event1'" title="View Event" style="color: #606060;">
                    <div class="row nopadding feature">
                      <div class="nopadding" style="width: 40%; float: left;">
                        <img
                          class="img-fluid mb-3 mb-md-0 feature-img"
                          src="/img/collegehub-coding.jpeg"
                          alt="View Event"
                        >
                      </div>
                      <div style="width: 60%; float: left;">
                        <p
                          class="feature-heading"
                          style="padding-bottom: 0px; margin-bottom: 0px;"
                        >Hackathon at HIT</p>
                        <p
                          class="feature-text"
                          style="padding-top: 0px; margin-top: 0px;"
                        >Compete with the finest developers in Harare?</p>
                      </div>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row" style="padding-top: 100px;">
          <div class="col-md-12" style="text-align: center;">
            <div class="row">
              <div class="col-md-12">
                <h3 class="section-title">Marketplace</h3>
                <h2 class="section-subtitle-grey" >Buy and sell goods and services to other college students</h2>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <h2 class="section-title" style="font-size: 16px; margin-bottom: 30px; font-weight: 450;">Sell something</h2>
                  <div class="section search-form-sec">
                    <form
                      action="#"
                      method="post"
                      novalidate="novalidate"
                      style="padding: 0 0.8rem 0 0.8rem;"
                    >
                      <div class="row">
                        <div class="col-md-12">
                          <div style="height: 60px;">
                            <input type="text" class="form-control search-slt" v-model="Selling.productName" placeholder="What are you selling"/>
                          </div>
                          <div style="height: 60px;">
                            <input type="text" class="form-control search-slt" v-model="Selling.price" placeholder="Price"/>
                          </div>

                          <div>
                            <button
                              type="button"
                              style="border-radius: 2px;"
                              class="default-button wrn-btn"
                            >Sell</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="col-md-8">
                  <h2 class="section-title" style="font-size: 16px; margin-bottom: 30px; font-weight: 450;">Buy something</h2>
                  <div class="row">
                    <div class="col-md-4" v-for="x in 3" :key="x">
                      <NuxtLink
                        :to="'/marketplace/view/' + x"
                        title="Buy Iphone"
                        style="width: 100%; color: #000;"
                      >
                        <div class="item-box" style="margin-top: 0px; border-radius: 4px;">
                          <img src="/img/collegehub-phone-buy.png" title="Buy Iphone" alt="Buy Iphone" style="width: 100%;"/>
                          <div style="width: 100%; text-align: left; padding: 0px 10px 10px 10px;">
                            <p class="section-title" style="font-size: 14px; font-weight: 450; margin: 0px; padding-top: 0px;">64GB Iphone 8</p>
                            <p style="font-size: 12px; color: #aaa; font-weight: 400; margin: 0px;">$400 &middot; {{currentLocation}} &middot; Posted {{x}} hours ago</p>
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
      cities: [],
      suburbs: [],
      fullLocale: null,
      Accommodation: {
        suburb: null,
        city: null
      },
      Taxi: {
        from: null,
        to: null
      },
      Restaurant: {
        name: null,
        menu: null
      },
      Selling: {
        productName: null,
        price: null
      },
      TaxiMapmarkers: [{ position: { lat: -17.82422, lng: 31.049363 } }],
      userCurrentCoord: {
        lat: -17.82422,
        lng: 31.049363
      }
    }
  },
  methods: {
    displaySuburbs() {
      this.suburbs = []
      if (this.Accommodation.city == 'Harare')
        this.suburbs = this.fullLocale.Zimbabwe.city.Harare.suburbs
      else if (this.Accommodation.city == 'Bulawayo')
        this.suburbs = this.fullLocale.Zimbabwe.city.Bulawayo.suburbs
      else if (this.Accommodation.city == 'Gweru')
        this.suburbs = this.fullLocale.Zimbabwe.city.Gweru.suburbs
      else if (this.Accommodation.city == 'Mutare')
        this.suburbs = this.fullLocale.Zimbabwe.city.Mutare.suburbs
      else if (this.Accommodation.city == 'Masvingo')
        this.suburbs = this.fullLocale.Zimbabwe.city.Masvingo.suburbs
      else if (this.Accommodation.city == 'Marondera')
        this.suburbs = this.fullLocale.Zimbabwe.city.Marondera.suburbs
      else if (this.Accommodation.city == 'Chinhoyi')
        this.suburbs = this.fullLocale.Zimbabwe.city.Chinhoyi.suburbs
      else if (this.Accommodation.city == 'Bindura')
        this.suburbs = this.fullLocale.Zimbabwe.city.Bindura.suburbs
      else if (this.Accommodation.city == 'Gwanda')
        this.suburbs = this.fullLocale.Zimbabwe.city.Gwanda.suburbs
      else if (this.Accommodation.city == 'Lupane')
        this.suburbs = this.fullLocale.Zimbabwe.city.Lupane.suburbs
      else if (this.Accommodation.city == 'Zvishavane')
        this.suburbs = this.fullLocale.Zimbabwe.city.Zvishavane.suburbs
      else this.suburbs = this.fullLocale.Zimbabwe.city.Harare.suburbs
    },
    Search() {
      window.location.href =
        '/houses/find/?city=' +
        this.Accommodation.city +
        '&suburb=' +
        this.Accommodation.suburb
    }
  },
  async mounted() {
    var housesArr = null
    try {
      if (housesArr = await this.$store.dispatch('getHouses', {id: 'allhouses'})){
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
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.userCurrentCoord.lat = position.coords.latitude
          this.userCurrentCoord.lng = position.coords.longitude
          var position = {
            position: {
              lat: this.userCurrentCoord.lat,
              lng: this.userCurrentCoord.lng
            }
          }
          this.TaxiMapmarkers.push(position)
          var API =
            'api/maps/api/geocode/json?latlng=' +
            this.userCurrentCoord.lat +
            ',' +
            this.userCurrentCoord.lng +
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
      } else {
        await axios.get(
          'api2/',
          function(response) {
            this.currentLocation = response.city
          },
          'jsonp'
        )
      }

      var locale = await this.$store.dispatch('getAllLocales')
      this.fullLocale = locale.data[0]
      this.cities = Object.getOwnPropertyNames(this.fullLocale.Zimbabwe.city)
      this.cities.pop()
      this.Accommodation.city = this.currentLocation
      this.displaySuburbs()
    } catch (e) {
      this.errors.push(e.message)
    }
  }
}
</script>