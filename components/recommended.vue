<template>
  <div style="width: 100%">
    <div class="section">
      <div class="container-fluid">
        <div class="row nopadding">
          <div class="col-md-12">
            <h3 class="section-title">Recommended</h3>
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
        <div class="row nopadding" v-else>
          <div class="col-md-9">

            <div class="row recommended-card" v-for="(house, index) in houses" :key="index">
              <div class="col-md-4">
                <img src="/houses/house-one.jpeg" :alt="house.title" :title="house.title" class="recommended-house-image">
              </div>
              <div class="col-md-5">
                <h3 class="section-subtitle">{{house.title}}</h3>
                <p class="section-small-text">{{house.suburb}}, {{house.city}}</p>
                <p class="section-description">
                  {{house.description}}
                </p>
                <p class="time-estimate">
                  <i class="fas fa-clock"></i> Estimated: 25 minutes to The University of Zimbabwe
                </p>
              </div>
              <div class="col-md-3 amenities">
                <h3 class="section-subtitle" style="font-size: 14px;">
                  <strong>{{house.priceCurrency}}{{house.priceValue}}/{{house.priceTime}}</strong><br>
                  <span v-if="house.priceMethod == 'perHead'" style="font-size: 12px; color: #606060;">per Person</span>
                  <span v-else-if="house.priceMethod == 'perRoom'" style="font-size: 12px; color: #606060;">per Room</span>
                  <span v-else-if="house.priceMethod == 'fullHouse'" style="font-size: 12px; color: #606060;">Full House</span>
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
          </div>

          <div class="col-md-3"><defaultAdsColumn/></div>
        </div>
      </div>
    </div>
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
      houses: null,
      errors: []
    }
  },
  async mounted() {
    var housesArr = null
    try {
      if ((housesArr = await this.$store.dispatch('getHouses', {id: 'allhouses'})))
        if (housesArr == '404')
          this.errors.push('Houses could not be retrieved')
        else 
          this.houses = housesArr.data
    } catch (e) {
      this.errors.push(e.message)
    }
  }
}
</script>