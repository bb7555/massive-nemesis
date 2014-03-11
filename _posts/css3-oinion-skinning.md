{{{
    "title"    : "Onion Skinning and Keyframing to create 'particle effects' in CSS3(only)",
    "tags"     : [ "html5", "css3", "animating in html5", "clever hack"],
    "category" : "HTML5",
    "date"     : "03-11-2014"
}}}
The reason I say 'particle effects', is that it is not truly randomized. A particle effect, like seen on many high-end game platforms are used in things like neon lights, fires, falling water, etc. We can create an approximation of a neon light particle effect using the old school animation technique of 'onion skinning'.

For those that don't know, you may study elsewhere. In short, it is the way animators drew clips for the camera, before computers took over everything. When animating on the computer, it is good to consider these techniques used by animators to achieve a pleasant affect. Many transform techniques can be used badly. To me this is very important. How well do you understand the concepts of front-end presentation and animation?

On digital onion skinning and techniques of transformation and 'keyframing' in CSS3 exclusively: this example represents a common practice to non-programmtically create particle effects, as is often seen in Flash. This example consists of several text transfroms is css3. Each one has its own time period to tween from each keyframe.

The effect is nice and mimics the 'particle effect' we expect from a digital neon.

<br /> <br />

<style type="text/css">
@font-face {
  font-family: 'Monoton';
  font-style: normal;
  font-weight: 400;
  src: local('Monoton'), local('Monoton-Regular'), url(http://themes.googleusercontent.com/static/fonts/monoton/v4/AKI-lyzyNHXByGHeOcds_w.woff) format('woff');
}

#container{
  width:500px;
  margin:auto;
}

#container p{
  text-align:center;
  font-size:7em;
  margin:20px 0 20px 0; 
}

#container p a{
  text-decoration:none; 
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
}

#container p:nth-child(1) a{
  color:#FF1177;
  font-family:Monoton;
}
#container p:nth-child(1) a:hover{
  -webkit-animation: neon1 1.5s ease-in-out infinite alternate;
  -moz-animation: neon1 1.5s ease-in-out infinite alternate;
  animation: neon1 1.5s ease-in-out infinite alternate; 
}

#container p a:hover{
color:#ffffff;  
}



/*glow for webkit*/
@-webkit-keyframes neon1 {
  from {
    text-shadow: 0 0 10px #fff,
               0 0 20px  #fff,
               0 0 30px  #fff,
               0 0 40px  #FF1177,
               0 0 70px  #FF1177,
               0 0 80px  #FF1177,
               0 0 100px #FF1177,
               0 0 150px #FF1177;
  }
  to {
    text-shadow: 0 0 5px #fff,
               0 0 10px #fff,
               0 0 15px #fff,
               0 0 20px #FF1177,
               0 0 35px #FF1177,
               0 0 40px #FF1177,
               0 0 50px #FF1177,
               0 0 75px #FF1177;
  }
}


</style>

<div id="container">
  
  <p><a href="https://en.wikipedia.org/wiki/Red">
    RED
  </a></p>

</div>

<br /><br />

Here is the css:

```
@font-face {
  font-family: 'Monoton';
  font-style: normal;
  font-weight: 400;
  src: local('Monoton'), local('Monoton-Regular'), url(http://themes.googleusercontent.com/static/fonts/monoton/v4/AKI-lyzyNHXByGHeOcds_w.woff) format('woff');
}

#container{
  width:500px;
  margin:auto;
}

#container p{
  text-align:center;
  font-size:7em;
  margin:20px 0 20px 0; 
}

#container p a{
  text-decoration:none; 
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
}

#container p:nth-child(1) a{
  color:#FF1177;
  font-family:Monoton;
}
#container p:nth-child(1) a:hover{
  -webkit-animation: neon1 1.5s ease-in-out infinite alternate;
  -moz-animation: neon1 1.5s ease-in-out infinite alternate;
  animation: neon1 1.5s ease-in-out infinite alternate; 
}

#container p a:hover{
color:#ffffff;  
}



/*glow for webkit*/
@-webkit-keyframes neon1 {
  from {
    text-shadow: 0 0 10px #fff,
               0 0 20px  #fff,
               0 0 30px  #fff,
               0 0 40px  #FF1177,
               0 0 70px  #FF1177,
               0 0 80px  #FF1177,
               0 0 100px #FF1177,
               0 0 150px #FF1177;
  }
  to {
    text-shadow: 0 0 5px #fff,
               0 0 10px #fff,
               0 0 15px #fff,
               0 0 20px #FF1177,
               0 0 35px #FF1177,
               0 0 40px #FF1177,
               0 0 50px #FF1177,
               0 0 75px #FF1177;
  }
}

```

<br /><br />

Here is the html:

```
<div id="container">
  
  <p><a href="https://en.wikipedia.org/wiki/Red">
    RED
  </a></p>

</div>
```