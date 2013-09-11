var fs = require('fs'), // Requests a reference to the Node.js file system
	TestCafe = require('testcafe').TestCafe, // Requests a reference to the TestCafe module
	execFile = require('child_process').execFile; // Requests a reference to the child_process module of Node.js

// Consts
var LOG_FILE_NAME = 'log.txt',
	CONTROL_PANEL_PORT = 1337,
	SERVICE_PORT = 1338,
	MY_BROWSER_PATH = 'Enter the path to the browser executable file',
	MY_TESTS_DIR_PATH = 'Enter the path to the directory where your tests are stored',
	HOST_NAME = '127.0.0.1', // Enter your hostname
	REMOTE_WORKER_NAME = 'my_worker', // Enter the remote worker's name
	EMULATE_CURSOR = true; // Set "true" to emulate cursor movements while testing, otherwise set "false"

var urlToAddRemoteWorker = 
	['http://', HOST_NAME ,':', CONTROL_PANEL_PORT, '/worker/add/', REMOTE_WORKER_NAME].join('');

var testCafe = new TestCafe({
	"controlPanelPort" : CONTROL_PANEL_PORT,
	"servicePort" : SERVICE_PORT,
	"testsDir" : MY_TESTS_DIR_PATH
});

var runOptions = {
	workers: [REMOTE_WORKER_NAME], // Returns an array of strings that represent available remote workers
	browsers: testCafe.listAvailableBrowsers(), // Returns an array of strings that represent the names of available browsers
	emulateCursor: EMULATE_CURSOR
};

// Runs the browser, navigates it to the specific URL to connect as a remote worker  
// The current example uses a local browser as a remote worker
execFile(MY_BROWSER_PATH, [urlToAddRemoteWorker]);

//Runs the task when the worker is added
testCafe.on('workerAdded', function(workerName) {
	if(workerName === REMOTE_WORKER_NAME) {
		// Runs the tests
		testCafe.runTests(runOptions, function () {
			testCafe.on('taskComplete', function (report) {
				//Logs the test results
				var mssg = '\n' + new Date().toString() + ':\n' + JSON.stringify(report); 

				// Saves the results to a log file (a log file will be created if it does not exist)
				fs.appendFile(LOG_FILE_NAME, mssg);
			});
		});
	}
});
