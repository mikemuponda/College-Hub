<template>
  <div style="width:100%">
    <!--snippet from bootsnipp.com statrs after this-->

    <div style="width: 100%;">
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
        <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
        <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <div class="aboutus-section">
          <div class="container">
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="aboutus">
                      <h2 class="aboutus-title">About Us</h2>
                      <p class="aboutus-text">
                          We are an organisation that aims to bridge the gap between house owners<br>
                          and those seeking accommodation, we believe that by using our platform <br>
                          accommodation seekers can save a lot of time that would have been spent moving around door to door.

                      </p>
                      <p class="aboutus-text">
                         By offering an easy to use and user friendly platform we aim to alleviate your accommodation searching process.
                       </p>
                       <a href="#" class="aboutus-more">read more</a>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>

    <!--it also end here-->
  </div>
</template>

<style>
    body {
    font-family: 'Roboto';font-size: 16px;
    }

    .aboutus-section {
    padding: 90px 0;
    }
    .aboutus-title {
    font-size: 30px;
    letter-spacing: 0;
    line-height: 32px;
    margin: 0 0 39px;
    padding: 0 0 11px;
    position: relative;
    text-transform: uppercase;
    color: white;
    }
    .aboutus-title::after {
    background: #fdb801 none repeat scroll 0 0;
    bottom: 0;
    content: "";
    height: 2px;
    left: 0;
    position: absolute;
    width: 54px;
    }
    .aboutus-text {
    color: #ffe066;
    font-size: 13px;
    line-height: 22px;
    margin: 0 0 35px;
    }

    a:hover, a:active {
    color: #ffb901;
    text-decoration: none;
    outline: 0;
    }
    .aboutus-more {
    border: 1px solid #fdb801;
    border-radius: 25px;
    color: #ffffff;
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0;
    padding: 7px 20px;
    text-transform: uppercase;
    }
    .feature .feature-box .iconset {
    background: #fff none repeat scroll 0 0;
    float: left;
    position: relative;
    width: 18%;
    }
    .feature .feature-box .iconset::after {
    background: #fdb801 none repeat scroll 0 0;
    content: "";
    height: 150%;
    left: 43%;
    position: absolute;
    top: 100%;
    width: 1px;
    }

    .feature .feature-box .feature-content h4 {
    color: #0f0f0f;
    font-size: 18px;
    letter-spacing: 0;
    line-height: 22px;
    margin: 0 0 5px;
    }


    .feature .feature-box .feature-content {
    float: left;
    padding-left: 28px;
    width: 78%;
    }
    .feature .feature-box .feature-content h4 {
    color: #0f0f0f;
    font-size: 18px;
    letter-spacing: 0;
    line-height: 22px;
    margin: 0 0 5px;
    }
    .feature .feature-box .feature-content p {
    color: #606060;
    font-size: 13px;
    line-height: 22px;
    }
    .icon {
    color : #f4b841;
    padding:0px;
    font-size:40px;
    border: 1px solid #fdb801;
    border-radius: 100px;
    color: #fdb801;
    font-size: 28px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    width: 70px;
    }

  </style>

  <script>
      export default{
      methods:{

      }
      }
</script>
