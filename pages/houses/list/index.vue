<template>
  <div style="width: 100%; background: #eee; padding-bottom: 20px;">
    <div class="container-fluid" style="margin-bottom: 20px;">
      <div class="container">
        <div class="row">
          <div class="col-md-2 dashboard-greeting-display">
            <NuxtLink
              :to="{path: '/profile/' + userProfile.username}"
              title="Profile"
              style="color: #606060;"
            >
              <div class="user-profile">
                <div class="profile-image">
                  <div
                    v-if="userProfile.profileImage"
                    class="ratio img-responsive img-circle"
                    :title="userProfile.firstname + ' ' + userProfile.lastname"
                    :alt="userProfile.firstname + ' ' + userProfile.lastname"
                    v-bind:style="{
                      backgroundImage: 'url(' + userProfile.profileImage.path + ')'
                    }"
                  ></div>
                  <div
                    v-else
                    class="ratio img-responsive img-circle"
                    style="background-image: url(/profileImages/user.png);"
                    :title="userProfile.firstname + ' ' + userProfile.lastname"
                    :alt="userProfile.firstname + ' ' + userProfile.lastname"
                  ></div>
                </div>
                <br>
                {{userProfile.firstname}} {{userProfile.lastname}}
              </div>
            </NuxtLink>
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
                        <div class="form-section" style="width: 100%;" v-if="page == 1">
                          <div class="row">
                            <div class="col-md-12">
                              <h2 class="subheading-three">Let’s get started listing your space.</h2>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5 listing-input-div">
                              <select class="form-control-edit">
                                <option value="Full House">Full House</option>
                                <option value="Cottage">Cottage</option>
                                <option value="Private Room">Private Room</option>
                                <option value="Shared Room">Shared Room</option>
                              </select>
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <select class="form-control-edit">
                                <option value="1">One Room</option>
                                <option value="2">Two Rooms</option>
                                <option value="3">Three Rooms</option>
                                <option value="4">Four Rooms</option>
                                <option value="5">Five Rooms</option>
                                <option value="6">Five Rooms</option>
                                <option value="7">Six Rooms</option>
                                <option value="8">Seven Rooms</option>
                                <option value="9">Eight Rooms</option>
                                <option value="10">Nine Rooms</option>
                              </select>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5 listing-input-div">
                              <select class="form-control-edit">
                                <option value="Harare">Harare</option>
                              </select>
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <select class="form-control-edit">
                                <option value="Belgravia">Belgravia</option>
                                <option value="Avenues">Avenues</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <!-- Page 2 : What kind of Place are you listing?-->
                        <div class="form-section" style="width: 100%;" v-if="page == 2">
                          <div class="row">
                            <div class="col-md-12">
                              <h2 class="subheading-three">What kind of Place are you listing?</h2>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5 listing-input-div">
                              <select class="form-control-edit">
                                <option value="Apartment">Apartment</option>
                                <option value="House">House</option>
                                <option value="Hostel">Hostel</option>
                                <option value="Hostel">Hotel</option>
                              </select>
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <select class="form-control-edit">
                                <option value="1">Characteristics</option>
                                <option value="2">Serviced</option>
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
                              <select id="dedicated-space" class="form-control-edit">
                                <option value="1">Yes, it’s primarily set up for guests</option>
                                <option value="2">No, there are my personal belongings</option>
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
                              <select id="on-behalf" class="form-control-edit">
                                <option value="1">Yes, I work for or run a hospitality business</option>
                                <option value="2">No, I'm listing on my own behalf</option>
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
                              <select id="furnished-or-not" class="form-control-edit">
                                <option value="1">Yes, it is fully furnished</option>
                                <option value="2">It is partially furnished</option>
                                <option value="3">No, it is not furnished</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <!-- Page 3 : How many people can your place accommodate?-->
                        <div class="form-section" style="width: 100%;" v-if="page == 3">
                          <div class="row">
                            <div class="col-md-12">
                              <h2
                                class="subheading-three"
                              >How many people can your place accommodate?</h2>
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
                                      v-on:click.prevent="guestcount = guestcount - 1"
                                    >
                                      <i class="fa fa-minus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                  <input
                                    type="number"
                                    name="quant[2]"
                                    class="form-control guest-count"
                                    :value="guestcount"
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
                                      v-on:click.prevent="guestcount = guestcount + 1"
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
                                      v-on:click.prevent="bedroomcount = bedroomcount - 1"
                                    >
                                      <i class="fa fa-minus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                  <input
                                    type="number"
                                    name="quant[2]"
                                    class="form-control guest-count"
                                    :value="bedroomcount"
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
                                      v-on:click.prevent="bedroomcount = bedroomcount + 1"
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
                                      v-on:click.prevent="countperbedroom = countperbedroom - 1"
                                    >
                                      <i class="fa fa-minus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                  <input
                                    type="number"
                                    name="quant[2]"
                                    class="form-control guest-count"
                                    :value="countperbedroom"
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
                                      v-on:click.prevent="countperbedroom = countperbedroom + 1"
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

                        <!-- Page 4 : Available Spaces?-->
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
                                      v-on:click.prevent="kitchencount = kitchencount - 1"
                                    >
                                      <i class="fa fa-minus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                  <input
                                    type="number"
                                    name="quant[2]"
                                    class="form-control guest-count"
                                    :value="kitchencount"
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
                                      v-on:click.prevent="kitchencount = kitchencount + 1"
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
                              >How many bathrooms?</label>
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
                                      v-on:click.prevent="bathroomcount = bathroomcount - 1"
                                    >
                                      <i class="fa fa-minus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                  <input
                                    type="number"
                                    name="quant[2]"
                                    class="form-control guest-count"
                                    :value="bathroomcount"
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
                                      v-on:click.prevent="bathroomcount = bathroomcount + 1"
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
                                      v-on:click.prevent="studyroomcount = studyroomcount - 1"
                                    >
                                      <i class="fa fa-minus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                  <input
                                    type="number"
                                    name="quant[2]"
                                    class="form-control guest-count"
                                    :value="studyroomcount"
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
                                      v-on:click.prevent="studyroomcount = studyroomcount + 1"
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
                                      v-on:click.prevent="diningroomcount = diningroomcount - 1"
                                    >
                                      <i class="fa fa-minus" aria-hidden="true"></i>
                                    </button>
                                  </span>
                                  <input
                                    type="number"
                                    name="quant[2]"
                                    class="form-control guest-count"
                                    :value="diningroomcount"
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
                                      v-on:click.prevent="diningroomcount = diningroomcount + 1"
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

                        <!-- Page 5 : Will you tell us more about the location?-->
                        <div class="form-section" style="width: 100%;" v-if="page == 5">
                          <div class="row">
                            <div class="col-md-12">
                              <h2 class="subheading-three">Will you tell us more about the location?</h2>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5 listing-input-div">
                              <select class="form-control-edit">
                                <option value="0">House Number</option>
                                <option v-for="index in 60" :key="index" :value="index">{{index}}</option>
                              </select>
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <input
                                type="text"
                                class="form-control-edit"
                                style="border-radius: 1px;"
                                placeholder="Street"
                              >
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5 listing-input-div">
                              <select class="form-control-edit">
                                <option value="0">Suburb</option>
                                <option value="Belgravia">Belgravia</option>
                                <option value="Avondale">Avondale</option>
                              </select>
                            </div>
                            <div class="col-md-5 listing-input-div">
                              <input
                                type="text"
                                class="form-control-edit"
                                style="border-radius: 1px;"
                                placeholder="Township or District"
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
                                  :zoom="10"
                                  :center="{lat: mapCenter.lat, lng: mapCenter.lng}"
                                >
                                  <Gmap-Marker
                                    v-for="(marker, index) in markers"
                                    :key="index"
                                    :position="marker.position"
                                  ></Gmap-Marker>
                                  <Gmap-Marker
                                    v-if="this.place"
                                    label="{this.place}"
                                    style="background-color: red; width: 200px;"
                                    :position="{lat: this.place.geometry.location.lat(), lng: this.place.geometry.location.lng(),}"
                                  ></Gmap-Marker>
                                </Gmap-Map>
                              </no-ssr>
                            </div>
                          </div>
                        </div>

                        <!-- Page 6 : What amenities do you offer?-->
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
                                <input type="checkbox" id="beds" class="badgebox">
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="essentials" class="btn btn-success amenities">
                                <i class="fas fa-briefcase"></i> Essentials
                                <input type="checkbox" id="essentials" class="badgebox">
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="wifi" class="btn btn-success amenities">
                                <i class="fas fa-wifi"></i> Wifi
                                <input type="checkbox" id="wifi" class="badgebox">
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-3 listing-input-div">
                              <label for="desks" class="btn btn-success amenities">
                                <i class="fas fa-table"></i> Desks
                                <input type="checkbox" id="desks" class="badgebox">
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="drawer" class="btn btn-success amenities">
                                <i class="fas fa-archway"></i> Drawers
                                <input type="checkbox" id="drawer" class="badgebox">
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="television" class="btn btn-success amenities">
                                <i class="fas fa-tv"></i> TV
                                <input type="checkbox" id="television" class="badgebox">
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-3 listing-input-div">
                              <label for="pool" class="btn btn-success amenities">
                                <i class="fas fa-swimming-pool"></i> Pool
                                <input type="checkbox" id="pool" class="badgebox">
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="laundry" class="btn btn-success amenities">
                                <i class="fas fa-tshirt"></i> Laundry
                                <input type="checkbox" id="laundry" class="badgebox">
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="parking" class="btn btn-success amenities">
                                <i class="fas fa-car"></i> Parking
                                <input type="checkbox" id="parking" class="badgebox">
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-3 listing-input-div">
                              <label for="elevator" class="btn btn-success amenities">
                                <i class="fab fa-accessible-icon"></i> Elevator
                                <input type="checkbox" id="elevator" class="badgebox">
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="hottub" class="btn btn-success amenities">
                                <i class="fas fa-hot-tub"></i> Hot Tub
                                <input type="checkbox" id="hottub" class="badgebox">
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="gym" class="btn btn-success amenities">
                                <i class="fas fa-dumbbell"></i> Gym
                                <input type="checkbox" id="gym" class="badgebox">
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-3 listing-input-div">
                              <label for="firstaid" class="btn btn-warning amenities">
                                <i class="fas fa-first-aid"></i> First Aid
                                <input type="checkbox" id="firstaid" class="badgebox">
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="fire" class="btn btn-warning amenities">
                                <i class="fas fa-fire-extinguisher"></i> Extinguisher
                                <input type="checkbox" id="fire" class="badgebox">
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                            <div class="col-md-3 listing-input-div">
                              <label for="locks" class="btn btn-warning amenities">
                                <i class="fas fa-lock"></i> Locks
                                <input type="checkbox" id="locks" class="badgebox">
                                <span class="badge">&check;</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <!-- Page 7 : Upload Images -->
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
                              ></textarea>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-10 listing-input-div">
                              <div class="row" style="width: 100%;">
                                <div class="col-sm-6 imgUp">
                                  <div class="imagePreview">
                                    <img style="width: 100%;" v-if="imageUrl" :src="imageUrl">
                                  </div>
                                  <label
                                    class="btn default-button"
                                    style="border-radius: 0px 0px 1px 1px;"
                                  >
                                    Upload
                                    <input
                                      type="file"
                                      class="img"
                                      value="Upload Photo"
                                      style="width: 0px;height: 0px;overflow: hidden;"
                                      @change="onFileChange"
                                    >
                                  </label>
                                </div>
                                <i class="fa fa-plus imgAdd"></i>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- Page 8 : Confirmation Page -->
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
                                  <input type="checkbox" value checked>
                                  <span class="cr">
                                    <i class="cr-icon fa fa-check"></i>
                                  </span>
                                </label>
                              </div>

                              <br>
                              <button
                                class="default-button"
                                style="width: 95%;"
                                v-on:click.prevent="addListing"
                                v-if="page >= 8"
                              >Add Listing</button>
                            </div>
                          </div>
                          <div class="col-md-4"></div>
                        </div>

                        <div class="row" style="margin-top: 50px;">
                          <div class="col-md-12" style="width: 100%;">
                            <div class="container">
                              <div style="float: left; width: 50%;">
                                <button
                                  class="default-button"
                                  style="width: 100px;"
                                  v-if="page != 1"
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
          <div class="col-md-3">Hie</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Collegehub | List your house'
    }
  },
  data() {
    return {
      userProfile: '',
      errors: '',
      page: 1,
      guestcount: 1,
      bedroomcount: 1,
      countperbedroom: 1,
      kitchencount: 1,
      bathroomcount: 1,
      studyroomcount: 0,
      diningroomcount: 1,
      markers: [],
      place: null,
      mapCenter: { lat: -17.82422, lng: 31.049363 },
      imageUrl: null
    }
  },
  methods: {
    nextPage: function(event) {
      this.page = this.page + 1
    },
    prevPage: function(event) {
      this.page = this.page - 1
    },
    setPlace(place) {
      this.place = place
    },
    usePlace(place) {
      if (this.place) {
        this.markers.push({
          position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng()
          }
        }),
          (this.mapCenter.lat = this.place.geometry.location.lat())
        this.mapCenter.lng = this.place.geometry.location.lng()
        this.place = null
      }
    },
    onFileChange(e) {
      const file = e.target.files[0]
      this.imageUrl = URL.createObjectURL(file)
    },
    addListing: function(event) {}
  },
  async created() {
    try {
      this.userProfile = await this.$store.dispatch('getProfile', {
        id: this.$store.state.authUser.user.username
      })
      this.userProfile = this.userProfile.data.user
    } catch (e) {
      this.error = e.message
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
</style>

