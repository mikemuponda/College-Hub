<template>
  <div style="width: 100%;">
		<div class="container-fluid" style="margin-bottom: 20px;">
      <div class="row dashboard-nav">
        <div class="col-md-12">
          <p class="dashboard-text">
            <strong>Dashboard</strong>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 nopadding">
          <div class="ui-card">
            <h2 class="heading-two">{{ $store.state.authUser.username }}</h2>
            <h2 class="subheading-two">Accommodation Seeker</h2>
            <br>
          </div>
          <div class="ui-card">
            <p>
              <NuxtLink to="/secret">UserProfile</NuxtLink>
            </p>
          </div>
        </div>
        <div class="col-md-7">
          <div class="ui-card">
            <p>Houses applied to will come here</p>
          </div>
        </div>
        <div class="col-md-2 nopadding" style="background-color: #eee;">
          <div class="single-notification">
            <p>This is a notification</p>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>
