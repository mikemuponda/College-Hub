<template>
  <div style="width: 100%; background: #eee; padding-bottom: 20px;">
    <div class="container-fluid" style="margin-bottom: 20px;">
      <div class="row">
        <div class="col-md-2 dashboard-greeting-display">
          <greetingColumn/>
        </div>
        <div class="col-md-7">
          <div class="container">
            <div class="row default-user-panel" style="margin-top: 5px;">
              <form method="post" style="width: 100%;">
                <div class="row nopadding" style="width: 100%;">
                  <div class="col-md-12 nopadding" style="margin-top: 10px;">
                    <div class="edit-profile-section profile-head nopadding">
                      <ul class="nav nav-tabs">
                        <li class="nav-item">
                          <a class="nav-link active" style="padding-left: 30px;">Add a listing</a>
                        </li>
                      </ul>
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

                      <!-- Page 1 : Let’s get started listing your space.-->
                      <transition name="fade">
                        <div class="form-section" style="width: 100%;" v-if="page == 1">
                          <div class="row">
                            <div class="col-md-12">
                              <h2 class="subheading-three">Let’s get started listing your space.</h2>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5 listing-input-div">
                              <select class="form-control-edit" v-model="Form.spaceType">
                                <option :value="null">Select Space</option>
                                <option value="Full House">Full House</option>
                                <option value="Cottage">Cottage</option>
                                <option value="Private Room">Private Room</option>
                                <option value="Shared Room">Shared Room</option>
                              </select>
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <select class="form-control-edit" v-model="Form.totalRoomCount">
                                <option :value="null">Total Rooms Available</option>
                                <option value="One Room">One Room</option>
                                <option value="Two Rooms">Two Rooms</option>
                                <option value="Three Rooms">Three Rooms</option>
                                <option value="Four Rooms">Four Rooms</option>
                                <option value="Five Rooms">Five Rooms</option>
                                <option value="Six Rooms">Six Rooms</option>
                                <option value="Seven Rooms">Seven Rooms</option>
                                <option value="Eight Rooms">Eight Rooms</option>
                                <option value="Nine Rooms">Nine Rooms</option>
                                <option value="Ten Rooms">Ten Rooms</option>
                              </select>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5 listing-input-div">
                              <select class="form-control-edit" v-model="Form.city" @change="displayCityData()">
                                <option :value="null">Select City</option>
                                <option v-for="city in cities" :value="city" :key="city">{{city}}</option>
                              </select>
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <select class="form-control-edit" v-model="Form.suburb">
                                <option :value="null"> Select Suburb</option>
                                <option v-for="suburb in suburbs" :value="suburb" :key="suburb">{{suburb}}</option>
                              </select>
                            </div>
                          </div>

                          <div class="row" style="margin-top: 20px;">
                            <div class="col-md-1"></div>
                            <div class="col-md-11">
                              <div class="row">
                                <div class="agree" style="text-align: center; height: 30px; margin-left: 20px;" v-for="university in universities" :value="university" :key="university">
                                  <label style="font-size: 1em; float: left;">
                                    <input type="checkbox" @change="addUni(university)">
                                    <span class="cr">
                                      <i class="cr-icon fa fa-check"></i>
                                    </span>
                                  </label>
                                  <p style="float: left;">{{university}}</p>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </transition>

                      <!-- Page 2 : What kind of Place are you listing?-->
                      <transition name="fade">
                        <div class="form-section" style="width: 100%;" v-if="page == 2">
                          <div class="row">
                            <div class="col-md-12">
                              <h2 class="subheading-three">What kind of Place are you listing?</h2>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-1"></div>
                            <div
                              class="col-md-5 listing-input-div"
                              v-if="Form.spaceType != 'Private Room' && Form.spaceType != 'Shared Room'"
                            >
                              <label
                                class="listing-label"
                                for="specificSpaceType"
                              >Please specify the type of space you are sharing.</label>
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <select class="form-control-edit" v-model="Form.specificSpaceType" id="specificSpaceType">
                                <option :value="null">Specify the type of Space</option>
                                <option value="Apartment">Apartment</option>
                                <option value="House">House</option>
                                <option
                                  value="Hostel"
                                  v-if="Form.spaceType == 'Private Room' || Form.spaceType == 'Shared Room'"
                                >Hostel</option>
                                <option
                                  value="Hotel"
                                  v-if="Form.spaceType == 'Private Room' || Form.spaceType == 'Shared Room'"
                                >Hotel</option>
                              </select>
                            </div>
                            <div
                              class="col-md-5 listing-input-div"
                              v-if="Form.spaceType == 'Private Room' || Form.spaceType == 'Shared Room'"
                            >
                              <select class="form-control-edit" v-model="Form.features">
                                <option :value="null">Features</option>
                                <option value="serviced">serviced</option>
                                <option value="non-serviced">non-serviced</option>
                              </select>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5 listing-input-div">
                              <label
                                class="listing-label"
                                for="dedicated-space"
                              >Is this set up as a dedicated guest space?</label>
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <select
                                id="dedicated-space"
                                class="form-control-edit"
                                v-model="Form.isDedicated"
                              >
                                <option :value="null">Is your space dedicated for guests</option>
                                <option :value="true">Yes, it’s primarily set up for guests</option>
                                <option :value="false">No, there are my personal belongings</option>
                              </select>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5 listing-input-div">
                              <label
                                class="listing-label"
                                for="on-behalf"
                              >Are you listing on behalf of a company?</label>
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <select
                                id="on-behalf"
                                class="form-control-edit"
                                v-model="Form.onBehalf"
                              >
                                <option :value="null">Listing on behalf?</option>
                                <option :value="true">Yes, I work for or run a hospitality business</option>
                                <option :value="false">No, I'm listing on my own behalf</option>
                              </select>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5 listing-input-div">
                              <label
                                class="listing-label"
                                for="furnished-or-not"
                              >Is this space furnished?</label>
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <select
                                id="furnished-or-not"
                                class="form-control-edit"
                                v-model="Form.furnishStatus"
                              >
                                <option :value="null">Is this space furnished</option>
                                <option value="Fully Furnished">Yes, it is fully furnished</option>
                                <option value="Partially Furnished">It is partially furnished</option>
                                <option value="Not Furnished">No, it is not furnished</option>
                              </select>
                            </div>
                          </div>
                        </div>
                       </transition>

                      <!-- Page 3 : How many people can your place accommodate?-->
                      <transition name="fade">
                        <div class="form-section" style="width: 100%;" v-if="page == 3">
                          <div class="row">
                            <div class="col-md-12">
                              <h2 class="subheading-three">How many people can your place accommodate?</h2>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5 listing-input-div">
                              <label
                                class="listing-label"
                                for="furnished-or-not"
                              >Total number of guests who can be accommodated</label>
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <div class="center">
                                <div class="input-group">
                                  <span class="input-group-btn">
                                    <button
                                      type="button"
                                      class="btn btn-danger btn-number"
                                      data-type="minus"
                                      data-field="quant[2]"
                                      v-on:click.prevent="Form.guestcount = Form.guestcount - 1"
                                    >
                                      <i class="fa fa-minus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                  <input
                                    type="number"
                                    name="quant[2]"
                                    class="form-control guest-count"
                                    :value="Form.guestcount"
                                    min="1"
                                    max="100"
                                    style="border-radius: 4px;"
                                  >
                                  <span class="input-group-btn">
                                    <button
                                      type="button"
                                      class="btn btn-success btn-number"
                                      data-type="plus"
                                      data-field="quant[2]"
                                      v-on:click.prevent="Form.guestcount = Form.guestcount + 1"
                                      style="margin-right: 10px;"
                                    >
                                      <i class="fa fa-plus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                </div>
                                <p></p>
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5 listing-input-div">
                              <label
                                class="listing-label"
                                for="furnished-or-not"
                              >Number of bedrooms available</label>
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <div class="center">
                                <div class="input-group">
                                  <span class="input-group-btn">
                                    <button
                                      type="button"
                                      class="btn btn-danger btn-number"
                                      data-type="minus"
                                      data-field="quant[2]"
                                      v-on:click.prevent="Form.bedroomcount = Form.bedroomcount - 1"
                                    >
                                      <i class="fa fa-minus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                  <input
                                    type="number"
                                    name="quant[2]"
                                    class="form-control guest-count"
                                    :value="Form.bedroomcount"
                                    min="1"
                                    max="100"
                                    style="border-radius: 4px;"
                                  >
                                  <span class="input-group-btn">
                                    <button
                                      type="button"
                                      class="btn btn-success btn-number"
                                      data-type="plus"
                                      data-field="quant[2]"
                                      v-on:click.prevent="Form.bedroomcount = Form.bedroomcount + 1"
                                      style="margin-right: 10px;"
                                    >
                                      <i class="fa fa-plus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                </div>
                                <p></p>
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5 listing-input-div">
                              <label
                                class="listing-label"
                                for="furnished-or-not"
                              >Number of people per bedroom</label>
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <div class="center">
                                <div class="input-group">
                                  <span class="input-group-btn">
                                    <button
                                      type="button"
                                      class="btn btn-danger btn-number"
                                      data-type="minus"
                                      data-field="quant[2]"
                                      v-on:click.prevent="Form.countperbedroom = Form.countperbedroom - 1"
                                    >
                                      <i class="fa fa-minus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                  <input
                                    type="number"
                                    name="quant[2]"
                                    class="form-control guest-count"
                                    :value="Form.countperbedroom"
                                    min="1"
                                    max="5"
                                    style="border-radius: 4px;"
                                  >
                                  <span class="input-group-btn">
                                    <button
                                      type="button"
                                      class="btn btn-success btn-number"
                                      data-type="plus"
                                      data-field="quant[2]"
                                      v-on:click.prevent="Form.countperbedroom = Form.countperbedroom + 1"
                                      style="margin-right: 10px;"
                                    >
                                      <i class="fa fa-plus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                </div>
                                <p></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </transition>

                      <!-- Page 4 : Available Spaces?-->
                      <transition name="fade">
                        <div class="form-section" style="width: 100%;" v-if="page == 4">
                          <div class="row">
                            <div class="col-md-12">
                              <h2 class="subheading-three">Available Spaces?</h2>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5 listing-input-div">
                              <label class="listing-label" for="furnished-or-not">How many kitchens?</label>
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <div class="center">
                                <div class="input-group">
                                  <span class="input-group-btn">
                                    <button
                                      type="button"
                                      class="btn btn-danger btn-number"
                                      data-type="minus"
                                      data-field="quant[2]"
                                      v-on:click.prevent="Form.kitchencount = Form.kitchencount - 1"
                                    >
                                      <i class="fa fa-minus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                  <input
                                    type="number"
                                    name="quant[2]"
                                    class="form-control guest-count"
                                    :value="Form.kitchencount"
                                    min="1"
                                    max="100"
                                    style="border-radius: 4px;"
                                  >
                                  <span class="input-group-btn">
                                    <button
                                      type="button"
                                      class="btn btn-success btn-number"
                                      data-type="plus"
                                      data-field="quant[2]"
                                      v-on:click.prevent="Form.kitchencount = Form.kitchencount + 1"
                                      style="margin-right: 10px;"
                                    >
                                      <i class="fa fa-plus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                </div>
                                <p></p>
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5 listing-input-div">
                              <label class="listing-label" for="furnished-or-not">How many bathrooms?</label>
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <div class="center">
                                <div class="input-group">
                                  <span class="input-group-btn">
                                    <button
                                      type="button"
                                      class="btn btn-danger btn-number"
                                      data-type="minus"
                                      data-field="quant[2]"
                                      v-on:click.prevent="Form.bathroomcount = Form.bathroomcount - 1"
                                    >
                                      <i class="fa fa-minus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                  <input
                                    type="number"
                                    name="quant[2]"
                                    class="form-control guest-count"
                                    :value="Form.bathroomcount"
                                    min="1"
                                    max="100"
                                    style="border-radius: 4px;"
                                  >
                                  <span class="input-group-btn">
                                    <button
                                      type="button"
                                      class="btn btn-success btn-number"
                                      data-type="plus"
                                      data-field="quant[2]"
                                      v-on:click.prevent="Form.bathroomcount = Form.bathroomcount + 1"
                                      style="margin-right: 10px;"
                                    >
                                      <i class="fa fa-plus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                </div>
                                <p></p>
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5 listing-input-div">
                              <label
                                class="listing-label"
                                for="furnished-or-not"
                              >How many Study Rooms?</label>
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <div class="center">
                                <div class="input-group">
                                  <span class="input-group-btn">
                                    <button
                                      type="button"
                                      class="btn btn-danger btn-number"
                                      data-type="minus"
                                      data-field="quant[2]"
                                      v-on:click.prevent="Form.studyroomcount = Form.studyroomcount - 1"
                                    >
                                      <i class="fa fa-minus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                  <input
                                    type="number"
                                    name="quant[2]"
                                    class="form-control guest-count"
                                    :value="Form.studyroomcount"
                                    min="1"
                                    max="100"
                                    style="border-radius: 4px;"
                                  >
                                  <span class="input-group-btn">
                                    <button
                                      type="button"
                                      class="btn btn-success btn-number"
                                      data-type="plus"
                                      data-field="quant[2]"
                                      v-on:click.prevent="Form.studyroomcount = Form.studyroomcount + 1"
                                      style="margin-right: 10px;"
                                    >
                                      <i class="fa fa-plus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                </div>
                                <p></p>
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5 listing-input-div">
                              <label
                                class="listing-label"
                                for="furnished-or-not"
                              >How many Dining/Sitting Rooms or Lounges?</label>
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <div class="center">
                                <div class="input-group">
                                  <span class="input-group-btn">
                                    <button
                                      type="button"
                                      class="btn btn-danger btn-number"
                                      data-type="minus"
                                      data-field="quant[2]"
                                      v-on:click.prevent="Form.diningroomcount = Form.diningroomcount - 1"
                                    >
                                      <i class="fa fa-minus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                  <input
                                    type="number"
                                    name="quant[2]"
                                    class="form-control guest-count"
                                    :value="Form.diningroomcount"
                                    min="1"
                                    max="100"
                                    style="border-radius: 4px;"
                                  >
                                  <span class="input-group-btn">
                                    <button
                                      type="button"
                                      class="btn btn-success btn-number"
                                      data-type="plus"
                                      data-field="quant[2]"
                                      v-on:click.prevent="Form.diningroomcount = Form.diningroomcount + 1"
                                      style="margin-right: 10px;"
                                    >
                                      <i class="fa fa-plus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                </div>
                                <p></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </transition>

                      <!-- Page 5 : Will you tell us more about the location?-->
                      <transition name="fade">
                        <div class="form-section" style="width: 100%;" v-if="page == 5">
                          <div class="row">
                            <div class="col-md-12">
                              <h2 class="subheading-three">Will you tell us more about the location?</h2>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5 listing-input-div">
                              <input
                                type="text"
                                class="form-control-edit"
                                style="border-radius: 1px;"
                                placeholder="House Number"
                                v-model="Form.addressHouseNumber"
                              >
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <input
                                type="text"
                                class="form-control-edit"
                                style="border-radius: 1px;"
                                placeholder="Street"
                                v-model="Form.addressStreet"
                              >
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5 listing-input-div">
                              <input
                                type="text"
                                class="form-control-edit"
                                style="border-radius: 1px;"
                                placeholder="Suburb"
                                v-model="Form.addressSuburb"
                              >
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <input
                                type="text"
                                class="form-control-edit"
                                style="border-radius: 1px;"
                                placeholder="Township or District"
                                v-model="Form.addressTownship"
                              >
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-10 listing-input-div">
                              <no-ssr>
                                <gmap-autocomplete
                                  placeholder="Location"
                                  class="form-control-edit gmap"
                                  @place_changed="setPlace"
                                ></gmap-autocomplete>
                              </no-ssr>
                            </div>
                          </div><br>
                          <div class="row">
                            <div class="col-md-12">
                              <h2 class="subheading-three" style="font-size: 14px;">Please drag the marker to the location of your space</h2>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-1"></div>
                            <div
                              class="col-md-10 listing-input-div"
                              style="width: 100%; height:50vh;"
                            >
                              <no-ssr>
                                <Gmap-Map
                                  style="height: 100%"
                                  class="gmap"
                                  :zoom="13"
                                  :center="{lat: mapCenter.lat, lng: mapCenter.lng}"
                                >
                                  <Gmap-Marker
                                    v-for="(marker, index) in markers"
                                    :key="index"
                                    :position="marker.position"
                                  ></Gmap-Marker>
                                  <Gmap-Marker
                                    :icon="{ url: require('@/assets/icons/map-marker.png')}"
                                    :draggable="true"
                                    :clickable="true"
                                    @dragend="resetCoordinates"
                                    style="background-color: red; width: 200px;"
                                    :position="{lat: this.Form.position.lat, lng: this.Form.position.lng,}"
                                  ></Gmap-Marker>
                                </Gmap-Map>
                              </no-ssr>
                            </div>
                          </div>
                        </div>
                      </transition>

                      <!-- Page 6 : What amenities do you offer?-->
                      <transition name="fade">
                        <div class="form-section" style="width: 100%;" v-if="page == 6">
                          <div class="row">
                            <div class="col-md-12">
                              <h2 class="subheading-three">What amenities do you offer?</h2>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-3 listing-input-div">
                              <label for="beds" class="btn btn-success amenities">
                                <i class="fas fa-bed"></i> Beds
                                <input
                                  type="checkbox"
                                  :value="true"
                                  id="beds"
                                  class="badgebox"
                                  v-model="Form.amenities.beds"
                                >
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="essentials" class="btn btn-success amenities">
                                <i class="fas fa-briefcase"></i> Essentials
                                <input
                                  type="checkbox"
                                  :value="true"
                                  id="essentials"
                                  class="badgebox"
                                  v-model="Form.amenities.essentials"
                                >
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="wifi" class="btn btn-success amenities">
                                <i class="fas fa-wifi"></i> Wifi
                                <input
                                  type="checkbox"
                                  :value="true"
                                  id="wifi"
                                  class="badgebox"
                                  v-model="Form.amenities.wifi"
                                >
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-3 listing-input-div">
                              <label for="desks" class="btn btn-success amenities">
                                <i class="fas fa-table"></i> Desks
                                <input
                                  type="checkbox"
                                  :value="true"
                                  id="desks"
                                  class="badgebox"
                                  v-model="Form.amenities.desks"
                                >
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="drawer" class="btn btn-success amenities">
                                <i class="fas fa-archway"></i> Drawers
                                <input
                                  type="checkbox"
                                  :value="true"
                                  id="drawer"
                                  class="badgebox"
                                  v-model="Form.amenities.drawer"
                                >
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="television" class="btn btn-success amenities">
                                <i class="fas fa-tv"></i> TV
                                <input
                                  type="checkbox"
                                  :value="true"
                                  id="television"
                                  class="badgebox"
                                  v-model="Form.amenities.television"
                                >
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-3 listing-input-div">
                              <label for="pool" class="btn btn-success amenities">
                                <i class="fas fa-swimming-pool"></i> Pool
                                <input
                                  type="checkbox"
                                  :value="true"
                                  id="pool"
                                  class="badgebox"
                                  v-model="Form.amenities.pool"
                                >
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="laundry" class="btn btn-success amenities">
                                <i class="fas fa-tshirt"></i> Laundry
                                <input
                                  type="checkbox"
                                  :value="true"
                                  id="laundry"
                                  class="badgebox"
                                  v-model="Form.amenities.laundry"
                                >
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="parking" class="btn btn-success amenities">
                                <i class="fas fa-car"></i> Parking
                                <input
                                  type="checkbox"
                                  :value="true"
                                  id="parking"
                                  class="badgebox"
                                  v-model="Form.amenities.parking"
                                >
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-3 listing-input-div">
                              <label for="elevator" class="btn btn-success amenities">
                                <i class="fab fa-accessible-icon"></i> Elevator
                                <input
                                  type="checkbox"
                                  :value="true"
                                  id="elevator"
                                  class="badgebox"
                                  v-model="Form.amenities.elevator"
                                >
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="hottub" class="btn btn-success amenities">
                                <i class="fas fa-hot-tub"></i> Hot Tub
                                <input
                                  type="checkbox"
                                  :value="true"
                                  id="hottub"
                                  class="badgebox"
                                  v-model="Form.amenities.hottub"
                                >
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="gym" class="btn btn-success amenities">
                                <i class="fas fa-dumbbell"></i> Gym
                                <input
                                  type="checkbox"
                                  :value="true"
                                  id="gym"
                                  class="badgebox"
                                  v-model="Form.amenities.gym"
                                >
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-3 listing-input-div">
                              <label for="firstaid" class="btn btn-warning amenities">
                                <i class="fas fa-first-aid"></i> First Aid
                                <input
                                  type="checkbox"
                                  :value="true"
                                  id="firstaid"
                                  class="badgebox"
                                  v-model="Form.amenities.firstaid"
                                >
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="fireextinguisher" class="btn btn-warning amenities">
                                <i class="fas fa-fire-extinguisher"></i> Extinguisher
                                <input
                                  type="checkbox"
                                  :value="true"
                                  id="fireextinguisher"
                                  class="badgebox"
                                  v-model="Form.amenities.fireextinguisher"
                                >
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="locks" class="btn btn-warning amenities">
                                <i class="fas fa-lock"></i> Locks
                                <input
                                  type="checkbox"
                                  :value="true"
                                  id="locks"
                                  class="badgebox"
                                  v-model="Form.amenities.locks"
                                >
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </transition>

                      <!-- Page 7 : Upload Images -->
                      <transition name="fade">
                        <div class="form-section" style="width: 100%;" v-if="page == 7">
                          <div class="row">
                            <div class="col-md-12">
                              <h2 class="subheading-three">Set the scene</h2>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-10 listing-input-div">
                              <input
                                type="text"
                                class="form-control-edit"
                                style="border-radius: 1px;"
                                placeholder="Title"
                                v-model="Form.title"
                              >
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-10 listing-input-div">
                              <textarea
                                class="form-control-edit"
                                style="border-radius: 1px;"
                                placeholder="Describe your place"
                                rows="4"
                                maxlength="200"
                                minlength="1500"
                                v-model="Form.description"
                              ></textarea>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-10 listing-input-div">
                              <div class="container">
                                  <div class="dropbox">
                                    <input type="file" multiple :name="uploadFieldName"  @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                                      accept="image/*" class="input-file">
                                      <p>
                                        Drag your image(s) here<br> or click to browse
                                      </p>
                                  </div>

                                
                              </div>
                            </div>
                          </div><br>
                          <div class="row">
                            <div class="col-md-12">
                              <h2 class="subheading-three">Set the price</h2>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-2 listing-input-div">
                              <select class="form-control-edit" v-model="Form.priceCurrency">
                                <option :value="null">Currency</option>
                                <option value="ZW$">RTGS $</option>
                                <option value="US$">US $</option>
                                <option value="SAR">SA R</option>
                                <option value="BWP">BW P</option>
                                <option value="GB£">GB £</option>
                                <option value="EU€">EU €</option>
                              </select>
                            </div>
                            <div class="col-md-2 listing-input-div">
                              <input
                                type="number"
                                class="form-control-edit"
                                style="border-radius: 1px;"
                                placeholder="Price"
                                v-model="Form.priceValue"
                              >
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <select class="form-control-edit" v-model="Form.priceMethod">
                                <option :value="null">Pricing Method</option>
                                <option value="perHead">per Person</option>
                                <option value="perRoom">per Room</option>
                                <option value="fullHouse">Full House</option>
                              </select>
                            </div>
                            <div class="col-md-2 listing-input-div">
                              <select class="form-control-edit" v-model="Form.priceTime">
                                <option :value="null">Unit Time</option>
                                <option value="Week">per Week</option>
                                <option value="Month">per Month</option>
                                <option value="Semester">per Semester</option>
                                <option value="Year">per Year</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </transition>

                      <!-- Page 8 : Confirmation Page -->
                      <transition name="fade">
                        <div class="form-section" style="width: 100%;" v-if="page == 8">
                          <div class="row">
                            <div class="col-md-12">
                              <h2 class="subheading-three">Confirm and Add listing</h2>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-4"></div>
                            <div class="col-md-4 listing-input-div">
                              <p style="font-size: 12px; text-align: center;">
                                Please click to confirm that your information is correct and complies
                                with our terms and conditions.
                              </p>
                              <div class="agree" style="text-align: center;">
                                <label style="font-size: 2.5em;">
                                  <input type="checkbox" value checked required>
                                  <span class="cr">
                                    <i class="cr-icon fa fa-check"></i>
                                  </span>
                                </label>
                              </div>

                              <br>
                              <button
                                class="default-button"
                                style="width: 95%; margin-top: 10px;"
                                v-on:click.prevent="addListing"
                                v-if="page == 8"
                              >Add Listing</button>
                            </div>
                          </div>
                          <div class="col-md-4"></div>
                        </div>
                      </transition>

                      <!-- Page 9 : Response Page -->
                      <transition name="fade">
                        <div class="form-section" style="width: 100%;" v-if="page == 9 && submitted">
                          <div class="row">
                            <div class="col-md-12">
                              <h2 class="subheading-three">Your Listing has been added</h2>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="alert alert-success">
                                Your listing has successfully been added.
                              </div>
                            </div>
                          </div>
                        </div>
                      </transition>

                      <div class="row" style="margin-top: 50px;">
                        <div class="col-md-12" style="width: 100%;">
                          <div class="container">
                            <div style="float: left; width: 50%;">
                              <button
                                class="default-button"
                                style="width: 100px;"
                                v-if="page > 1 && page < 9"
                                v-on:click.prevent="prevPage"
                              >Back</button>
                              <p style="color: #fff;">.</p>
                            </div>
                            <div style="float: left; width: 50%;">
                              <button
                                class="default-button"
                                style="width: 100px; float: right;"
                                v-on:click.prevent="nextPage"
                                v-if="page < 8"
                              >Next</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <br>
                    </div>
                  </div>
                </div>
              </form>
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
  middleware: 'auth',
  components: {
    greetingColumn: greetingColumn,
    defaultAdsColumn: defaultAdsColumn
  },
  data() {
    return {
      userProfile: '',
      errors: [],
      page: 1,
      submitted: false,
      uniCounter: 0,
      fullLocale: null,
      cities: [],
      suburbs: [],
      universities: [],
      Form: {
        owner: null,
        spaceType: null,
        totalRoomCount: null,
        city: null,
        suburb: null,
        universities: [],
        specificSpaceType: null,
        isDedicated: null,
        onBehalf: null,
        furnishStatus: null,
        guestcount: 1,
        bedroomcount: 1,
        countperbedroom: 1,
        kitchencount: 1,
        bathroomcount: 1,
        studyroomcount: 0,
        diningroomcount: 1,
        addressHouseNumber: null,
        addressStreet: null,
        addressSuburb: null,
        addressTownship: null,
        position: {
          lat: -17.82422,
          lng: 31.049363
        },
        features: null,
        amenities: {
          beds: false,
          essentials: false,
          wifi: false,
          desks: false,
          drawer: false,
          television: false,
          pool: false,
          laundry: false,
          parking: false,
          elevator: false,
          hottub: false,
          gym: false,
          firstaid: false,
          fireextinguisher: false,
          locks: false
        },
        title: null,
        description: null,
        priceCurrency: null,
        priceValue: null,
        priceMethod: null,
        priceTime: null,
        status: 'Active',
        createdAt: new Date(),
      },
      formData: null,
      uploadFieldName: 'accommodationImages',
      markers: [],
      place: null,
      mapCenter: { lat: -17.82422, lng: 31.049363 },
      imageUrl: null
    }
  },
  methods: {
    displayCityData() {
      this.suburbs = []
      this.universities = []
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
    },
    nextPage: function(event) {
      if (this.page == 1) {
        this.errors = []
        if (!this.Form.spaceType)
          this.errors.push('Please select the space that you are listing')
        if (!this.Form.totalRoomCount)
          this.errors.push('Please enter number of rooms you are sharing')
        if (!this.Form.city)
          this.errors.push(
            'Please select the city in which your space is located'
          )
        if (!this.Form.suburb)
          this.errors.push(
            'Please select the suburb in which your space is located'
          )
        if(this.uniCounter <= 0)
          this.errors.push('Please select at least one university from ' + this.Form.city)
        if (
          this.Form.spaceType &&
          this.Form.totalRoomCount &&
          this.Form.city &&
          this.Form.suburb &&
          this.uniCounter >= 1
        ) {
          this.page = this.page + 1
          this.errors = []
        }
      } else if (this.page == 2) {
        this.errors = []
        if (!this.Form.specificSpaceType)
          this.errors.push('Please specify the type of space')
        if (this.Form.isDedicated == null)
          this.errors.push(
            'Please highlight if your space is dedicated for guests'
          )
        if (this.Form.onBehalf == null)
          this.errors.push(
            'Please highlight if you are listing on behalf of someone or a company'
          )
        if (this.Form.furnishStatus == null)
          this.errors.push('Please highlight if your space is furnished')
        if (
          this.Form.specificSpaceType &&
          this.Form.isDedicated != null &&
          this.Form.onBehalf != null &&
          this.Form.furnishStatus != null
        ) {
          this.page = this.page + 1
          this.errors = []
        }
      } else if (this.page == 3) {
        this.errors = []
        if (this.Form.guestcount < 1)
          this.errors.push('Number of guests should be at least 1')
        if (this.Form.bedroomcount < 1)
          this.errors.push('Number of bedrooms should be at least 1')
        if (this.Form.countperbedroom < 1)
          this.errors.push('Number of people per bedroom should be at least 1')
        if (
          this.Form.guestcount >= 1 &&
          this.Form.bedroomcount >= 1 &&
          this.Form.countperbedroom >= 1
        ) {
          this.page = this.page + 1
          this.errors = []
        }
      } else if (this.page == 4) {
        this.errors = []
        if (
          this.Form.kitchencount < 0 ||
          this.Form.bathroomcount < 0 ||
          this.Form.studyroomcount < 0 ||
          this.Form.diningroomcount < 0
        )
          this.errors.push('Please make sure that numbers are at least 0')
        if (
          this.Form.kitchencount >= 0 &&
          this.Form.bathroomcount >= 0 &&
          this.Form.studyroomcount >= 0 &&
          this.Form.diningroomcount >= 0
        ) {
          this.page = this.page + 1
          this.errors = []
        }
      } else if (this.page == 5) {
        this.errors = []
        if (
          !this.Form.addressHouseNumber ||
          !this.Form.addressStreet ||
          !this.Form.addressSuburb
        )
          this.errors.push('Please enter your full address')
        if (this.Form.position.lat == null || this.Form.position.lng == null)
          this.errors.push('Please pinpoint your space on the Map')
        if (
          this.Form.addressHouseNumber &&
          this.Form.addressStreet &&
          this.Form.addressSuburb
        ) {
          this.page = this.page + 1
          this.errors = []
        }
      } else if (this.page == 6) {
        this.page = this.page + 1
        this.errors = []
      }else if (this.page == 7) {
        this.errors = []
        if (!this.Form.title)
          this.errors.push('Please enter a title')
        if (!this.Form.description)
          this.errors.push('Please enter a short description')
        if (!this.Form.priceCurrency)
          this.errors.push('Please select currency')
        if (!this.Form.priceValue)
          this.errors.push('Please enter amount')
        if (this.Form.priceValue < 1)
          this.errors.push('Please enter a valid price')
        if (!this.Form.priceMethod)
          this.errors.push('Please select how you intend to price your space')
        if (!this.Form.priceTime)
          this.errors.push('Please select unit time')

        if (this.Form.description && this.Form.title && this.Form.priceCurrency && this.Form.priceValue && this.Form.priceMethod && this.Form.priceTime && this.Form.priceValue >= 1){
          this.page = this.page + 1
          this.errors = []
        }
      } else {
        this.page = this.page + 1
      }
    },
    prevPage: function(event) {
      this.page = this.page - 1
    },
    setPlace(place) {
      this.place = place
      this.Form.position.lat = this.place.geometry.location.lat()
      this.Form.position.lng = this.place.geometry.location.lng()
      this.mapCenter.lat = this.Form.position.lat
      this.mapCenter.lng = this.Form.position.lng
    },
    resetCoordinates(place){
      this.Form.position.lat = place.latLng.lat()
      this.Form.position.lng = place.latLng.lng()
    },
    onFileChange(e) {
      const file = e.target.files[0]
      this.imageUrl = URL.createObjectURL(file)
    },
    filesChange(fieldName, fileList) {
        // handle file changes
        this.formData = new FormData();

        if (!fileList.length) return;

        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            this.formData.append(fieldName, fileList[x], fileList[x].name);
          });

       
    },
    async addListing(e) {
      if (!this.errors.length) {
        var added;
        try {
          if(added = await this.$store.dispatch('addListing', this.Form)){
            await this.$store.dispatch('uploadAccommodationImages', {formData: this.formData, id: added.data[0]._id})
            this.submitted = true
            this.page = this.page + 1
            this.Form = ''
          }else{
            this.errors.push('There was a problem listing your space')
          }
        } catch (e) {
          this.errors.push(e.message)
        }
      }
      e.preventDefault()
    },
    addUni(uni){
      var index = this.Form.universities.indexOf(uni)
      if (index >= 0) {
        this.Form.universities.splice(index, 1);
        uni = null
        this.uniCounter = this.uniCounter - 1
      }
      if(uni != null){
        this.Form.universities.push(uni)
        this.uniCounter = this.uniCounter + 1
      }
    },
  },
  async mounted() {
    this.$nextTick(() => {this.$nuxt.$loading.start()})
    try {
      this.userProfile = await this.$store.dispatch('getProfile', {id: this.$store.state.authUser.user.username})
      this.userProfile = this.userProfile.data.user
      this.Form.owner = this.userProfile._id

      var locale = await this.$store.dispatch('getAllLocales')
      this.fullLocale = locale.data[0]
      this.cities = Object.getOwnPropertyNames(this.fullLocale.Zimbabwe.city)
      this.cities.pop()
    } catch (e) {
      this.error = e.message
    }
    this.$nextTick(() => {setTimeout(() => this.$nuxt.$loading.finish(), 0)})
  },
  head() {
    return {
      title: 'List Space | Collegehub Zimbabwe',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'List your space on Collegehub in less than a minute and host students to generate revenue. Collegehub is the premier service for accommodation listing for students in Zimbabwe.'
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://www.collegehub.co.zw/accommodation/list'
        }
      ],
    }
  }
}
</script>

