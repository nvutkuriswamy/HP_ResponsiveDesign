//simulating an iPhone 5
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
	
			//console.log(results.testnames[testType] + " threshold: " + results.threshold[testType] + " actual: " + results.actual[testType] + " " + results.test_results[testType])
		}
		
}


function formatOutput(){
	
	var output = '<?xml version=”1.0″ encoding=”utf-8″?>\n'+
	'<testsuite tests="'+ testsToRun.length +'">\n'
	testsToRun.map(function(t){
		output += '<testcase classname="'+ t +'" name="'+ results.testnames[t] +'"/>\n'
		if(results.test_results[t] == "fail"){
			output += '<failure type="fail"> threshold: '+ results.threshold[t] + ' result: '+ results.actual[t] +' </failure>\n'
		}
	})							    			  			        
	output += '</testcase>\n'+
	'</testsuite>'
	
	console.log(output)
}	


async.each(testsToRun,test,
  function(err){
	  formatOutput();
	  phantom.exit();
  }
);




