var API_KEY = 'AIzaSyAx8sFQyrU2LshrpKCzcPnpo0bH_bmwXKU',
	CHANNEL_ID = 'UCv9Edl_WbtbPeURPtFDo-uA',
	soundEffect = new Audio('online.mp3');

var showNotification = function() {
	var time = /(..)(:..)/.exec(new Date());
	var hour = time[1] % 12 || 12;
	var period = time[1] < 12 ? 'AM' : 'PM';
  
	var notification = new Notification('Live! (' + hour + time[2] + ' ' + period + ')', {
		icon: 'icons/64.png',
		body: 'Ice Poseidon has started streaming.',
	});
  
	if (localStorage.notificationSoundEnabled) {
		var volume = (localStorage.notificationVolume / 100);
		soundEffect.volume = (typeof volume == 'undefined' ? 0.50 : volume);
		soundEffect.play();
	}
  
	notification.onclick = function() {
		window.open('https://gaming.youtube.com/ice_poseidon/live')
	}
};

var checkIfLive = function() {
	if (!JSON.parse(localStorage.isActivated)) { 
		return;
	}
		
	$.get('https://www.googleapis.com/youtube/v3/search', { part: 'snippet', channelId: CHANNEL_ID, type: 'video', eventType: 'live', key: API_KEY }, function(data) {
		if (data['items'].length > 0) {
			if (JSON.parse(localStorage.isLive) === false) {
				showNotification();
				localStorage.isLive = true;
			}
		} else {
			localStorage.isLive = false;
		}
	});
}

if (window.Notification) {
	setInterval(function() {
		checkIfLive();
	}, 60000 * 5);
};

new Notification('Ice Poseidon TV', {
	icon: 'icons/64.png',
	body: 'Thanks for installing, enjoy!',
});

localStorage.isLive = false;
localStorage.isActivated = true;
localStorage.notificationSoundEnabled = true;
localStorage.notificationVolume = 50;
localStorage.isInitialized = true;

checkIfLive();
