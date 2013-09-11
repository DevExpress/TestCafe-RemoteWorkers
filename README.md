TestCafe - How to make a Continuous Integration system work with Remote Workers (with a single TestCafe instance)
===============================================================================================================
 
This example demonstrates how to use a single TestCafe instance in order to make a Continuous Integration system function with Remote Workers. The tests results will be saved to the log.txt file. 
  
This example consists of a [Node.js](http://nodejs.org/) application that connects a remote worker to the Continuous Integration system  programmatically (by using dedicated [TestCafe continuous integration API](http://testcafe.devexpress.com/Documentation/Tutorial/Continuous_Integration)). In other words, first run a TestCafe instance. Then, navigate the browser on your device to the specific URL to connect it as a remote worker. This approach allows you to avoid running the second TestCafe instance to make Continuous Integration system work with remote workers.

In this example we will use a local browser as a remote worker.


Preparation
-----------

Before starting, configuring your environment is required. For this, do the following:

* Download the example and put it to the server (in the directory in which you will install the TestCafé module);

* Switch to the directory where you will keep the application that launches tests;

* Install the TestCafe as a npm module using the following command line:

    `npm install` 

    The TestCafe module will be installed automatically;


* Modify the [TestCafe settings](http://testcafe.devexpress.com/Documentation/Tutorial/Initialize_and_Run#Change_TestCafe_Settings) when creating a new TestCafe instance within the example js file.


Launch the example
------------------

Run the example by using the standard syntax for Node.js applications.

    node index.js

Note that if Node.js is not installed globally, you will need to copy its executable to the directory that contains your application files.

Result
------

After you run the application, a browser on your device (in our case, a local browser) is navigated to the specific URL and connected as a remote worker. 

The result of the test execution is saved into the `log.txt`. (Note that the log file will be created automatically if it does not exist.)
