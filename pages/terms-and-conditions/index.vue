<template>
  <div style="width: 100%; margin-top: 80px;">
    <section id="privacypolicy" class="pb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="item-box">
              <h1 class="heading-two">Terms and Conditions</h1>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 col-sm-8 col-xs-8">
            <div class="item-box" style="margin-top: 10px;">
              <div
                class="section"
                style="margin: 20px 0 20px 0; padding: 0 5% 0 5%; border-radius: 1px;"
              >
                <div class="row">
                  <div class="col-md-1"></div>
                  <div class="col-md-10 pp">
                    <h2 class="subheading-two">Introduction</h2>
                    <p>
											These Website Standard Terms and Conditions written on this webpage
											shall manage your use of our website, collegehub.co.zw accessible at
											https://www.collegehub.co.zw.
										</p>
                    <p>
											These Terms will be applied fully and affect to your use of this
											Website. By using this Website, you agreed to accept all terms and
											conditions written in here. You must not use this Website if you
											disagree with any of these Website Standard Terms and Conditions.
                    </p>
                    <p>
											Minors or people below 18 years old are not allowed to use this
											Website.
										</p>

                    <h2 class="subheading-two">Intellectual Property Rights</h2>

                    <p>
											Other than the content you own, under these Terms, collegehub
											and/or its licensors own all the intellectual property rights
											and materials contained in this Website.
										</p>
                    <p>
											You are granted limited license only for purposes of viewing the
											material contained on this Website.
										</p>

                    <h2 class="subheading-two">Restrictions</h2>
                    <p>
											You are specifically restricted from all of the following:
										</p>
                    <ul>
                      <li>publishing any Website material in any other media;</li>
                      <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
                      <li>publicly performing and/or showing any Website material;</li>
                      <li>using this Website in any way that is or may be damaging to this Website;</li>
                      <li>using this Website in any way that impacts user access to this Website;</li>
                      <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
                      <li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
                      <li>using this Website to engage in any advertising or marketing.</li>
                    </ul>

                    <p>
											Certain areas of this Website are restricted from being access by you
											and collegehub may further restrict access by you to any areas of this
											Website, at any time, in absolute discretion. Any user ID and password
											you may have for this Website are confidential and you must maintain
											confidentiality as well.
										</p>

                    <h2 class="subheading-two">Your Content</h2>
                    <p>
											In these Website Standard Terms and Conditions, "Your Content" shall mean
											any audio, video text, images or other material you choose to display on
											this Website. By displaying Your Content, you grant collegehub a non-exclusive,
											worldwide irrevocable, sub licensable license to use, reproduce, adapt,
											publish, translate and distribute it in any and all media.
										</p>
                    <p>
											Your Content must be your own and must not be invading any third-party’s
											rights. collegehub reserves the right to remove any of Your Content from
											this Website at any time without notice.
										</p>

                    <h2 class="subheading-two">Your Privacy</h2>
                    <p>
											Please read Privacy Policy.
										</p>

                    <h2 class="subheading-two">No warranties</h2>
                    <p>
											This Website is provided "as is," with all faults, and collegehub express
											no representations or warranties, of any kind related to this Website or
											the materials contained on this Website. Also, nothing contained on this
											Website shall be interpreted as advising you.
										</p>

                    <h2 class="subheading-two">Limitation of liability</h2>
                    <p>
											In no event shall collegehub, nor any of its officers, directors and employees,
											shall be held liable for anything arising out of or in any way connected with
											your use of this Website whether such liability is under contract. collegehub,
											including its officers, directors and employees shall not be held liable for any
											indirect, consequential or special liability arising out of or in any way
											related to your use of this Website.
										</p>

                    <h2 class="subheading-two">Indemnification</h2>
                    <p>
											You hereby indemnify to the fullest extent collegehub from and against any
											and/or all liabilities, costs, demands, causes of action, damages and expenses
											arising in any way related to your breach of any of the provisions of these
											Terms.
										</p>

                    <h2 class="subheading-two">Severability</h2>
                    <p>
											If any provision of these Terms is found to be invalid under any applicable
											law, such provisions shall be deleted without affecting the remaining provisions
											herein.
										</p>

                    <h2 class="subheading-two">Variation of Terms</h2>
                    <p>
											collegehub is permitted to revise these Terms at any time as it sees fit,
											and by using this Website you are expected to review these Terms on a regular
											basis.
										</p>

                    <h2 class="subheading-two">Assignment</h2>
                    <p>
											The collegehub is allowed to assign, transfer, and subcontract its rights
											and/or obligations under these Terms without any notification. However, you
											are not allowed to assign, transfer, or subcontract any of your rights and/or
											obligations under these Terms.
										</p>

                    <h2 class="subheading-two">Entire Agreement</h2>
                    <p>
											These Terms constitute the entire agreement between collegehub and you in
											relation to your use of this Website, and supersede all prior agreements and
											understandings.
										</p>

                    <h2 class="subheading-two">Governing Law & Jurisdiction</h2>
                    <p>
											These Terms will be governed by and interpreted in accordance with the laws of
											the State of Zimbabwe, and you submit to the non-exclusive jurisdiction of the
											state and federal courts located in Zimbabwe for the resolution of any disputes.
										</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4 col-sm-4 col-xs-4">
            <div style="margin-top: 10px"><defaultAdsColumn/></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import defaultAdsColumn from '@/components/defaultAdsColumn'
export default {
  components: {
    defaultAdsColumn: defaultAdsColumn
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.$nextTick(() => {
      setTimeout(() => this.$nuxt.$loading.finish(), 400)
    })
  },
  head() {
    return {
      title: 'Terms and Conditions | Collegehub Zimbabwe',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'These Website Standard Terms and Conditions written on this webpage shall manage your use of the website. These Terms will be applied fully and affect to your use of this Website. Collegehub is the premier service for university students in Zimbabwe'
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://www.collegehub.co.zw/terms-and-conditions'
        }
      ],
    }
  }
}
</script>


<style>
.pp p {
  text-align: justify;
  color: #707070;
  font-size: 14px;
}
</style>

