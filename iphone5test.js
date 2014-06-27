//simulating an iPhone 5
console.log("simulating an iPhone 5")
var page = require('webpage').create();

page.viewportSize = {
	width: 640,
	height: 1136
};

page.settings.userAgent = 'Mozilla/5.0 (iPad; CPU OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8L1 Safari/6533.18.5';

page.zoomFactor = 1;


var startTime = Date.now(),
      loadTime;

page.onResourceRequested = function (requestData, networkRequest) {
        console.log(requestData.url, requestData.time);
};


page.open('http://localhost:8080/', function (status) {    
if(status == 'success'){
	loadTime = Date.now() - startTime;
	console.log("page load time: " + loadTime + "ms")
	page.render('/screenshots/iPhone5.png');
	console.log("screen shot saved")     	
}
     	

phantom.exit();

});

