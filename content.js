console.log('@Content Script Init');

var disallowedSymbols = ["'", '"', '?', '!', '#', '\\', ':', '/', '&'];
var emotes = {};

+function addObserverIfDesiredNodeAvailable() {
	
    var target = document.querySelector('.style-scope .yt-live-chat-item-list-renderer');
	var chatMessageSelector = 'style-scope yt-live-chat-item-list-renderer x-scope yt-live-chat-text-message-renderer-0';
	
    if(!target) {
        window.setTimeout(addObserverIfDesiredNodeAvailable, 500);
        return;
    }
	
    var options = {
		subtree: true,
		childList: true,
		attributes: false,
		characterData: true
	};

    var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (mutation.type === 'childList') {
				
				if (typeof mutation.addedNodes[0] == 'undefined') {
					return;
				}
				
				if (mutation.addedNodes[0].className == chatMessageSelector) {
					emoteCheck(mutation.addedNodes[0]);
				}
			}
		});
	});
	
	observer.observe(target, options);
}();

var getGlobalEmotes = +function() {
	
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '//twitchemotes.com/api_cache/v2/global.json');
    xhr.send();
    var url_template = "//static-cdn.jtvnw.net/emoticons/v1/";

    xhr.onload = function() {
        emote_d = JSON.parse(xhr.responseText)['emotes'];
        for (var emote in emote_d) {
            emotes[emote] = {
				url: url_template + emote_d[emote]['image_id'] + '/' + '1.0'
            };
        }
		
		console.log(emotes);
    }
}();

var emoteCheck = function(node) {
	
	var message = node.querySelector('#message');
	var words = message.innerHTML.split(" ");
	
	for (var i = 0; i < words.length; i++) {
		console.log(message);
		replaceWithEmote(message, words[i]);
	}
}

var replaceWithEmote = function(message, word) {
	
	console.log(message);
	console.log(word);
	
	if (typeof emotes[word] === 'undefined') {
		return;
	}
	
	console.log('EMOTE!');

	var img = document.createElement('img');
    img.src = emotes[word]['url'];
    img.alt = word;
    img.style.display = 'inline';
    img.style.width = 'auto';
	img.style.overflow = 'hidden';
	
	console.log('@');
	console.log(img);
	
	// @TODO: replace message innerHTML
}