<template>
  <div style="width: 100%;">
    <footer class="footer">
      <div class="footer-top">
        <div class="container">
          <div class="row">
            <div
              class="col-md-3 footer-about wow fadeInUp animated"
              style="visibility: visible; animation-name: fadeInUp;"
            >
              <h3 class="heading">About us</h3>
              <p>Collegehub is a platform where university students get easy access to accomodation, restaurants, listings of upcoming events, a marketplace and can travel with great convenience using the taxi finder service.</p>
              <a href="https://wa.me/263778011367" target="_blank" rel="noopener" title="WhatsApp">
                <i class="fab fa-whatsapp"/>
              </a>
              
              <a
                href="https://www.facebook.com/collegehubzw"
                target="_blank"
                rel="noopener"
                title="Facebook"
              >
                <i class="fab fa-facebook-f"/>
              </a>
              
              <a
                href="https://twitter.com/collegehubzim"
                target="_blank"
                rel="noopener"
                title="Twitter"
              >
                <i class="fab fa-twitter"/>
              </a>
              
              <a
                href="https://www.instagram.com/collegehubzimbabwe"
                target="_blank"
                rel="noopener"
                title="Instagram"
              >
                <i class="fab fa-instagram"/>
              </a>
              
              <a
                href="https://www.youtube.com/user/collegehubzw"
                target="_blank"
                rel="noopener"
                title="Youtube"
              >
                <i class="fab fa-youtube"/>
              </a>
            </div>
            <div
              class="col-md-4 offset-md-1 footer-contact wow fadeInDown animated"
              style="visibility: visible; animation-name: fadeInDown;"
            >
              <h3 class="heading">Contact</h3>
              <p>
                <i class="fas fa-map-marker-alt"></i> Harare, Zimbabwe
              </p>
              <p>
                <i class="fas fa-phone"></i> Phone: +263 778 011 367
              </p>
              <p>
                <i class="fas fa-envelope"></i> Email:
                <a href="mailto:hello@collegehub.co.zw">hello@collegehub.co.zw</a>
              </p>
              <p>
                <i class="fab fa-skype"></i> Skype: collegehubzw
              </p>
            </div>
            <div
              class="col-md-4 footer-links wow fadeInUp animated"
              style="visibility: visible; animation-name: fadeInUp;"
            >
              <div class="row">
                <div class="col">
                  <h3 class="heading">Links</h3>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <p>
                    <NuxtLink :to="'/'" title="Home">
                      <span>Home</span>
                    </NuxtLink>
                  </p>
                  <p>
                    <NuxtLink :to="'/how-to-use'" title="How to use">
                      <span>How to use</span>
                    </NuxtLink>
                  </p>
                  <p>
                    <NuxtLink :to="'/services'" title="Services">
                      <span>Services</span>
                    </NuxtLink>
                  </p>
                  <p>
                    <NuxtLink :to="'/contact'" title="Contact">
                      <span>Contact</span>
                    </NuxtLink>
                  </p>
                </div>
                <div class="col-md-6">
                  <p>
                    <NuxtLink :to="'/about'" title="About">
                      <span>About</span>
                    </NuxtLink>
                  </p>
                  <p>
                    <NuxtLink :to="'/team'" title="Team">
                      <span>Team</span>
                    </NuxtLink>
                  </p>
                  <p>
                    <NuxtLink :to="'/terms-and-conditions'" title="Terms and Conditions">
                      <span>Terms and Conditions</span>
                    </NuxtLink>
                  </p>
                  <p>
                    <NuxtLink :to="'/privacy-policy'" title="Privacy Policy">
                      <span>Privacy Policy</span>
                    </NuxtLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          <div class="row">
            <div class="col-md-6 footer-copyright">
              Developed by
              <a
                href="https://www.lekkahub.com"
                target="_blank"
                rel="noopener"
                title="Lekkahub"
              >LEKKAHUB</a>
            </div>
            <div class="col-md-6 footer-copyright">® 2019 Collegehub</div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.footer {
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
}
.footer a {
  color: #fff;
}
.footer-top {
  padding: 60px 0 40px 0;
  text-align: left;
}

.footer-contact p {
  word-wrap: break-word;
}

.footer-bottom {
  padding: 0 0 10px 0;
  color: #000;
  font-size: 12px;
  font-weight: 500;
  background-color: #ffffff;
}
.footer-bottom a {
  color: #000000;
}

.footer-copyright {
  margin-top: 10px;
}

.footer-about .fab {
  font-size: 25px;
  vertical-align: middle;
  margin-right: 7%;
}

.fab:hover {
  opacity: 0.6;
}

.fa-whatsapp {
  color: #25d366;
}

.fa-facebook-f {
  color: #3b5998;
}

.fa-twitter {
  color: #55acee;
}

.fa-youtube {
  color: #bb0000;
}

.fa-instagram {
  color: #125688;
}
</style>

