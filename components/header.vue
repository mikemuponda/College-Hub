<template>
  <div style="width: 100%;">
    <div class="nav" style="background-color: #ffffff; padding-bottom: 5px;">
      <nav class="navbar-expand-lg navbar-light bg-light" style="margin-left: 10px;">
        <router-link :to="'/'" class="navbar-brand" title="College Hub" style="margin-top: 35px; ">
          <strong>CollegeHub</strong>
        </router-link>
      </nav>
    </div>
    <no-ssr>
      <Slide right noOverlay>
        <router-link :to="'/'" title="Home" id="Home">
          <span>Home</span>
        </router-link>
        <router-link :to="'/how-to-use'" title="How to use" id="how-to-use">
          <span>How to use</span>
        </router-link>
        <router-link :to="'/services'" title="Services" id="services">
          <span>Services</span>
        </router-link>
        <router-link :to="'/about'" title="About Us" id="about">
          <span>About Us</span>
        </router-link>
        <router-link :to="'/blog'" title="Blog" id="Blog">
          <span>Blog</span>
        </router-link>
        <router-link :to="'/contact'" title="Contact" id="Contact">
          <span>Contact</span>
        </router-link>
        <router-link
          :to="'/terms-and-conditions'"
          title="Terms and Conditions"
          id="terms-and-conditions"
        >
          <span>Terms and Conditions</span>
        </router-link>
      </Slide>
    </no-ssr>
  </div>
</template>


