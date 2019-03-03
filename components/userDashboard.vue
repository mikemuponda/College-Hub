<template>
  <div style="width: 100%; background: #fff;">
    <div class="container-fluid" style="margin-bottom: 20px;">
      <div class="row dashboard-nav">
        <div class="col-md-12">
          <div class="dir">
            <p class="dashboard-text">
              <strong>Dashboard</strong>
            </p>
          </div>
          <div class="user-menu">
            <div class="inner-div">
              <NuxtLink
                :to="'/notifications'"
                title="Notifications"
                style="color: #aaa;"
                class="user-menu-icon"
              >
                <i class="fas fa-bell"></i>
              </NuxtLink>
              <NuxtLink
                :to="'/messages'"
                title="Messages"
                style="color: #aaa;"
                class="user-menu-icon"
              >
                <i class="fas fa-comment"></i>
              </NuxtLink>
              <NuxtLink
                :to="'/profile'"
                title="Profile"
                style="color: #aaa;"
                class="user-menu-icon"
              >
                <i class="fas fa-user"></i>
              </NuxtLink>
              <NuxtLink :to="'/logout'" title="Logout" style="color: #aaa;" class="user-menu-icon">
                <i class="fas fa-sign-out-alt"></i>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row section">
          <div class="col-md-3" style="padding-bottom: 10px; padding-top: 5px; overflow: hidden;">
            <div class="row nopadding feature">
              <div class="nopadding" style="width: 40%; float: left;">
                <img
                  class="img-fluid mb-3 mb-md-0 feature-img"
                  src="/img/collegehub-selling-something.jpeg"
                  alt
                >
              </div>
              <div style="width: 60%; float: left;">
                <p class="feature-text">In search of a home?</p>
                <p class="feature-heading">Find a house</p>
              </div>
            </div>
          </div>

          <div class="col-md-3" style="padding-bottom: 10px; padding-top: 5px; overflow: hidden;">
            <div class="row nopadding feature">
              <div class="nopadding" style="width: 40%; float: left;">
                <img class="img-fluid mb-3 mb-md-0 feature-img" src="/img/collegehub-taxi.jpeg" alt>
              </div>
              <div style="width: 60%; float: left;">
                <p class="feature-text">Going somewhere?</p>
                <p class="feature-heading">Get a Taxi</p>
              </div>
            </div>
          </div>

          <div class="col-md-3" style="padding-bottom: 10px; padding-top: 5px; overflow: hidden;">
            <div class="row nopadding feature">
              <div class="nopadding" style="width: 40%; float: left;">
                <img
                  class="img-fluid mb-3 mb-md-0 feature-img"
                  src="/img/collegehub-restaurants.jpeg"
                  alt
                >
              </div>
              <div style="width: 60%; float: left;">
                <p class="feature-text">Feeling hungry?</p>
                <p class="feature-heading">Find a Restaurant</p>
              </div>
            </div>
          </div>

          <div class="col-md-3" style="padding-bottom: 10px; padding-top: 5px; overflow: hidden;">
            <div class="row nopadding feature">
              <div class="nopadding" style="width: 40%; float: left;">
                <img
                  class="img-fluid mb-3 mb-md-0 feature-img"
                  src="/img/collegehub-house.jpeg"
                  alt
                >
              </div>
              <div style="width: 60%; float: left;">
                <p class="feature-text">Have a house to rent?</p>
                <p class="feature-heading">Add your listing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container" style="margin-top: 50px;">
        <div class="row section">
          <div class="col-md-2">
            <div class="user-profile">
              Profile
            </div>
          </div>

          <div class="col-md-7">
            <div class="row nopadding rental-feed">
              <div class="row nopadding" style="width: 100%;">
                <div class="col-md-12 inner-title-sec">
                  <h2>Rental Requests</h2>
                </div>
              </div>

              <div class="row nopadding feed">
                <div class="col-md-12">
                  <div class="rental-image-div" style="width: 20%; float: left;">
                    <div
                      class="ratio img-responsive img-circle"
                      style="background-image: url(/houses/collegehub-alexandra.jpeg);"
                    ></div>
                  </div>
                  <div class="-div" style="width: 80%; float: left;">
                    <div class="row">
                      <div class="col-md-8">
                        <h3 class="section-subtitle">Avondale, Harare</h3>
                        <p
                          class="section-small-text"
                        >King George Street &#8811; Avondale &#8811; Harare</p>
                        <div class="section-amenities">
                          <div style="width: 50%; float: left;">
                            <p class="section-small-text">
                              <i class="fas fa-graduation-cap"></i>UZ (10 minutes)
                            </p>
                            <p class="section-small-text">
                              <i class="fas fa-wifi"></i>Wifi
                            </p>
                          </div>
                          <div style="width: 50%; float: left;">
                            <p class="section-small-text">
                              <i class="fas fa-bed"></i>
                              2 Bedrooms
                            </p>
                            <p class="section-small-text">
                              <i class="fas fa-couch"></i>
                              Furnished
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="rental-alert">
                          <h2 class="success">Approved</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row nopadding feed">
                <div class="col-md-12">
                  <div class="rental-image-div" style="width: 20%; float: left;">
                    <div
                      class="ratio img-responsive img-circle"
                      style="background-image: url(/houses/house-four.jpeg);"
                    ></div>
                  </div>
                  <div class="-div" style="width: 80%; float: left;">
                    <div class="row">
                      <div class="col-md-8">
                        <h3 class="section-subtitle">Avenues, Harare</h3>
                        <p
                          class="section-small-text"
                        >Baines Street &#8811; Avenues &#8811; Harare</p>
                        <div class="section-amenities">
                          <div style="width: 50%; float: left;">
                            <p class="section-small-text">
                              <i class="fas fa-graduation-cap"></i>UZ (10 minutes)
                            </p>
                            <p class="section-small-text">
                              <i class="fas fa-wifi"></i>Wifi
                            </p>
                          </div>
                          <div style="width: 50%; float: left;">
                            <p class="section-small-text">
                              <i class="fas fa-bed"></i>
                              1 Bedroom
                            </p>
                            <p class="section-small-text">
                              <i class="fas fa-couch"></i>
                              Furnished
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="rental-alert">
                          <h2 class="danger">Disapproved</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



            </div>
          </div>
          <div class="col-md-3">Ads and Suggestions will come here</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import houseSearch from '@/components/houseSearch'
