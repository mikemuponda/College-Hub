<template>
  <div style="width: 100%;">
    <div class="nav" style="background-color: #F8F8F8; padding-bottom: 5px;">
      <nav class="navbar-expand-lg navbar-light bg-light" style="margin-left: 10px; background-color: #F8F8F8;">
        <NuxtLink :to="'/'" class="navbar-brand" title="College Hub" style="margin-top: 15px; background-color: #F8F8F8; font-weight: 450; font-size: 16px; color: #3A003A;">
          <img src="/logo.png" title="Home" alt="Home" style="height: 50px; margin-top: 0px; margin-left: 10px;"/>&nbsp;COLLEGEHUB
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
        <NuxtLink :to="'/team'" title="Team" id="team" class="nav-link">
          <span>Team</span>
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
