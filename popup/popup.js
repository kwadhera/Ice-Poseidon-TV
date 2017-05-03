var API_KEY = 'AIzaSyAx8sFQyrU2LshrpKCzcPnpo0bH_bmwXKU'
var CHANNEL_ID = 'UCv9Edl_WbtbPeURPtFDo-uA';

$(function() {
	$('.popupchat').click(function() {
		window.open('https://gaming.youtube.com/live_chat?v=AvZ0cYrbsAQ&is_popout=1', 'Ice Poseidon Chat', 'width=550,height=800');
	}); 
});

var liveCheck = function() {
	
	$.get('https://www.googleapis.com/youtube/v3/search', { part: 'snippet', channelId: CHANNEL_ID, type: 'video', eventType: 'live', key: API_KEY }, function(data) {
		if (data['items'].length > 0) {
			$('.stream-offline').addClass('hidden');
			$('.stream-online').removeClass('hidden');
		} else {
			$('.stream-online').addClass('hidden');
			$('.stream-offline').removeClass('hidden');
		}
	});
};

var getLatestTweet = function() {

	// @TODO: Show most recent tweet

	/*var config = {
		"id": '345170787868762112',
		"domId": 'example1',
		"maxTweets": 1,
		"enableLinks": true
	};
	
	twitterFetcher.fetch(config);*/
};

document.addEventListener('DOMContentLoaded', function () {
  liveCheck();
  getLatestTweet();
});