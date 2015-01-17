const NOTIFICATIONS_INTERVAL = 5000;

var feedUrl2contentLength = {};

function runNotificationsTimer(url, title, icon, text) {
    setInterval(function(){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function(e) {

            var oldContentLength = feedUrl2contentLength[url];

            if (!oldContentLength || oldContentLength != e.target.responseText.length) {
                showNotification(title, icon, text);

                feedUrl2contentLength[url] = e.target.responseText.length;
            }

        };
        xhr.send(null);
    }, 20000);
}

function showNotification(title, icon, text) {
    var opt = {
        type: "basic",
        title: title,
        message: text,
        iconUrl : icon
    };

    chrome.notifications.create("alert-notification", opt, function(notificationId){
        setTimeout(function(){
            chrome.notifications.clear(notificationId, function(){});
        }, 5000);
    });
}

    runNotificationsTimer('http://blogistan.urdusource.com/blogistan.xml', 'Urdu feeds', 'img/625439_579813668743409_338322230_a.png', 'New post is available');

document.addEventListener('DOMContentLoaded', function () {
    
if (localStorage["notFirstRun"] != "true") {

    chrome.tabs.create({
        "url" : "http://blogistan.urdusource.com/",
        "selected" : true
    });

    localStorage["notFirstRun"] = "true";
}
});