/*pull in json feed from last.fm and display latest song */

$.getJSON('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=mckeever02&api_key=1292bb2c17448545b7e87339cc20dc41&format=json', function(data) {

var artist = $(".artist"),
track = $(".track"),
album = $(".album"),
artistVal = data.recenttracks.track[0].artist["#text"],
albumVal = data.recenttracks.track[0].album["#text"],
trackVal = data.recenttracks.track[0].name,
urlVal = data.recenttracks.track[0].url;

artist.append(artistVal);
track.append('<a target="_blank" href="'+ urlVal +'">' + trackVal + '</a>');
album.append(' &bull; ' + albumVal);

});


/* animate bars for equalizer*/

function equalizer(bar) {
var height = Math.random() * 300;
var timing = height * 1.5;
var marg = (170 - height) / 2;

bar.animate({
  height: height,
  marginTop: marg
}, timing, function() {
  equalizer($(this));
});
}

$('#music-bars span').each(function(i) {
equalizer($(this));
});



/*  transition gradient for equalizer bars */

var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;

var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.001;

function updateGradient()
{

  if ( $===undefined ) return;

var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#music-bars span').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

  }
}

setInterval(updateGradient,10);

//change bg color on refresh of page

var bgcolorlist = ['#25064C', '#00261C', '#16193B', '#1C1D21', '#360101'];

$(function() {
    $('.main').css({
        background: bgcolorlist[Math.floor(Math.random()*bgcolorlist.length)]
    });
});