export default {
  components: {
    houseSearch: houseSearch
  }
}
</script>


<style>
.dir {
  width: 20%;
  float: left;
}

.user-menu {
  width: 80%;
  float: left;
  padding-right: 10px;
}

.inner-div {
  width: 100%;
  text-align: right;
  margin-top: 5px;
}

.feature {
  background: #ffffff;
  border-radius: 1px;
  height: 80px;
  overflow: hidden;
  -webkit-box-shadow: 2px 3px 5px 1px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 2px 3px 5px 1px rgba(0, 0, 0, 0.5);
  box-shadow: 2px 3px 5px 1px rgba(0, 0, 0, 0.5);
}

.feature-img {
  height: 100%;
  width: 100%;
  border-radius: 1px 0 0 1px;
}

.feature-text {
  padding: 10px 0px 0px 10px;
  margin: 0px;
  font-size: 12px;
  color: #aaaaaa;
}

.feature-heading {
  padding: 0px 0px 10px 10px;
  margin: 0px;
  font-weight: 400;
  font-size: 15px;
}


@media (max-width: 600px){
  .user-profile{
    display: none;
  }
}

.feed {
  width: 100%;
  height: 150px;
  border-bottom: 0.5px solid #ccc;
}

.inner-title-sec {
  background-color: #eeeeee;
  height: 30px;
  border-bottom: 0.5px solid #aaaaaa;
}

.inner-title-sec h2 {
  font-weight: 500;
  font-size: 16px;
  padding: 5px 0 0 0;
}

.rental-feed {
  background: #ffffff;
  border-radius: 1px;
  overflow: hidden;
  -webkit-box-shadow: 2px 3px 5px 1px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 2px 3px 5px 1px rgba(0, 0, 0, 0.5);
  box-shadow: 2px 3px 5px 1px rgba(0, 0, 0, 0.5);
}

.img-circle {
  margin-top: 10px;
  border-radius: 50%;
}

.ratio {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 0;
  padding-bottom: 80%;
  position: relative;
  width: 80%;
}
.img-responsive {
  display: block;
  height: auto;
  max-width: 100%;
}

.section-amenities {
  margin-top: 10px;
}

.section-amenities i {
  margin-right: 5px;
}

.rental-alert .success {
  font-size: 16px;
  color: green;
  text-align: center;
  margin-top: 20px;
}

.rental-alert .danger {
  font-size: 16px;
  color: red;
  text-align: center;
  margin-top: 20px;
}
</style>

