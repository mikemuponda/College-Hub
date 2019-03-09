<template>
  <div style="width: 100%;">
    <div class="nav" style="background-color: #ffffff; padding-bottom: 5px;">
      <nav class="navbar-expand-lg navbar-light bg-light" style="margin-left: 10px;">
        <NuxtLink :to="'/'" class="navbar-brand" title="College Hub" style="margin-top: 35px; ">
          <strong>CollegeHub</strong>
        </NuxtLink>
      </nav>
    </div>
    <no-ssr>
      <Slide right noOverlay>
        <NuxtLink :to="'/'" title="Home" id="Home" class="nav-link">
          <span>Home</span>
        </NuxtLink>
        <NuxtLink :to="'/how-to-use'" title="How to use" id="how-to-use" class="nav-link">
          <span>How to use</span>
        </NuxtLink>
        <NuxtLink :to="'/services'" title="Services" id="services" class="nav-link">
          <span>Services</span>
        </NuxtLink>
        <NuxtLink :to="'/about'" title="About Us" id="about" class="nav-link">
          <span>About Us</span>
        </NuxtLink>
        <NuxtLink :to="'/blog'" title="Blog" id="Blog" class="nav-link">
          <span>Blog</span>
        </NuxtLink>
        <NuxtLink :to="'/contact'" title="Contact" id="Contact" class="nav-link">
          <span>Contact</span>
        </NuxtLink>
        <NuxtLink v-if="!$store.state.authUser" :to="'/'" title="Login" id="Login" class="nav-link">
          <span>Login</span>
        </NuxtLink>
        <NuxtLink v-if="!$store.state.authUser" :to="'/create-account'" title="Create Account" id="Create" class="nav-link">
          <span>Create Account</span>
        </NuxtLink>
      </Slide>
    </no-ssr>
  </div>
</template>
