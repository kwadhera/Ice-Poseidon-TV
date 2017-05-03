var CHANNEL_ID = 'UCv9Edl_WbtbPeURPtFDo-uA';

$(function() {
	$('.popupchat').click(function() {
		window.open('https://gaming.youtube.com/live_chat?v=AvZ0cYrbsAQ&is_popout=1', 'Ice Poseidon Chat', 'width=550,height=800');
	});
});

var liveCheck = function() {
	$.get('http://107.170.95.160/live', function(data) {
		if (data['status'] === true) {
			$('.stream-offline').addClass('hidden');
			$('.stream-online').removeClass('hidden');
		} else {
			$('.stream-online').addClass('hidden');
			$('.stream-offline').removeClass('hidden');
		}
	});
};

var getLatestTweet = function() {
	var configProfile = {
	  "profile": {"screenName": 'realiceposeidon'},
	  "domId": 'latest-tweet',
	  "maxTweets": 1,
	  "enableLinks": false,
	  "showUser": false,
	  "showTime": false,
	  "showImages": false,
		"showInteraction": false,
	  "lang": 'en'
	};
	twitterFetcher.fetch(configProfile);
};

document.addEventListener('DOMContentLoaded', function () {
	liveCheck();
	getLatestTweet();
});
