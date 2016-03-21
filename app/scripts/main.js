var events = "https://docs.google.com/spreadsheets/d/18R0dyRHd2uiA6JF4hmVbBTh3sY0hazsETQ92Bd0_6TA/edit#gid=0";


$('document').ready(function() {
    //Smooth Scrolling
    $(document).on('click', 'a[href^="#"]', function(e) {
        var id = $(this).attr('href');
        e.preventDefault();//prevent the browser from jumping to anchor

        var pos = $(id).offset().top;// find the position (px) to scroll to
        var header_h = $('header').outerHeight(); //Find the header height
        if ($(".checkSize").css("float") == "none"){
          pos -= header_h;
        }

        $('body, html').animate({scrollTop: pos});//Smoothly scroll to position
    });

    $('#event-list').sheetrock({
        url: events,
        query: "select A,B,C,D ",
        fetchSize: 10
    });

    //calculate min height for page so footer lines up properly if content is too short
    $("#content").css("min-height", function() {
        return (window.innerHeight - 2 * $('header').outerHeight() -  $('footer').outerHeight());
    });

    //mobile menu
    $('#hamburger').click(function() {
      if ($("#links").css('display') == 'none') {
        $('#links').css('display', 'block');
      } else {
        $('#links').css('display', 'none');
      }
    });

});

//Check first if local link or external link
var http = new RegExp("http"),
    anchor = new RegExp("#");

$('a').click( function(e) {
    var newPage = $(this).attr('href');
    if(!http.test(newPage) && !anchor.test(newPage)){
        //alert("internal");
        event.preventDefault();
        $("#content").fadeOut(500, function() {
            $(this).load(newPage, function() {
                $(this).fadeIn(500);
            });
        })
        
        
    }
});

// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('ytplayer', {
    playerVars: { 
      'controls':0, 
      'start':14, 
      'end':154, 
      'showinfo':0, 
      'loop':1,
      'autoplay' : 1,
      'rel' : 0,
      'showsearch' : 0,
      'enablejsapi' : 1,
      'playlist': 'h_liVBuahSs'

    },
    height: '400',
    width: '640',
    videoId: 'h_liVBuahSs',
    events: { 'onReady': onPlayerReady }
  });
}

function onPlayerReady(event) {
  if ($(".checkSize").css("float") == "none"){
    $('#ytplayer').fadeIn(2000);
  } else {
    $('#ytplayer').fadeOut(2000);
  }
  event.target.playVideo();
  event.target.mute();
  event.target.setPlaybackQuality("large");
}