<style>
.listing-input-div {
  margin-top: 15px;
  margin-left: 5px;
}

.guest-count {
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;
}

.listing-label {
  font-size: 13px;
  font-weight: 400;
}

.listing-input-div .amenities {
  width: 100%;
  padding-left: 0px;
  padding-right: 0px;
  font-size: 12px;
  color: #fff;
}

.badgebox {
  opacity: 0;
}

.badgebox + .badge {
  text-indent: -999999px;
  width: 27px;
  padding-top: 4px;
  padding-bottom: 4px;
}

.badgebox:focus + .badge {
  box-shadow: inset 0px 0px 5px;
}

.badgebox:checked + .badge {
  text-indent: 0;
}

.imagePreview {
  width: 100%;
  background-position: center center;
  background-color: #fff;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  box-shadow: 0px -3px 6px 2px rgba(0, 0, 0, 0.2);
}

.imgUp {
  margin-bottom: 15px;
}

.imgAdd {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #4bd7ef;
  color: #fff;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.2);
  text-align: center;
  line-height: 30px;
  margin-top: 0px;
  cursor: pointer;
  font-size: 15px;
}

.gmap {
  width: 99%;
}

.agree{
  width: 100%;
  height: 18px;
}

.agree label:after {
  content: '';
  display: table;
  clear: both;
}
.agree .cr {
  position: relative;
  display: inline-block;
  border: 1px solid #a9a9a9;
  border-radius: 0.25em;
  width: 1.3em;
  height: 1.3em;
  margin-right: 0.5em;
}
.agree .cr .cr-icon {
  position: absolute;
  font-size: 0.8em;
  line-height: 0;
  top: 50%;
  left: 20%;
}
.agree label input[type='checkbox'] {
  display: none;
}
.agree label input[type='checkbox'] + .cr > .cr-icon {
  transform: scale(3) rotateZ(-20deg);
  opacity: 0;
  transition: all 0.3s ease-in;
}
.agree label input[type='checkbox']:checked + .cr > .cr-icon {
  transform: scale(1) rotateZ(0deg);
  opacity: 1;
}
.agree label input[type='checkbox']:disabled + .cr {
  opacity: 0.5;
}

@media (max-width: 762px) {
  .listing-input-div {
    margin-left: 15px;
  }
  .guest-count {
    width: 100%;
  }
  .listing-input-div .amenities {
    width: 95%;
    font-size: 16px;
  }
  .gmap {
    width: 95%;
  }
}

  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
    width: 100%;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>

