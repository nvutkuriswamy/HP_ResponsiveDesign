//simulating an iPhone 5
console.log("simulating an iPhone 5")
var async = require('async'),
	testsToRun = ["rendertime","payload"],
	results = {
		testnames:{
			rendertime:"Time to Render",
			payload: "Total Page Payload"
		},
		threshold: {
			rendertime: 500,
			payload: 1000
		},
		actual: {
			rendertime: 0,
			payload:0
		},
		test_results: {
			rendertime: "fail",
			payload: "fail"
		}
	}
	


function test(testType, callback){
	console.log(testType)	
	var startTime = Date.now(),
		loadTime;
		
	var page = require('webpage').create();
	page.viewportSize = {
			width: 640,
			height: 1136
		};


		page.settings.userAgent = 'Mozilla/5.0 (iPad; CPU OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8L1 Safari/6533.18.5';
		page.zoomFactor = 1;
		
		page.onResourceReceived = function (resp) {
			//increment the payload by the size of the resource received
			if(testType == "payload"){
				if(resp.bodySize != undefined){
				    results.actual.payload += resp.bodySize	
				}
		
			}
		};
		
		page.open('http://localhost:8080/', function (status) {   
		if(status == 'success'){
			results.actual.rendertime = Date.now() - startTime;
		}
		calculateResults()
		page.close();
		callback.apply();
		});     	
		
		function calculateResults(){	
			var output = "";
			if(results.actual[testType] <= results.threshold[testType]){
				results.test_results[testType] = "pass";
			}
	
			console.log(results.testnames[testType] + " threshold: " + results.threshold[testType] + " actual: " + results.actual[testType] + " " + results.test_results[testType])
		}	

}


async.each(testsToRun,test,
  function(err){
	  phantom.exit();
  }
);




