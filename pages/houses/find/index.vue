<template>
  <div style="width: 100%; background: #eee; padding-bottom: 20px;">
    <div class="container-fluid" style="margin-bottom: 20px;">
      <div class="row">
        <div class="col-md-2 dashboard-greeting-display" v-if="userProfile != false">
          <greetingColumn/>
        </div>
        <div class="col-md-2 dashboard-greeting-display" v-else>
          <div class="item-box">Filters Here</div>
        </div>
        <div class="col-md-7">
          <div class="container">
            <div class="row default-user-panel" style="margin-top: 5px;">
              <div style="margin-top: 20px; width: 100%;">
                <div class="section search-form-sec">
                  <div class="container">
                    <form novalidate="novalidate" style="padding: 0 0.8rem 0 0.8rem;">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="row">
                            <div class="col-lg-4 col-md-4 col-sm-12 p-0">
                              <select class="form-control search-slt" v-model="Form.city">
                                <option :value="null">Select City</option>
                                <option value="Harare">Harare</option>
                                <option value="Bulawayo">Bulawayo</option>
                                <option value="Gweru">Gweru</option>
                                <option value="Mutare">Mutare</option>
                                <option value="Masvingo">Masvingo</option>
                                <option value="Marondera">Marondera</option>
                                <option value="Chinhoyi">Chinhoyi</option>
                                <option value="Bindura">Bindura</option>
                                <option value="Gwanda">Gwanda</option>
                                <option value="Lupane">Lupane</option>
                              </select>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12 p-0">
                              <select class="form-control search-slt" v-model="Form.university">
                                <option :value="null">Select University</option>
                                <option v-if="Form.city=='Harare'" value="University of Zimbabwe">University of Zimbabwe</option>
                                <option v-if="Form.city=='Harare'" value="Harare Institute of Technology">Harare Institute of Technology</option>
                                <option v-if="Form.city=='Harare'" value="Women's University in Africa">Women's University in Africa</option>
                                <option v-if="Form.city=='Harare'" value="Zimbabwe Open University">Zimbabwe Open University</option>
                                <option v-if="Form.city=='Harare'" value="Catholic University in Zimbabwe">Catholic University in Zimbabwe</option>
                                <option v-if="Form.city=='Harare'" value="Southern Africa Methodist University">Southern Africa Methodist University</option>
                                <option v-if="Form.city=='Bulawayo'" value="National University of Science and Technology">National University of Science and Technology</option>
                                <option v-if="Form.city=='Bulawayo'" value="Solusi University">Solusi University</option>
                                <option v-if="Form.city=='Bulawayo'" value="Gwanda State University">Gwanda State University</option>
                                <option v-if="Form.city=='Gweru'" value="Midlands State University">Midlands State University</option>
                                <option v-if="Form.city=='Mutare'" value="Africa University">Africa University</option>
                                <option v-if="Form.city=='Mutare'" value="Manicaland University of Science and Technology">Manicaland University of Science and Technology</option>
                                <option v-if="Form.city=='Masvingo'" value="Great Zimbabwe University">Great Zimbabwe University</option>
                                <option v-if="Form.city=='Masvingo'" value="Reformed Church University">Reformed Church University</option>
                                <option v-if="Form.city=='Marondera'" value="Marondera University of Agricultural Sciences and Technology">Marondera University of Agricultural Sciences and Technology</option>
                                <option v-if="Form.city=='Marondera'" value="Women's University in Africa">Women's University in Africa</option>
                                <option v-if="Form.city=='Chinhoyi'" value="Chinhoyi University of Technology">Chinhoyi University of Technology</option>
                                <option v-if="Form.city=='Bindura'" value="Bindura University of Science Education">Bindura University of Science Education</option>
                                <option v-if="Form.city=='Bindura'" value="Zimbabwe Ezekiel Guti University">Zimbabwe Ezekiel Guti University</option>
                                <option v-if="Form.city=='Gwanda'" value="Gwanda State University">Gwanda State University</option>
                                <option v-if="Form.city=='Lupane'" value="Lupane State University">Lupane State University</option>
                              </select>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12 p-0">
                              <button type="button" class="btn wrn-btn">Search</button>
                            </div>
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
        <div class="col-md-3">
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
      errors: '',
      Form: {
        city: null,
        university: null
      }
    }
  },
  methods: {
    onchange(){

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
    this.$nextTick(() => {
      setTimeout(() => this.$nuxt.$loading.finish(), 0)
    })
  }
}
</script>
